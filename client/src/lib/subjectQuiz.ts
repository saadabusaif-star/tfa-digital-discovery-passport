export type SubjectQuestion = {
  level: "Easy" | "Medium" | "Hard";
  prompt: string;
  options: string[];
  answer: string;
};

export type SubjectQuiz = {
  slug: "science-quiz" | "mathematics-quiz" | "stem-quiz" | "pe-quiz" | "geography-quiz";
  title: string;
  icon: string;
  accent: "blue" | "violet" | "mint" | "coral" | "gold";
  summary: string;
  questions: SubjectQuestion[];
};

export const SUBJECT_QUIZZES: SubjectQuiz[] = [
  { slug: "science-quiz", title: "Science", icon: "◌", accent: "blue", summary: "Earth, air, plants, and the world around us.", questions: [
    { level: "Easy", prompt: "What planet do we live on?", options: ["A) Mars", "B) Earth", "C) Venus", "D) Jupiter"], answer: "B) Earth" },
    { level: "Medium", prompt: "What gas do humans need to breathe?", options: ["A) Carbon dioxide", "B) Oxygen", "C) Hydrogen", "D) Nitrogen"], answer: "B) Oxygen" },
    { level: "Hard", prompt: "What is the process by which plants convert sunlight into energy?", options: ["A) Respiration", "B) Digestion", "C) Photosynthesis", "D) Evaporation"], answer: "C) Photosynthesis" },
  ] },
  { slug: "mathematics-quiz", title: "Mathematics", icon: "×", accent: "violet", summary: "Numbers, percentages, and a quick algebra challenge.", questions: [
    { level: "Easy", prompt: "What is 8 × 7?", options: ["A) 54", "B) 56", "C) 64", "D) 48"], answer: "B) 56" },
    { level: "Medium", prompt: "What is 25% of 200?", options: ["A) 25", "B) 40", "C) 50", "D) 75"], answer: "C) 50" },
    { level: "Hard", prompt: "If 3x + 7 = 22, what is x?", options: ["A) 3", "B) 5", "C) 7", "D) 9"], answer: "B) 5" },
  ] },
  { slug: "stem-quiz", title: "STEM", icon: "⌘", accent: "mint", summary: "Computers, storage, and algorithm thinking.", questions: [
    { level: "Easy", prompt: "What does CPU stand for?", options: ["A) Central Processing Unit", "B) Computer Power Unit", "C) Central Program Utility", "D) Computer Processing User"], answer: "A) Central Processing Unit" },
    { level: "Medium", prompt: "Which component stores data permanently in a computer?", options: ["A) RAM", "B) CPU", "C) SSD", "D) Keyboard"], answer: "C) SSD" },
    { level: "Hard", prompt: "What does an algorithm provide in computer science?", options: ["A) A computer's physical parts", "B) A step-by-step solution to a problem", "C) Internet access", "D) Computer electricity"], answer: "B) A step-by-step solution to a problem" },
  ] },
  { slug: "pe-quiz", title: "Physical Education", icon: "↗", accent: "coral", summary: "Team sports, fitness, and safe movement.", questions: [
    { level: "Easy", prompt: "How many players are on the field for one soccer team during a match?", options: ["A) 9", "B) 10", "C) 11", "D) 12"], answer: "C) 11" },
    { level: "Medium", prompt: "Which exercise mainly improves cardiovascular fitness?", options: ["A) Running", "B) Stretching", "C) Meditation", "D) Sitting"], answer: "A) Running" },
    { level: "Hard", prompt: "What is the main purpose of a warm-up before exercise?", options: ["A) To make you tired", "B) To prepare the body and reduce injury risk", "C) To lower your heart rate", "D) To replace exercise"], answer: "B) To prepare the body and reduce injury risk" },
  ] },
  { slug: "geography-quiz", title: "Geography", icon: "◎", accent: "gold", summary: "Continents, oceans, and countries around the globe.", questions: [
    { level: "Easy", prompt: "What is the largest continent in the world?", options: ["A) Africa", "B) Europe", "C) Asia", "D) Australia"], answer: "C) Asia" },
    { level: "Medium", prompt: "Which ocean is the largest?", options: ["A) Atlantic Ocean", "B) Indian Ocean", "C) Arctic Ocean", "D) Pacific Ocean"], answer: "D) Pacific Ocean" },
    { level: "Hard", prompt: "Which country has the largest land area in the world?", options: ["A) Canada", "B) China", "C) United States", "D) Russia"], answer: "D) Russia" },
  ] },
];
