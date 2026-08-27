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
    const activeIctStudios = ["ict-display-challenge", "digital-technology-or-not", "ict-foundations", "keyboard-shortcuts", "excel-skills"] as const;
    for (const gradeBand of gradeBands) {
      for (const slug of QUIZ_ACTIVITY_SLUGS) {
        expect(getQuestionPoolSize(slug, gradeBand)).toBeGreaterThanOrEqual(9);
        const first = getQuestionRoute(slug, gradeBand, () => 0);
        const second = getQuestionRoute(slug, gradeBand, () => 0, first.map(question => question.id));
        const third = getQuestionRoute(slug, gradeBand, () => 0, [...first, ...second].map(question => question.id));
        expect(new Set([...first, ...second, ...third].map(question => question.id)).size).toBe(9);
        const issued = [...first, ...second, ...third].map(question => question.id);
        for (let routeIndex = 0; routeIndex < getQuestionPoolSize(slug, gradeBand); routeIndex += 1) {
          issued.push(...getQuestionRoute(slug, gradeBand, () => 0, issued).map(question => question.id));
        }
        const fallback = getQuestionRoute(slug, gradeBand, () => 0, issued);
        expect(fallback).toHaveLength(3);
        expect(fallback.every(question => issued.includes(question.id))).toBe(true);
      }
      for (const slug of activeIctStudios) {
        expect(getQuestionPoolSize(slug, gradeBand)).toBeGreaterThanOrEqual(12);
        const issued: string[] = [];
        for (let routeNumber = 0; routeNumber < 4; routeNumber += 1) {
          const route = getQuestionRoute(slug, gradeBand, () => 0, issued);
          expect(route).toHaveLength(3);
          expect(route.every(question => !issued.includes(question.id))).toBe(true);
          issued.push(...route.map(question => question.id));
        }
        expect(new Set(issued).size).toBe(12);
      }
      expect(getQuestionPoolSize("ict-display-challenge", gradeBand)).toBeGreaterThanOrEqual(15);
      expect(getQuestionPoolSize("digital-technology-or-not", gradeBand)).toBeGreaterThanOrEqual(18);
    }
  });
});
