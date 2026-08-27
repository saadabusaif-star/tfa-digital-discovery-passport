export type StaffParticipant = {
  id: number;
  displayName: string;
  gradeBand: string;
  eventSection: string;
  classLabel: string | null;
  isActive: number;
  completedCount: number;
  totalPoints: number;
  activityCount: number;
};

export type ParticipantSort = "points" | "name" | "studios" | "class";

export function classLabelForParticipant(participant: Pick<StaffParticipant, "classLabel">) {
  return participant.classLabel || "No class code";
}

export function classFilterOptions(participants: StaffParticipant[]) {
  return Array.from(new Set(participants.map(classLabelForParticipant))).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export function filterAndSortParticipants(participants: StaffParticipant[], input: { search: string; classLabel: string; visibility: "all" | "shown" | "hidden"; sort: ParticipantSort }) {
  const search = input.search.trim().toLocaleLowerCase();
  return participants.filter(participant => {
    const classLabel = classLabelForParticipant(participant);
    const searchable = `${participant.displayName} ${participant.gradeBand} ${participant.eventSection} ${classLabel}`.toLocaleLowerCase();
    const matchesSearch = !search || searchable.includes(search);
    const matchesClass = input.classLabel === "all" || classLabel === input.classLabel;
    const matchesVisibility = input.visibility === "all" || (input.visibility === "shown" ? Boolean(participant.isActive) : !participant.isActive);
    return matchesSearch && matchesClass && matchesVisibility;
  }).sort((a, b) => {
    if (input.sort === "name") return a.displayName.localeCompare(b.displayName);
    if (input.sort === "studios") return b.completedCount - a.completedCount || b.totalPoints - a.totalPoints || a.displayName.localeCompare(b.displayName);
    if (input.sort === "class") return classLabelForParticipant(a).localeCompare(classLabelForParticipant(b), undefined, { numeric: true }) || a.displayName.localeCompare(b.displayName);
    return b.totalPoints - a.totalPoints || b.completedCount - a.completedCount || a.displayName.localeCompare(b.displayName);
  });
}

export function staffQuizSummary(participants: StaffParticipant[]) {
  const totalSubmissions = participants.reduce((sum, participant) => sum + participant.completedCount, 0);
  const totalPoints = participants.reduce((sum, participant) => sum + participant.totalPoints, 0);
  return {
    totalSubmissions,
    totalPoints,
    averageScore: totalSubmissions ? totalPoints / 10 / totalSubmissions : 0,
  };
}
