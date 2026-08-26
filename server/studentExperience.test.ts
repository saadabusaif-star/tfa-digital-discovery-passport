import { describe, expect, it } from "vitest";
import { STUDENT_NAVIGATION, SUBJECT_STUDIO_COPY, UAE_WELCOME_GUIDANCE } from "../client/src/lib/studentExperience";

describe("student Welcome Day experience configuration", () => {
  it("keeps the three student destinations visible and correctly routed", () => {
    expect(STUDENT_NAVIGATION).toEqual([
      { label: "Subjects", href: "/#subjects", icon: "trophy" },
      { label: "My record", href: "/passport", icon: "record" },
      { label: "Live board", href: "/live", icon: "live" },
    ]);
  });

  it("keeps the UAE-focused guidance and creative presentation metadata for all five core labs", () => {
    expect(UAE_WELCOME_GUIDANCE.eyebrow).toContain("UAE");
    expect(UAE_WELCOME_GUIDANCE.summary).toContain("three quick questions");
    expect(Object.keys(SUBJECT_STUDIO_COPY)).toEqual([
      "science-quiz",
      "mathematics-quiz",
      "stem-quiz",
      "pe-quiz",
      "geography-quiz",
    ]);
  });
});
