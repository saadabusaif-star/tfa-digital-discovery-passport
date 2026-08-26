import { describe, expect, it } from "vitest";
import { ACTIVITY_SHORTCUTS, FUTURE_CAREERS, HUMAN_AI_ROUND, PHOTO_CORNER_SIGNS, selectTechWheelSegment, TECH_WHEEL_SEGMENTS } from "./studentAttractions";

describe("student Welcome Day attractions", () => {
  it("offers all requested Tech Wheel challenge categories without duplicate labels", () => {
    expect(TECH_WHEEL_SEGMENTS).toHaveLength(7);
    expect(new Set(TECH_WHEEL_SEGMENTS.map(segment => segment.label)).size).toBe(7);
    expect(TECH_WHEEL_SEGMENTS.map(segment => segment.id)).toEqual(expect.arrayContaining(["ai", "cyber", "gaming", "coding", "robotics", "trivia", "lucky"]));
  });

  it("keeps the visual choice, future career, photo corner, and section navigation content actionable", () => {
    expect(HUMAN_AI_ROUND.correctOption).toBe("B");
    expect(FUTURE_CAREERS).toHaveLength(7);
    expect(PHOTO_CORNER_SIGNS).toHaveLength(5);
    expect(new Set(ACTIVITY_SHORTCUTS.map(shortcut => shortcut.target)).size).toBe(ACTIVITY_SHORTCUTS.length);
  });

  it("resolves every Tech Wheel position to a defined challenge", () => {
    for (let index = 0; index < TECH_WHEEL_SEGMENTS.length; index += 1) {
      expect(selectTechWheelSegment((index + 0.25) / TECH_WHEEL_SEGMENTS.length)).toEqual(TECH_WHEEL_SEGMENTS[index]);
    }
    expect(selectTechWheelSegment(1)).toEqual(TECH_WHEEL_SEGMENTS.at(-1));
  });
});
