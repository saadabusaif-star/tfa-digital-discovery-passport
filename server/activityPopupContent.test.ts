import { describe, expect, it } from "vitest";
import { challenges } from "../client/src/components/ActivityDialog";

describe("student activity pop-up content", () => {
  it("provides a complete three-step question path for every scored multiple-choice challenge", () => {
    for (const slug of ["welcome-quiz", "cyber-escape", "code-breaker", "tech-timeline"]) {
      const challenge = challenges[slug];
      expect(challenge?.questions).toHaveLength(3);
      expect(challenge?.questions?.every(question => question.options.length >= 3 && Boolean(question.correct))).toBe(true);
      expect(challenge?.completionResponse).toBeTruthy();
    }
  });

  it("provides mission steps and submission routes for QR and creative activities", () => {
    expect(challenges["qr-quest"]?.missionSteps).toHaveLength(3);
    expect(challenges["pixel-identity"]?.submissionKind).toBe("pixel-art");
    expect(challenges["dream-site"]?.submissionKind).toBe("website-mockup");
    expect(challenges["future-voice"]?.submissionKind).toBe("reflection");
    expect(challenges["pixel-puzzle"]?.submissionKind).toBe("pixel-art");
    expect(challenges["tech-charades"]?.submissionKind).toBe("meme");
  });

  it("provides a validated Debug Station and the four student welcome prompts", () => {
    expect(challenges["debug-station"]?.inputChallenge).toBe(true);
    expect(challenges["debug-station"]?.completionResponse).toBe("2,4,6");
    expect(challenges["welcome-year-pulse"]?.survey).toHaveLength(4);
    expect(challenges["welcome-year-pulse"]?.survey?.map(item => item.key)).toEqual(["timetable", "elective", "project", "rule"]);
  });

  it("provides the complete choice-and-vote route for Future Tech Vote", () => {
    const vote = challenges["future-vote"];
    expect(vote?.questions).toHaveLength(1);
    expect(vote?.questions?.[0]?.options).toContain("Coding & robotics");
  });
});
