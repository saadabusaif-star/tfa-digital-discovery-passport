import { describe, expect, it } from "vitest";
import { classFilterOptions, filterAndSortParticipants, staffQuizSummary, type StaffParticipant } from "./staffDashboard";

const students: StaffParticipant[] = [
  { id: 1, displayName: "Amina", gradeBand: "8-9", eventSection: "girls", classLabel: "Girl 8A", isActive: 1, completedCount: 3, totalPoints: 80, activityCount: 5 },
  { id: 2, displayName: "Khalid", gradeBand: "6-7", eventSection: "boys", classLabel: "Boy 7F", isActive: 0, completedCount: 1, totalPoints: 10, activityCount: 5 },
  { id: 3, displayName: "Noor", gradeBand: "10-12", eventSection: "unassigned", classLabel: null, isActive: 1, completedCount: 0, totalPoints: 0, activityCount: 5 },
];

describe("staff dashboard helpers", () => {
  it("offers ordered class labels and filters only matching scoped participant records", () => {
    expect(classFilterOptions(students)).toEqual(["Boy 7F", "Girl 8A", "No class code"]);
    expect(filterAndSortParticipants(students, { search: "khal", classLabel: "Boy 7F", visibility: "hidden", sort: "name" }).map(student => student.displayName)).toEqual(["Khalid"]);
  });

  it("sorts results and reports total quiz submissions plus the average score out of three", () => {
    expect(filterAndSortParticipants(students, { search: "", classLabel: "all", visibility: "all", sort: "points" }).map(student => student.displayName)).toEqual(["Amina", "Khalid", "Noor"]);
    expect(staffQuizSummary(students)).toEqual({ totalSubmissions: 4, totalPoints: 90, averageScore: 2.25 });
  });
});
