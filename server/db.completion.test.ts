import { beforeEach, describe, expect, it, vi } from "vitest";

const dbHarness = vi.hoisted(() => ({
  selectionResponses: [] as unknown[][],
  inserted: [] as unknown[],
  updates: [] as unknown[],
  fakeDb: null as any,
}));

vi.mock("drizzle-orm/mysql2", () => ({ drizzle: vi.fn(() => dbHarness.fakeDb) }));

import { completeActivity } from "./db";

function makeFakeDb() {
  return {
    select: vi.fn(() => ({ from: vi.fn(() => ({ where: vi.fn(() => ({ limit: vi.fn(async () => dbHarness.selectionResponses.shift() ?? []) })) })) })),
    insert: vi.fn(() => ({ values: vi.fn(async (value: unknown) => { dbHarness.inserted.push(value); }), onDuplicateKeyUpdate: vi.fn(async () => undefined) })),
    update: vi.fn(() => ({ set: vi.fn((value: unknown) => ({ where: vi.fn(async () => { dbHarness.updates.push(value); }) })) })),
  };
}

const scienceRoute = ["science-quiz:6-7:Easy:1", "science-quiz:6-7:Medium:1", "science-quiz:6-7:Hard:1"];
const mathematicsRoute = ["mathematics-quiz:6-7:Easy:1", "mathematics-quiz:6-7:Medium:1", "mathematics-quiz:6-7:Hard:1"];

function queueParticipantActivitySessionAndCompletion(activity: { id: number; slug: string; points: number }, questionIds: string[], existing: unknown[] = []) {
  dbHarness.selectionResponses = [
    [{ id: 21, displayName: "Subject Tester", accessCode: "TFA-ABC123", gradeBand: "6-7" }],
    [activity],
    [{ id: 15, participantId: 21, activityId: activity.id, sessionToken: "QUIZ-SESSION-ABC123", questionIdsJson: JSON.stringify(questionIds) }],
    existing,
  ];
}

describe("randomized subject quiz completion", () => {
  beforeEach(() => {
    process.env.DATABASE_URL = "mysql://event-test";
    dbHarness.selectionResponses = [];
    dbHarness.inserted = [];
    dbHarness.updates = [];
    dbHarness.fakeDb = makeFakeDb();
  });

  it("persists the issued three-question route and awards 30 points for a 3/3 Science result", async () => {
    queueParticipantActivitySessionAndCompletion({ id: 3, slug: "science-quiz", points: 30 }, scienceRoute);
    const result = await completeActivity({ accessCode: "TFA-ABC123", activitySlug: "science-quiz", sessionToken: "QUIZ-SESSION-ABC123", responseText: JSON.stringify({ questionIds: scienceRoute, answers: ["B) Earth", "B) Oxygen", "C) Photosynthesis"] }) });

    expect(result).toMatchObject({ alreadyCompleted: false, quizScore: 3, questionCount: 3, pointsAdded: 30 });
    expect(dbHarness.inserted).toHaveLength(1);
    expect(dbHarness.inserted[0]).toMatchObject({ participantId: 21, activityId: 3, awardedPoints: 30 });
    expect(dbHarness.updates).toContainEqual({ completedAt: expect.any(Date) });
  });

  it("awards 10 points for each correct answer on the issued Mathematics route", async () => {
    queueParticipantActivitySessionAndCompletion({ id: 4, slug: "mathematics-quiz", points: 30 }, mathematicsRoute);
    const result = await completeActivity({ accessCode: "TFA-ABC123", activitySlug: "mathematics-quiz", sessionToken: "QUIZ-SESSION-ABC123", responseText: JSON.stringify({ questionIds: mathematicsRoute, answers: ["B) 56", "B) 40", "B) 5"] }) });

    expect(result).toMatchObject({ alreadyCompleted: false, quizScore: 2, questionCount: 3, pointsAdded: 20 });
    expect(dbHarness.inserted[0]).toMatchObject({ awardedPoints: 20 });
  });

  it("rejects a submission that does not match the question IDs issued to the student", async () => {
    queueParticipantActivitySessionAndCompletion({ id: 5, slug: "stem-quiz", points: 30 }, ["stem-quiz:6-7:Easy:1", "stem-quiz:6-7:Medium:1", "stem-quiz:6-7:Hard:1"]);
    await expect(completeActivity({ accessCode: "TFA-ABC123", activitySlug: "stem-quiz", sessionToken: "QUIZ-SESSION-ABC123", responseText: JSON.stringify({ questionIds: ["stem-quiz:6-7:Easy:2", "stem-quiz:6-7:Medium:1", "stem-quiz:6-7:Hard:1"], answers: ["B) Keyboard", "C) SSD", "B) A step-by-step solution to a problem"] }) })).rejects.toThrow("Please complete all three quiz questions before submitting.");
    expect(dbHarness.inserted).toHaveLength(0);
  });

  it("does not insert a duplicate subject completion or award points twice", async () => {
    queueParticipantActivitySessionAndCompletion({ id: 6, slug: "geography-quiz", points: 30 }, ["geography-quiz:6-7:Easy:1", "geography-quiz:6-7:Medium:1", "geography-quiz:6-7:Hard:1"], [{ id: 55, participantId: 21, activityId: 6, awardedPoints: 30 }]);
    const result = await completeActivity({ accessCode: "TFA-ABC123", activitySlug: "geography-quiz", sessionToken: "QUIZ-SESSION-ABC123", responseText: JSON.stringify({ questionIds: ["geography-quiz:6-7:Easy:1", "geography-quiz:6-7:Medium:1", "geography-quiz:6-7:Hard:1"], answers: ["C) Asia", "D) Pacific Ocean", "D) Russia"] }) });
    expect(result).toMatchObject({ alreadyCompleted: true, pointsAdded: 0 });
    expect(dbHarness.inserted).toHaveLength(0);
  });
});
