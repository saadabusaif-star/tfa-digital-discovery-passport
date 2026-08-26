import { describe, expect, it } from "vitest";
import { SUBJECT_QUIZZES } from "../client/src/lib/subjectQuiz";

describe("subject quiz content", () => {
  it("contains the five supplied school subject sections", () => {
    expect(SUBJECT_QUIZZES.map(quiz => quiz.title)).toEqual(["Science", "Mathematics", "STEM", "Physical Education", "Geography"]);
  });

  it("gives every subject exactly three easy-to-hard questions", () => {
    for (const quiz of SUBJECT_QUIZZES) {
      expect(quiz.questions).toHaveLength(3);
      expect(quiz.questions.map(question => question.level)).toEqual(["Easy", "Medium", "Hard"]);
      expect(quiz.questions.every(question => question.options.length === 4 && question.options.includes(question.answer))).toBe(true);
    }
  });

  it("keeps the supplied correct answers for Science, Mathematics, STEM, PE, and Geography", () => {
    expect(SUBJECT_QUIZZES.map(quiz => quiz.questions.map(question => question.answer))).toEqual([
      ["B) Earth", "B) Oxygen", "C) Photosynthesis"],
      ["B) 56", "C) 50", "B) 5"],
      ["A) Central Processing Unit", "C) SSD", "B) A step-by-step solution to a problem"],
      ["C) 11", "A) Running", "B) To prepare the body and reduce injury risk"],
      ["C) Asia", "D) Pacific Ocean", "D) Russia"],
    ]);
  });
});
