export type SubjectQuestion = {
  level: "Easy" | "Medium" | "Hard";
  prompt: string;
  options: string[];
  answer: string;
};

export type SubjectQuiz = {
  slug: "ict-display-challenge" | "digital-technology-or-not" | "ict-foundations" | "keyboard-shortcuts" | "excel-skills";
  title: string;
  icon: string;
  accent: "blue" | "violet" | "mint" | "coral" | "gold";
  summary: string;
  questions: SubjectQuestion[];
};

export const ICT_DISPLAY_CHALLENGE: SubjectQuiz = {
  slug: "ict-display-challenge",
  title: "ICT Display Quest",
  icon: "⌨",
  accent: "blue",
  summary: "Follow visual clues from the ICT, Computing, and keyboard-shortcut displays.",
  questions: [],
};

export const DIGITAL_TECHNOLOGY_CHALLENGE: SubjectQuiz = {
  slug: "digital-technology-or-not",
  title: "Digital Technology or Not?",
  icon: "?",
  accent: "mint",
  summary: "Use the supplied presentation to spot technology, information, and everyday objects.",
  questions: [],
};

export const SUBJECT_QUIZZES: SubjectQuiz[] = [
  ICT_DISPLAY_CHALLENGE,
  { slug: "ict-foundations", title: "ICT Foundations", icon: "◌", accent: "violet", summary: "Explore devices, data, networks, and responsible digital habits from the ICT displays and rules.", questions: [] },
  { slug: "keyboard-shortcuts", title: "Keyboard Shortcut Sprint", icon: "⌘", accent: "coral", summary: "Use the supplied keyboard posters to work quickly, safely, and confidently.", questions: [] },
  { slug: "excel-skills", title: "Excel Skills Lab", icon: "▦", accent: "gold", summary: "Read the Excel pages and booklet to practise cells, formulas, charts, sorting, and filters.", questions: [] },
  DIGITAL_TECHNOLOGY_CHALLENGE,
];
