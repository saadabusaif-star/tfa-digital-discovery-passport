import { beforeEach, describe, expect, it, vi } from "vitest";

const dbHarness = vi.hoisted(() => ({
  selectionResponses: [] as unknown[][],
  inserted: [] as unknown[],
  fakeDb: null as any,
}));

vi.mock("drizzle-orm/mysql2", () => ({
  drizzle: vi.fn(() => dbHarness.fakeDb),
}));

import { completeActivity } from "./db";

function makeFakeDb() {
  return {
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => ({
          limit: vi.fn(async () => dbHarness.selectionResponses.shift() ?? []),
        })),
      })),
    })),
    insert: vi.fn(() => ({
      values: vi.fn(async (value: unknown) => {
        dbHarness.inserted.push(value);
      }),
      onDuplicateKeyUpdate: vi.fn(async () => undefined),
    })),
  };
}

function queueParticipantAndActivity(activity: { id: number; slug: string; points: number }) {
  dbHarness.selectionResponses = [
    [{ id: 21, displayName: "Subject Tester", accessCode: "TFA-ABC123" }],
    [activity],
  ];
}

describe("subject quiz completion", () => {
  beforeEach(() => {
    process.env.DATABASE_URL = "mysql://event-test";
    dbHarness.selectionResponses = [];
    dbHarness.inserted = [];
    dbHarness.fakeDb = makeFakeDb();
  });

  it("persists all three supplied answers and awards 30 points for a 3/3 Science quiz", async () => {
    queueParticipantAndActivity({ id: 3, slug: "science-quiz", points: 30 });
    dbHarness.selectionResponses.push([]);
    const answers = ["B) Earth", "B) Oxygen", "C) Photosynthesis"];

    const result = await completeActivity({
      accessCode: "TFA-ABC123",
      activitySlug: "science-quiz",
      responseText: JSON.stringify(answers),
    });

    expect(result).toMatchObject({ alreadyCompleted: false, quizScore: 3, questionCount: 3, pointsAdded: 30 });
    expect(dbHarness.inserted).toHaveLength(1);
    expect(dbHarness.inserted[0]).toMatchObject({ participantId: 21, activityId: 3, awardedPoints: 30, responseText: JSON.stringify(answers) });
  });

  it("awards 10 points for each correct answer when a subject quiz is only partly correct", async () => {
    queueParticipantAndActivity({ id: 4, slug: "mathematics-quiz", points: 30 });
    dbHarness.selectionResponses.push([]);
    const answers = ["B) 56", "B) 40", "B) 5"];

    const result = await completeActivity({
      accessCode: "TFA-ABC123",
      activitySlug: "mathematics-quiz",
      responseText: JSON.stringify(answers),
    });

    expect(result).toMatchObject({ alreadyCompleted: false, quizScore: 2, questionCount: 3, pointsAdded: 20 });
    expect(dbHarness.inserted[0]).toMatchObject({ awardedPoints: 20 });
  });

  it("rejects a subject quiz submission unless all three answers are supplied", async () => {
    queueParticipantAndActivity({ id: 5, slug: "stem-quiz", points: 30 });

    await expect(completeActivity({
      accessCode: "TFA-ABC123",
      activitySlug: "stem-quiz",
      responseText: JSON.stringify(["A) Central Processing Unit", "C) SSD"]),
    })).rejects.toThrow("Please complete all three quiz questions before submitting.");
    expect(dbHarness.inserted).toHaveLength(0);
  });

  it("does not insert a duplicate subject completion or award points twice", async () => {
    queueParticipantAndActivity({ id: 6, slug: "geography-quiz", points: 30 });
    dbHarness.selectionResponses.push([{ id: 55, participantId: 21, activityId: 6, awardedPoints: 30 }]);

    const result = await completeActivity({
      accessCode: "TFA-ABC123",
      activitySlug: "geography-quiz",
      responseText: JSON.stringify(["C) Asia", "D) Pacific Ocean", "D) Russia"]),
    });

    expect(result).toMatchObject({ alreadyCompleted: true, pointsAdded: 0 });
    expect(dbHarness.inserted).toHaveLength(0);
  });
});
