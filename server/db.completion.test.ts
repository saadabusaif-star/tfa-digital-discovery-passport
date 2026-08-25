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

describe("persisted challenge completion", () => {
  beforeEach(() => {
    process.env.DATABASE_URL = "mysql://event-test";
    dbHarness.selectionResponses = [];
    dbHarness.inserted = [];
    dbHarness.fakeDb = makeFakeDb();
  });

  it("persists a first valid completion and awards its configured points", async () => {
    dbHarness.selectionResponses = [
      [{ id: 21, displayName: "Byte Builders", accessCode: "TFA-ABC123" }],
      [{ id: 3, slug: "code-breaker", points: 15 }],
      [],
    ];
    const result = await completeActivity({ accessCode: "TFA-ABC123", activitySlug: "code-breaker", responseText: "CREATE" });
    expect(result).toMatchObject({ alreadyCompleted: false, pointsAdded: 15 });
    expect(dbHarness.inserted).toHaveLength(1);
    expect(dbHarness.inserted[0]).toMatchObject({ participantId: 21, activityId: 3, awardedPoints: 15, responseText: "CREATE" });
  });

  it("does not insert a duplicate completion or award points twice", async () => {
    dbHarness.selectionResponses = [
      [{ id: 21, displayName: "Byte Builders", accessCode: "TFA-ABC123" }],
      [{ id: 3, slug: "code-breaker", points: 15 }],
      [{ id: 55, participantId: 21, activityId: 3, awardedPoints: 15 }],
    ];
    const result = await completeActivity({ accessCode: "TFA-ABC123", activitySlug: "code-breaker", responseText: "CREATE" });
    expect(result).toMatchObject({ alreadyCompleted: true, pointsAdded: 0 });
    expect(dbHarness.inserted).toHaveLength(0);
  });

  it("blocks a validated challenge when the selected answer is wrong", async () => {
    dbHarness.selectionResponses = [
      [{ id: 21, displayName: "Byte Builders", accessCode: "TFA-ABC123" }],
      [{ id: 3, slug: "code-breaker", points: 15 }],
    ];
    await expect(completeActivity({ accessCode: "TFA-ABC123", activitySlug: "code-breaker", responseText: "CONNECT" })).rejects.toThrow("That answer is not quite right");
    expect(dbHarness.inserted).toHaveLength(0);
  });
});
