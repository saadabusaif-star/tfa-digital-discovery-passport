import { describe, expect, it } from "vitest";
import { createPersonalRecordFilename, createPersonalRecordText } from "./personalRecordExport";

describe("personal record export", () => {
  it("formats only the current student's saved class details and ICT results", () => {
    const text = createPersonalRecordText({
      participant: { displayName: "Amina Noor", gradeBand: "8-9", classLabel: "8A", accessCode: "TFA-ABC123" },
      totalPoints: 60,
      results: [{ title: "ICT Foundations", score: 3, points: 30 }, { title: "Excel Skills Lab", score: 3, points: 30 }],
    });
    expect(text).toContain("Student: Amina Noor");
    expect(text).toContain("Class: 8A");
    expect(text).toContain("1. ICT Foundations — 3/3 — 30 points");
    expect(text).not.toContain("other student");
  });

  it("uses a safe readable filename and a clear unassigned class label", () => {
    expect(createPersonalRecordFilename("Amina Noor!")).toBe("tfa-ict-record-amina-noor.txt");
    expect(createPersonalRecordText({ participant: { displayName: "Noor", gradeBand: "6-7", eventSection: "unassigned", accessCode: "TFA-ZYX321" }, totalPoints: 0, results: [] })).toContain("Class: Not provided");
  });
});
