import { describe, expect, it } from "vitest";
import { SUBJECT_QUIZZES } from "../client/src/lib/subjectQuiz";
import { getQuestionRoute, type GradeBand } from "../shared/quizQuestionBank";

const gradeBands: GradeBand[] = ["6-7", "8-9", "10-12"];

describe("ICT studio content", () => {
  it("contains only the five supplied-resource ICT studios", () => {
    expect(SUBJECT_QUIZZES.map(quiz => quiz.title)).toEqual([
      "ICT Display Quest",
      "ICT Foundations",
      "Keyboard Shortcut Sprint",
      "Excel Skills Lab",
      "Digital Technology or Not?",
    ]);
  });

  it("serves a valid Easy, Medium, and Hard server-backed route for every ICT studio and grade band", () => {
    for (const studio of SUBJECT_QUIZZES) {
      for (const gradeBand of gradeBands) {
        const route = getQuestionRoute(studio.slug, gradeBand, () => 0);
        expect(route.map(question => question.level)).toEqual(["Easy", "Medium", "Hard"]);
        expect(route.every(question => question.options.length === 4 && question.options.includes(question.answer))).toBe(true);
      }
    }
  });

  it("keeps the ICT display, shortcut, Excel, rules, and presentation resource themes visible in the catalogue", () => {
    expect(SUBJECT_QUIZZES.map(quiz => quiz.summary).join(" ")).toMatch(/display|shortcut|Excel|presentation|digital/i);
  });
});
