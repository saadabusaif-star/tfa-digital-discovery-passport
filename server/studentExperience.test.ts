import { describe, expect, it } from "vitest";
import { STUDENT_NAVIGATION, SUBJECT_STUDIO_COPY, UAE_WELCOME_GUIDANCE } from "../client/src/lib/studentExperience";

describe("student Welcome Day experience configuration", () => {
  it("keeps the three student destinations visible and correctly routed", () => {
    expect(STUDENT_NAVIGATION).toEqual([
      { label: "ICT studios", href: "/#subjects", icon: "trophy" },
      { label: "My record", href: "/passport", icon: "record" },
      { label: "Live board", href: "/live", icon: "live" },
    ]);
  });

  it("keeps UAE-focused guidance and supplied-resource metadata for all five ICT studios", () => {
    expect(UAE_WELCOME_GUIDANCE.eyebrow).toContain("UAE");
    expect(UAE_WELCOME_GUIDANCE.summary).toContain("three quick questions");
    expect(Object.keys(SUBJECT_STUDIO_COPY)).toEqual([
      "ict-display-challenge",
      "ict-foundations",
      "keyboard-shortcuts",
      "excel-skills",
      "digital-technology-or-not",
    ]);
  });
});
