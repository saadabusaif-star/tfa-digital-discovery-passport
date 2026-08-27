import { describe, expect, it } from "vitest";
import { normalizeClassLabel } from "./db";

describe("flexible student class labels", () => {
  it("accepts a simple class number and section without a Boy/Girl label", () => {
    expect(normalizeClassLabel(" 7f ")).toEqual({ eventSection: "unassigned", classLabel: "7F" });
    expect(normalizeClassLabel("10 A")).toEqual({ eventSection: "unassigned", classLabel: "10A" });
  });

  it("keeps an optional Girl/Boy label when a student provides it", () => {
    expect(normalizeClassLabel("Girl 10a")).toEqual({ eventSection: "girls", classLabel: "Girl 10A" });
    expect(normalizeClassLabel("boys 7F")).toEqual({ eventSection: "boys", classLabel: "Boy 7F" });
  });

  it("allows no class label and still rejects invalid class codes", () => {
    expect(normalizeClassLabel()).toEqual({ eventSection: "unassigned", classLabel: null });
    expect(() => normalizeClassLabel("7G")).toThrow("Enter a class code");
  });
});
