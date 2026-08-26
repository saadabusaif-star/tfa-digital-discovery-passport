export type TechWheelSegment = {
  id: string;
  label: string;
  icon: string;
  challenge: string;
  responseHint: string;
  reward: string;
};

export const TECH_WHEEL_SEGMENTS: TechWheelSegment[] = [
  { id: "ai", label: "AI", icon: "🤖", challenge: "Name one helpful thing AI can do for people.", responseHint: "Think of learning, translation, accessibility, or creating ideas.", reward: "AI Explorer" },
  { id: "cyber", label: "Cyber", icon: "🔐", challenge: "Which password is stronger: Password123 or T3@m0n@1!?", responseHint: "Choose the one with a mix of words, numbers, and symbols.", reward: "Cyber Defender" },
  { id: "gaming", label: "Gaming", icon: "🎮", challenge: "Which job helps create video games?", responseHint: "Game designers, artists, coders, and testers all play a part.", reward: "Game Creator" },
  { id: "coding", label: "Coding", icon: "💻", challenge: "What does a loop help a program do?", responseHint: "It repeats a set of instructions when needed.", reward: "Code Builder" },
  { id: "robotics", label: "Robotics", icon: "🦾", challenge: "Name one sensor a robot could use.", responseHint: "Think of light, distance, touch, temperature, or sound.", reward: "Robot Ranger" },
  { id: "trivia", label: "Tech trivia", icon: "🧠", challenge: "What does CPU stand for?", responseHint: "It is the computer part that processes instructions.", reward: "Tech Thinker" },
  { id: "lucky", label: "Lucky spin", icon: "🎁", challenge: "Share one positive way you will use technology this year.", responseHint: "A thoughtful answer earns an entry in the ICT prize draw.", reward: "Prize Draw Entry" },
];

export function selectTechWheelSegment(randomValue: number): TechWheelSegment {
  const safeValue = Number.isFinite(randomValue) ? Math.min(Math.max(randomValue, 0), 0.999999) : 0;
  return TECH_WHEEL_SEGMENTS[Math.floor(safeValue * TECH_WHEEL_SEGMENTS.length)];
}

export const HUMAN_AI_ROUND = {
  prompt: "Which scene was generated from a design prompt rather than captured as a camera-style scene?",
  correctOption: "B" as const,
  options: [
    { id: "A" as const, title: "Palm coast morning", caption: "Camera-style scene with natural light and a familiar horizon.", visual: "photo" },
    { id: "B" as const, title: "Future eco city", caption: "A digital concept scene imagined from a written prompt.", visual: "ai" },
  ],
};

export const FUTURE_CAREERS = [
  { id: "robotics", icon: "🤖", label: "Robotics", title: "Future Robotics Engineer", line: "Building smart machines that help people." },
  { id: "gaming", icon: "🎮", label: "Gaming", title: "Future Game Designer", line: "Creating worlds where ideas become playable." },
  { id: "cyber", icon: "🔐", label: "Cybersecurity", title: "Future Cybersecurity Expert", line: "Protecting tomorrow’s digital world." },
  { id: "ai", icon: "🧠", label: "AI", title: "Future AI Innovator", line: "Using thoughtful technology to solve real problems." },
  { id: "coding", icon: "💻", label: "Coding", title: "Future Software Creator", line: "Turning clear ideas into useful digital tools." },
  { id: "data", icon: "📊", label: "Data", title: "Future Data Analyst", line: "Finding meaningful patterns that help people decide." },
  { id: "space", icon: "🚀", label: "Space tech", title: "Future Space Technologist", line: "Exploring new frontiers with science and technology." },
] as const;

export const PHOTO_CORNER_SIGNS = [
  "🤖 FUTURE AI ENGINEER",
  "🔐 FUTURE CYBER EXPERT",
  "🎮 FUTURE GAME DESIGNER",
  "💻 FUTURE CODER",
  "🚀 CLASS OF 2040",
] as const;

export const ACTIVITY_SHORTCUTS = [
  { target: "tech-wheel", label: "Spin the Tech Wheel", icon: "🎡" },
  { target: "human-or-ai", label: "Human or AI?", icon: "🖼️" },
  { target: "future-2040", label: "Future 2040", icon: "🚀" },
  { target: "photo-corner", label: "Photo corner", icon: "📸" },
  { target: "ict-display-quest", label: "ICT Display Quest", icon: "⌨" },
  { target: "subjects", label: "Subject studios", icon: "🏆" },
] as const;
