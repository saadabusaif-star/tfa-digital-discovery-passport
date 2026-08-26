import { describe, expect, it } from "vitest";
import { getQuestionPoolSize, getQuestionRoute, QUIZ_ACTIVITY_SLUGS, resolveQuestionRoute, toPublicQuestions, type GradeBand } from "./quizQuestionBank";

const gradeBands: GradeBand[] = ["6-7", "8-9", "10-12"];

describe("grade-aware randomized quiz question bank", () => {
  it("creates one valid Easy, Medium, and Hard question for every quiz activity and grade band", () => {
    for (const slug of QUIZ_ACTIVITY_SLUGS) for (const gradeBand of gradeBands) {
      const route = getQuestionRoute(slug, gradeBand, () => 0);
      expect(route).toHaveLength(3);
      expect(route.map(question => question.level)).toEqual(["Easy", "Medium", "Hard"]);
      expect(route.every(question => question.options.length === 4 && question.options.includes(question.answer))).toBe(true);
    }
  });

  it("selects a different valid route alternative and keeps answer keys server-only in public payloads", () => {
    const first = getQuestionRoute("digital-technology-or-not", "8-9", () => 0);
    const second = getQuestionRoute("digital-technology-or-not", "8-9", () => 0.99);
    expect(first.map(question => question.id)).not.toEqual(second.map(question => question.id));
    expect(resolveQuestionRoute("digital-technology-or-not", "8-9", first.map(question => question.id))).toEqual(first);
    expect(toPublicQuestions(first).every(question => !("answer" in question))).toBe(true);
  });

  it("provides broad resource routes and actively avoids issued question IDs while fresh alternatives remain", () => {
    for (const gradeBand of gradeBands) {
      for (const slug of QUIZ_ACTIVITY_SLUGS) expect(getQuestionPoolSize(slug, gradeBand)).toBeGreaterThanOrEqual(9);
      expect(getQuestionPoolSize("ict-display-challenge", gradeBand)).toBeGreaterThanOrEqual(12);
      expect(getQuestionPoolSize("digital-technology-or-not", gradeBand)).toBeGreaterThanOrEqual(15);
      const first = getQuestionRoute("digital-technology-or-not", gradeBand, () => 0);
      const fresh = getQuestionRoute("digital-technology-or-not", gradeBand, () => 0, first.map(question => question.id));
      const third = getQuestionRoute("digital-technology-or-not", gradeBand, () => 0, [...first, ...fresh].map(question => question.id));
      expect(fresh.map(question => question.id)).not.toEqual(first.map(question => question.id));
      expect(third.map(question => question.id)).not.toEqual(first.map(question => question.id));
      expect(third.map(question => question.id)).not.toEqual(fresh.map(question => question.id));
    }
  });
});
