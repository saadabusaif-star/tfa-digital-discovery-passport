export const STUDENT_NAVIGATION = [
  { label: "Subjects", href: "/#subjects", icon: "trophy" },
  { label: "My record", href: "/passport", icon: "record" },
  { label: "Live board", href: "/live", icon: "live" },
] as const;

export const UAE_WELCOME_GUIDANCE = {
  eyebrow: "UAE ICT WELCOME DAY · SHARJAH",
  titleLead: "Explore. Connect.",
  titleAccent: "Create your learning route.",
  summary: "Start with the ICT Display Quest or choose any subject studio. Each experience has three quick questions, and your score can appear on the TFA live board.",
  facts: [
    { value: "UAE", label: "inspired" },
    { value: "5", label: "subject studios" },
    { value: "3", label: "quick questions" },
  ],
} as const;

export const SUBJECT_STUDIO_COPY = {
  "science-quiz": { focus: "Earth & life systems", prompt: "Observe, question, and discover." },
  "mathematics-quiz": { focus: "Patterns & problem solving", prompt: "Think clearly and find the answer." },
  "stem-quiz": { focus: "Digital innovation", prompt: "Use technology ideas with confidence." },
  "pe-quiz": { focus: "Wellbeing in motion", prompt: "Move safely, work together, and grow." },
  "geography-quiz": { focus: "Our connected world", prompt: "Explore places, people, and global links." },
} as const;
