import { beforeEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { canAwardCompletion, summarizePassport } from "./passportSummary";

const dbMocks = vi.hoisted(() => ({
  listActivities: vi.fn(),
  createParticipant: vi.fn(),
  getPassport: vi.fn(),
  completeActivity: vi.fn(),
  createCreativeSubmission: vi.fn(),
  castVote: vi.fn(),
  getLiveBoard: vi.fn(),
  getModerationQueue: vi.fn(),
  getStaffOverview: vi.fn(),
  getSubjectResultsExport: vi.fn(),
  moderateSubmission: vi.fn(),
  resetSubjectResults: vi.fn(),
  updateActivityResource: vi.fn(),
}));

const storageMocks = vi.hoisted(() => ({ storagePut: vi.fn() }));

vi.mock("./db", () => dbMocks);
vi.mock("./storage", () => storageMocks);

function createContext(role: "admin" | "user" | null = null): TrpcContext {
  return {
    user: role ? {
      id: 17,
      openId: "event-test-user",
      name: "Event Tester",
      email: "tester@example.com",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    } : null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("Digital Discovery Passport event procedures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dbMocks.createParticipant.mockResolvedValue({ id: 1, displayName: "Byte Builders", gradeBand: "6-7", accessCode: "TFA-ABC123" });
    dbMocks.completeActivity.mockResolvedValue({ alreadyCompleted: false, pointsAdded: 15, activity: { slug: "code-breaker" } });
    dbMocks.getLiveBoard.mockResolvedValue({ totals: { participantCount: 0, completionCount: 0, totalPoints: 0, activityCount: 9 }, participants: [], votes: [], words: [], recentWork: [] });
    dbMocks.getSubjectResultsExport.mockResolvedValue([{ name: "Amina", gradeBand: "8-9", subject: "Science", score: 3, points: 30, completedAt: new Date() }]);
    dbMocks.resetSubjectResults.mockResolvedValue({ cleared: 1 });
  });

  it("creates a participant passport only with a valid display name and grade band", async () => {
    const caller = appRouter.createCaller(createContext());
    const result = await caller.event.join({ displayName: "Byte Builders", gradeBand: "6-7" });
    expect(result.accessCode).toBe("TFA-ABC123");
    expect(dbMocks.createParticipant).toHaveBeenCalledWith({ displayName: "Byte Builders", gradeBand: "6-7" });
    await expect(caller.event.join({ displayName: "A", gradeBand: "6-7" })).rejects.toThrow();
  });

  it("records a safe activity completion against a formatted passport code", async () => {
    const caller = appRouter.createCaller(createContext());
    const result = await caller.event.complete({ accessCode: "TFA-ABC123", activitySlug: "code-breaker", responseText: "CREATE" });
    expect(result.pointsAdded).toBe(15);
    expect(dbMocks.completeActivity).toHaveBeenCalledWith({ accessCode: "TFA-ABC123", activitySlug: "code-breaker", responseText: "CREATE" });
  });

  it("rejects unsafe evidence file formats before using storage", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.event.submit({
      accessCode: "TFA-ABC123",
      kind: "pixel-art",
      upload: { dataBase64: "data:text/plain;base64,SGVsbG8=", fileName: "unsafe.txt", mimeType: "text/plain" },
    })).rejects.toThrow("Please upload an approved image, GIF, short MP4/WebM video, or PDF only.");
    expect(storageMocks.storagePut).not.toHaveBeenCalled();
  });

  it("routes a welcome-day icebreaker vote with its approved prompt key", async () => {
    const caller = appRouter.createCaller(createContext());
    await caller.event.vote({ accessCode: "TFA-ABC123", optionText: "My class times", promptKey: "timetable-pulse" });
    expect(dbMocks.castVote).toHaveBeenCalledWith({ accessCode: "TFA-ABC123", optionText: "My class times", promptKey: "timetable-pulse" });
  });

  it("allows only administrators to moderate submitted work", async () => {
    const learner = appRouter.createCaller(createContext("user"));
    await expect(learner.staff.moderate({ submissionId: 9, status: "approved" })).rejects.toThrow();
    const staff = appRouter.createCaller(createContext("admin"));
    await staff.staff.moderate({ submissionId: 9, status: "approved", adminNote: "Excellent work" });
    expect(dbMocks.moderateSubmission).toHaveBeenCalledWith({ submissionId: 9, status: "approved", adminNote: "Excellent work", reviewerId: 17 });
  });

  it("allows only administrators to export named subject results", async () => {
    const learner = appRouter.createCaller(createContext("user"));
    await expect(learner.staff.exportResults()).rejects.toThrow();
    const staff = appRouter.createCaller(createContext("admin"));
    const results = await staff.staff.exportResults();
    expect(results[0]).toMatchObject({ name: "Amina", subject: "Science", score: 3, points: 30 });
    expect(dbMocks.getSubjectResultsExport).toHaveBeenCalledTimes(1);
  });

  it("requires an explicit confirmation and administrator access to reset subject results", async () => {
    const learner = appRouter.createCaller(createContext("user"));
    await expect(learner.staff.resetResults({ confirmation: "RESET RESULTS" })).rejects.toThrow();
    const staff = appRouter.createCaller(createContext("admin"));
    await expect(staff.staff.resetResults({ confirmation: "reset" as "RESET RESULTS" })).rejects.toThrow();
    await expect(staff.staff.resetResults({ confirmation: "RESET RESULTS" })).resolves.toEqual({ cleared: 1 });
    expect(dbMocks.resetSubjectResults).toHaveBeenCalledTimes(1);
  });

  it("aggregates persisted completion rows into a stable passport score and badge list", () => {
    const summary = summarizePassport(
      [{ activityId: 2, awardedPoints: 15 }, { activityId: 5, awardedPoints: 20 }],
      [
        { id: 2, badgeKey: "logic-legend", badgeName: "Logic Legend" },
        { id: 5, badgeKey: "ux-designer", badgeName: "UX Designer" },
        { id: 7, badgeKey: "cyber-smart", badgeName: "Cyber Smart" },
      ],
    );
    expect(summary).toEqual({
      completedIds: [2, 5],
      totalPoints: 35,
      badges: [{ key: "logic-legend", name: "Logic Legend" }, { key: "ux-designer", name: "UX Designer" }],
      activityCount: 3,
    });
    expect(canAwardCompletion(false)).toBe(true);
    expect(canAwardCompletion(true)).toBe(false);
  });
});
