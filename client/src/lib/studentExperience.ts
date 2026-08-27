export const STUDENT_NAVIGATION = [
  { label: "ICT studios", href: "/#ict-studios", icon: "trophy" },
  { label: "My record", href: "/passport", icon: "record" },
  { label: "Live board", href: "/live", icon: "live" },
] as const;

export const UAE_WELCOME_GUIDANCE = {
  eyebrow: "UAE ICT WELCOME DAY · SHARJAH",
  titleLead: "Explore. Connect.",
  titleAccent: "Build your ICT route.",
  summary: "Choose any ICT studio, use the supplied classroom resources, and complete three quick questions. Your score can appear on the TFA live board.",
  facts: [
    { value: "UAE", label: "inspired" },
    { value: "5", label: "ICT studios" },
    { value: "3", label: "quick questions" },
  ],
} as const;

export const SUBJECT_STUDIO_COPY = {
  "ict-display-challenge": { focus: "ICT, Computing & VR displays", prompt: "Read the display clues and make the connection." },
  "ict-foundations": { focus: "Devices, data & safe habits", prompt: "Use the ICT rules to work responsibly." },
  "keyboard-shortcuts": { focus: "Keyboard poster skills", prompt: "Choose the shortcut that gets the job done." },
  "excel-skills": { focus: "Excel pages & booklet", prompt: "Organise, calculate, and present data clearly." },
  "digital-technology-or-not": { focus: "Digital Technology presentation", prompt: "Classify the technology with confidence." },
} as const;
