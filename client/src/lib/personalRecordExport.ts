export type PersonalRecordExport = {
  participant: {
    displayName: string;
    gradeBand: string;
    classLabel?: string | null;
    eventSection?: string;
    accessCode: string;
  };
  totalPoints: number;
  results: Array<{ title: string; score: number; points: number }>;
};

function cleanText(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function createPersonalRecordText(record: PersonalRecordExport) {
  const classDetail = record.participant.classLabel || (record.participant.eventSection === "unassigned" ? "Not provided" : record.participant.eventSection || "Not provided");
  const resultLines = record.results.length
    ? record.results.map((result, index) => `${index + 1}. ${cleanText(result.title)} — ${result.score}/3 — ${result.points} points`)
    : ["No ICT studio completed yet."];

  return [
    "THE FIRST ACADEMY SCHOOL",
    "ICT WELCOME DAY · PERSONAL LEARNING RECORD",
    "",
    `Student: ${cleanText(record.participant.displayName)}`,
    `Grade group: ${cleanText(record.participant.gradeBand)}`,
    `Class: ${cleanText(classDetail)}`,
    `Passport code: ${cleanText(record.participant.accessCode)}`,
    `Total points: ${record.totalPoints}`,
    "",
    "ICT studio results",
    ...resultLines,
  ].join("\n");
}

export function createPersonalRecordFilename(displayName: string) {
  const safeName = cleanText(displayName).replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() || "student";
  return `tfa-ict-record-${safeName}.txt`;
}
