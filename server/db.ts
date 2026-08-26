import { and, desc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { customAlphabet } from "nanoid";
import {
  activities,
  classGroups,
  completions,
  eventSettings,
  InsertUser,
  participants,
  quizSessions,
  submissions,
  teacherAccessGrants,
  users,
  votes,
} from "../drizzle/schema";
import { ENV } from "./_core/env";
import { canAwardCompletion, summarizePassport } from "./passportSummary";
import { getQuestionRoute, QUIZ_ACTIVITY_SLUGS, resolveQuestionRoute, toPublicQuestions, type GradeBand, type QuizActivitySlug } from "../shared/quizQuestionBank";

let _db: ReturnType<typeof drizzle> | null = null;

const createAccessCode = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 6);
const createQuizSessionToken = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 18);
const DEFAULT_CLASS_GROUPS = Array.from({ length: 10 }, (_, teacherIndex) => {
  const teacherNumber = teacherIndex + 1;
  const eventSection = teacherNumber <= 5 ? "boys" as const : "girls" as const;
  return Array.from({ length: 8 }, (_, classIndex) => ({ label: `Teacher${teacherNumber} · Class ${classIndex + 1}`, teacherSlot: `Teacher${teacherNumber}`, eventSection, isActive: 1 }));
}).flat();

const EVENT_ACTIVITY_CATALOG = [
  {
    slug: "welcome-quiz",
    title: "Welcome Quiz: How Digital Are You?",
    zone: "play" as const,
    kind: "quiz" as const,
    summary: "Start with a quick, visual quiz about technology and smart digital habits.",
    instructions: "Answer three quick questions. There is no fixed route—come back whenever you are ready.",
    resourceUrl: "https://drive.google.com/drive/folders/136zYQAFyX131S_B8nX2wOO7o77RbaIZt?usp=sharing",
    resourceLabel: "Teacher resource folder",
    points: 10,
    badgeKey: "curious-clicker",
    badgeName: "Curious Clicker",
    gradeHint: "A confident first step for Grades 6–12",
    displayOrder: 1,
  },
  {
    slug: "code-breaker",
    title: "Code Breaker",
    zone: "play" as const,
    kind: "puzzle" as const,
    summary: "Decode a binary message and use logic to reveal a secret ICT word.",
    instructions: "Solve the code at your own pace. Select the phrase that your code reveals.",
    resourceUrl: "https://drive.google.com/drive/folders/136zYQAFyX131S_B8nX2wOO7o77RbaIZt?usp=sharing",
    resourceLabel: "Replaceable puzzle media",
    points: 15,
    badgeKey: "logic-legend",
    badgeName: "Logic Legend",
    gradeHint: "Starter clues for Grades 6–7; bonus logic for Grades 10–12",
    displayOrder: 2,
  },
  {
    slug: "pixel-identity",
    title: "Pixel Identity Card",
    zone: "create" as const,
    kind: "creative" as const,
    summary: "Design a small avatar, badge, or digital sticker for your future tech self.",
    instructions: "Create your work in an approved drawing tool, then upload a screenshot or share a short description for moderation.",
    resourceUrl: "https://drive.google.com/drive/folders/136zYQAFyX131S_B8nX2wOO7o77RbaIZt?usp=sharing",
    resourceLabel: "Teacher creative-tool links",
    points: 15,
    badgeKey: "pixel-creator",
    badgeName: "Pixel Creator",
    gradeHint: "Use a simple 8×8 design or add an advanced theme",
    displayOrder: 3,
  },
  {
    slug: "dream-site",
    title: "Build a Dream ICT Club Site",
    zone: "create" as const,
    kind: "creative" as const,
    summary: "Sketch a one-screen homepage that would make students want to join the ICT Club.",
    instructions: "Include a title, a main message, one image idea, and a clear invitation. Upload a photo or screenshot for approval.",
    resourceUrl: "https://drive.google.com/drive/folders/136zYQAFyX131S_B8nX2wOO7o77RbaIZt?usp=sharing",
    resourceLabel: "Replaceable design prompts",
    points: 20,
    badgeKey: "ux-designer",
    badgeName: "UX Designer",
    gradeHint: "Draw, drag, or describe your design—every method counts",
    displayOrder: 4,
  },
  {
    slug: "cyber-escape",
    title: "Cyber Safety Escape",
    zone: "discover" as const,
    kind: "scenario" as const,
    summary: "Choose the safest actions when faced with a risky message, link, or online post.",
    instructions: "Read each situation, choose your safest response, and discover why responsible choices matter.",
    resourceUrl: "https://drive.google.com/drive/folders/136zYQAFyX131S_B8nX2wOO7o77RbaIZt?usp=sharing",
    resourceLabel: "Teacher cyber-safety resources",
    points: 15,
    badgeKey: "cyber-smart",
    badgeName: "Cyber Smart",
    gradeHint: "Short scenarios with optional deeper discussion prompts",
    displayOrder: 5,
  },
  {
    slug: "qr-quest",
    title: "QR Quest",
    zone: "discover" as const,
    kind: "hunt" as const,
    summary: "Use the QR clues placed around the event space to uncover the final word.",
    instructions: "Follow any clue order. Scan at least three event QR codes, collect the letters, then submit the discovery word.",
    resourceUrl: "https://drive.google.com/drive/folders/136zYQAFyX131S_B8nX2wOO7o77RbaIZt?usp=sharing",
    resourceLabel: "Teacher QR destination folder",
    points: 15,
    badgeKey: "digital-detective",
    badgeName: "Digital Detective",
    gradeHint: "A moving challenge for every grade band",
    displayOrder: 6,
  },
  {
    slug: "tech-timeline",
    title: "Tech Timeline Remix",
    zone: "discover" as const,
    kind: "timeline" as const,
    summary: "Put landmark technologies in order, then choose the one that has changed learning most.",
    instructions: "Drag or select the correct timeline order. Your vote helps shape the event display.",
    resourceUrl: "https://drive.google.com/drive/folders/136zYQAFyX131S_B8nX2wOO7o77RbaIZt?usp=sharing",
    resourceLabel: "Replaceable timeline content",
    points: 10,
    badgeKey: "tech-historian",
    badgeName: "Tech Historian",
    gradeHint: "Quick visual ordering task with an optional research prompt",
    displayOrder: 7,
  },
  {
    slug: "future-voice",
    title: "Voice of ICT",
    zone: "connect" as const,
    kind: "reflection" as const,
    summary: "Share one word or a short thought about what you hope to discover in ICT this year.",
    instructions: "Submit a positive, school-suitable word or short phrase. Approved responses appear in the live wall.",
    resourceUrl: "https://drive.google.com/drive/folders/136zYQAFyX131S_B8nX2wOO7o77RbaIZt?usp=sharing",
    resourceLabel: "Teacher reflection prompt",
    points: 10,
    badgeKey: "voice-of-ict",
    badgeName: "Voice of ICT",
    gradeHint: "Perfect for every learner, including reflective students",
    displayOrder: 8,
  },
  {
    slug: "future-vote",
    title: "Future Tech Vote",
    zone: "connect" as const,
    kind: "vote" as const,
    summary: "Vote for the technology skill you most want to develop this year.",
    instructions: "Choose one option. The live results wall updates automatically for connected displays.",
    resourceUrl: "https://drive.google.com/drive/folders/136zYQAFyX131S_B8nX2wOO7o77RbaIZt?usp=sharing",
    resourceLabel: "Teacher voting resources",
    points: 10,
    badgeKey: "future-ready",
    badgeName: "Future Ready",
    gradeHint: "A quick, meaningful collective choice",
    displayOrder: 9,
  },
  {
    slug: "debug-station",
    title: "Debug Station: Find the Bugs",
    zone: "play" as const,
    kind: "puzzle" as const,
    summary: "Inspect block or Python-style code, spot three bugs, and type the line numbers to unlock the clue.",
    instructions: "Grades 6–7 can use the block-code clue; Grades 8–12 can inspect the Python-style version. Enter the three faulty line numbers.",
    resourceUrl: "https://drive.google.com/drive/folders/136zYQAFyX131S_B8nX2wOO7o77RbaIZt?usp=sharing",
    resourceLabel: "Teacher debug-code prompts",
    points: 15,
    badgeKey: "bug-buster",
    badgeName: "Bug Buster",
    gradeHint: "Scratch-style clues for Grades 6–7; Python logic for Grades 8–12",
    displayOrder: 10,
  },
  {
    slug: "pixel-puzzle",
    title: "Pixel Puzzle: Future School",
    zone: "create" as const,
    kind: "creative" as const,
    summary: "Create pixel art of the future of our school using a limited colour palette.",
    instructions: "Use an approved drawing app or tablet canvas. Upload the image or briefly explain the design for gallery review.",
    resourceUrl: "https://drive.google.com/drive/folders/136zYQAFyX131S_B8nX2wOO7o77RbaIZt?usp=sharing",
    resourceLabel: "Teacher pixel-art prompt",
    points: 20,
    badgeKey: "pixel-pioneer",
    badgeName: "Pixel Pioneer",
    gradeHint: "Try an 8×8 grid first; advanced learners can build a 16×16 scene",
    displayOrder: 11,
  },
  {
    slug: "tech-charades",
    title: "Tech Charades: GIF Creator",
    zone: "connect" as const,
    kind: "creative" as const,
    summary: "Act out a technology term, create a three-frame GIF or short video, and share it for the digital board.",
    instructions: "Choose a term such as Wi-Fi, robot, algorithm, or virtual reality. Upload a short, school-suitable GIF or video for moderation.",
    resourceUrl: "https://drive.google.com/drive/folders/136zYQAFyX131S_B8nX2wOO7o77RbaIZt?usp=sharing",
    resourceLabel: "Teacher charades terms",
    points: 20,
    badgeKey: "tech-performer",
    badgeName: "Tech Performer",
    gradeHint: "Work in small teams and keep recordings to five seconds",
    displayOrder: 12,
  },
  {
    slug: "welcome-year-pulse",
    title: "Welcome Pulse: Your Year Ahead",
    zone: "connect" as const,
    kind: "reflection" as const,
    summary: "Share your project ideas, elective interests, timetable hopes, and one school rule you already know.",
    instructions: "Complete four quick welcome questions. Staff can review suitable responses for the live student-voice display.",
    resourceUrl: "https://drive.google.com/drive/folders/136zYQAFyX131S_B8nX2wOO7o77RbaIZt?usp=sharing",
    resourceLabel: "Teacher welcome-prompt guide",
    points: 10,
    badgeKey: "school-starter",
    badgeName: "School Starter",
    gradeHint: "A quick way to share your plans for the year",
    displayOrder: 13,
  },
];

const SUBJECT_QUIZ_CATALOG = [
  { slug: "ict-display-challenge", title: "ICT Display Quest", zone: "play" as const, kind: "quiz" as const, summary: "A poster-inspired challenge using ICT, Computing, and keyboard-shortcut display clues.", instructions: "Use the three classroom displays to answer three quick ICT questions.", resourceUrl: null, resourceLabel: null, points: 30, badgeKey: "display-detective", badgeName: "Display Detective", gradeHint: "Poster challenge · 3 quick questions", displayOrder: 1 },
  { slug: "ict-foundations", title: "ICT Foundations", zone: "discover" as const, kind: "quiz" as const, summary: "Build confident knowledge of devices, data, networks, and responsible digital habits.", instructions: "Use the ICT I Can posters and Computing Area Rules to answer three ICT questions.", resourceUrl: null, resourceLabel: null, points: 30, badgeKey: "ict-navigator", badgeName: "ICT Navigator", gradeHint: "Rules and skills · 3 quick questions", displayOrder: 2 },
  { slug: "keyboard-shortcuts", title: "Keyboard Shortcut Sprint", zone: "play" as const, kind: "quiz" as const, summary: "Practise useful shortcuts from the supplied keyboard displays.", instructions: "Read the shortcut posters, then complete an Easy, Medium, and Hard ICT route.", resourceUrl: null, resourceLabel: null, points: 30, badgeKey: "shortcut-sprinter", badgeName: "Shortcut Sprinter", gradeHint: "Shortcut posters · 3 quick questions", displayOrder: 3 },
  { slug: "excel-skills", title: "Excel Skills Lab", zone: "create" as const, kind: "quiz" as const, summary: "Use the Excel booklet and skill pages to organise, calculate, and present data.", instructions: "Read the Excel resources, then answer a fresh grade-aware three-question route.", resourceUrl: null, resourceLabel: null, points: 30, badgeKey: "spreadsheet-strategist", badgeName: "Spreadsheet Strategist", gradeHint: "Excel booklet · 3 quick questions", displayOrder: 4 },
  { slug: "digital-technology-or-not", title: "Digital Technology or Not?", zone: "play" as const, kind: "quiz" as const, summary: "Use the classroom presentation clues to sort digital tools, information, and everyday objects.", instructions: "Answer a fresh three-question technology route chosen for your grade band.", resourceUrl: null, resourceLabel: null, points: 30, badgeKey: "tech-spotter", badgeName: "Tech Spotter", gradeHint: "Presentation challenge · 3 quick questions", displayOrder: 5 },
];

export const LIVE_POLL_PROMPTS = [
  { key: "future-tech", eyebrow: "Future Tech Vote", title: "Skills students want", question: "Which ICT skill would you most like to develop this year?" },
  { key: "timetable-pulse", eyebrow: "Welcome Live Poll", title: "Timetable priorities", question: "Which timetable detail would you like to understand first?" },
  { key: "elective-pulse", eyebrow: "Welcome Live Poll", title: "Electives students are curious about", question: "Which ICT elective interests you most this year?" },
] as const;

export const LIVE_POLL_KEYS = LIVE_POLL_PROMPTS.map(prompt => prompt.key);

const VALIDATED_ACTIVITY_ANSWERS: Record<string, string> = {
  "welcome-quiz": "Check, create, and be kind online",
  "cyber-escape": "T3@m0n@1!",
  "code-breaker": "CREATE",
  "tech-timeline": "Internet → Smartphone → AI tools",
  "debug-station": "2,4,6",
};

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

async function requireDb() {
  const db = await getDb();
  if (!db) throw new Error("The event database is not available.");
  return db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  textFields.forEach(field => {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  });
  values.lastSignedIn = user.lastSignedIn ?? new Date();
  updateSet.lastSignedIn = values.lastSignedIn;
  const normalizedEmail = user.email?.trim().toLowerCase();
  const grant = normalizedEmail ? (await db.select().from(teacherAccessGrants).where(and(eq(teacherAccessGrants.email, normalizedEmail), eq(teacherAccessGrants.isActive, 1))).limit(1))[0] : undefined;
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
    values.staffSection = "all";
    updateSet.staffSection = "all";
  } else if (grant) {
    values.role = "teacher";
    values.staffSection = grant.staffSection;
    updateSet.role = "teacher";
    updateSet.staffSection = grant.staffSection;
  }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function listTeacherAccessGrants() {
  const db = await requireDb();
  return db.select().from(teacherAccessGrants).orderBy(teacherAccessGrants.email);
}

export async function saveTeacherAccessGrant(input: { email: string; staffSection: "boys" | "girls" | "all" }) {
  const db = await requireDb();
  const email = input.email.trim().toLowerCase();
  await db.insert(teacherAccessGrants).values({ email, staffSection: input.staffSection, isActive: 1 }).onDuplicateKeyUpdate({ set: { staffSection: input.staffSection, isActive: 1, updatedAt: new Date() } });
}

export async function setTeacherAccessGrantStatus(input: { id: number; isActive: boolean }) {
  const db = await requireDb();
  await db.update(teacherAccessGrants).set({ isActive: input.isActive ? 1 : 0, updatedAt: new Date() }).where(eq(teacherAccessGrants.id, input.id));
}

export async function ensureEventCatalog() {
  const db = await requireDb();
  await db.update(activities).set({ isActive: 0, updatedAt: new Date() });
  for (const activity of SUBJECT_QUIZ_CATALOG) {
    const activeSubject = { ...activity, isActive: 1 };
    await db.insert(activities).values(activeSubject).onDuplicateKeyUpdate({
      set: { ...activeSubject, updatedAt: new Date() },
    });
  }
}

export async function listActivities() {
  await ensureEventCatalog();
  const db = await requireDb();
  return db.select().from(activities).where(eq(activities.isActive, 1)).orderBy(activities.displayOrder);
}

async function ensureClassGroups() {
  const db = await requireDb();
  const existing = await db.select({ id: classGroups.id }).from(classGroups).limit(1);
  if (!existing.length) await db.insert(classGroups).values(DEFAULT_CLASS_GROUPS);
}

export async function listClassGroups(eventSection?: "boys" | "girls") {
  await ensureClassGroups();
  const db = await requireDb();
  return db.select().from(classGroups).where(eventSection ? and(eq(classGroups.isActive, 1), eq(classGroups.eventSection, eventSection)) : eq(classGroups.isActive, 1)).orderBy(classGroups.teacherSlot, classGroups.label);
}

export async function getClassSession(classGroupId: number) {
  await ensureClassGroups();
  const db = await requireDb();
  const classGroup = await db.select({ id: classGroups.id, eventSection: classGroups.eventSection }).from(classGroups).where(and(eq(classGroups.id, classGroupId), eq(classGroups.isActive, 1))).limit(1);
  if (!classGroup[0]) throw new Error("This class session is not available. Please scan your teacher's current QR code.");
  return classGroup[0];
}

function normalizeClassLabel(value: string) {
  const match = value.trim().replace(/\s+/g, " ").match(/^(boy|boys|girl|girls)\s+(6|7|8|9|10|11|12)\s*([a-z])$/i);
  if (!match) throw new Error("Enter your section and class like Boy 7F or Girl 10A.");
  const eventSection = match[1].toLowerCase().startsWith("boy") ? "boys" as const : "girls" as const;
  const classLabel = `${eventSection === "boys" ? "Boy" : "Girl"} ${match[2]}${match[3].toUpperCase()}`;
  return { eventSection, classLabel };
}

export async function createParticipant(input: { displayName: string; gradeBand: "6-7" | "8-9" | "10-12"; classLabel: string }) {
  const db = await requireDb();
  const { eventSection, classLabel } = normalizeClassLabel(input.classLabel);
  const palette = ["gold", "coral", "teal", "violet"];
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const accessCode = `TFA-${createAccessCode()}`;
    try {
      await db.insert(participants).values({
        displayName: input.displayName.trim(),
        gradeBand: input.gradeBand,
        eventSection,
        classLabel,
        accessCode,
        avatarColor: palette[Math.floor(Math.random() * palette.length)] ?? "gold",
      });
      const created = await db.select().from(participants).where(eq(participants.accessCode, accessCode)).limit(1);
      if (created[0]) return created[0];
    } catch (error) {
      if (attempt === 3) throw error;
    }
  }
  throw new Error("Could not create a participant passport. Please try again.");
}

async function getParticipantByCode(accessCode: string) {
  const db = await requireDb();
  const found = await db.select().from(participants).where(eq(participants.accessCode, accessCode)).limit(1);
  if (!found[0]) throw new Error("Passport not found. Start your passport first.");
  return found[0];
}

export async function getPassport(accessCode: string) {
  const db = await requireDb();
  const participant = await getParticipantByCode(accessCode);
  const [activityRows, completionRows] = await Promise.all([
    listActivities(),
    db.select().from(completions).where(eq(completions.participantId, participant.id)),
  ]);
  const summary = summarizePassport(completionRows, activityRows);
  return { participant, completions: completionRows, ...summary };
}

export async function startQuizSession(input: { accessCode: string; activitySlug: string }) {
  const db = await requireDb();
  const participant = await getParticipantByCode(input.accessCode);
  const activity = await db.select().from(activities).where(eq(activities.slug, input.activitySlug)).limit(1);
  if (!activity[0] || !QUIZ_ACTIVITY_SLUGS.includes(activity[0].slug as QuizActivitySlug)) throw new Error("This quiz is not available.");
  const existing = await db.select().from(quizSessions).where(and(eq(quizSessions.participantId, participant.id), eq(quizSessions.activityId, activity[0].id))).limit(1);
  let session = existing[0];
  if (!session) {
    const issuedSessions = await db.select({ questionIdsJson: quizSessions.questionIdsJson }).from(quizSessions).where(eq(quizSessions.activityId, activity[0].id));
    const issuedQuestionIds = issuedSessions.flatMap(({ questionIdsJson }) => {
      try {
        const parsed: unknown = JSON.parse(questionIdsJson);
        return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
      } catch {
        return [];
      }
    });
    const questions = getQuestionRoute(activity[0].slug as QuizActivitySlug, participant.gradeBand as GradeBand, Math.random, issuedQuestionIds);
    await db.insert(quizSessions).values({
      sessionToken: createQuizSessionToken(),
      participantId: participant.id,
      activityId: activity[0].id,
      questionIdsJson: JSON.stringify(questions.map(question => question.id)),
    });
    const created = await db.select().from(quizSessions).where(and(eq(quizSessions.participantId, participant.id), eq(quizSessions.activityId, activity[0].id))).limit(1);
    session = created[0];
  }
  if (!session) throw new Error("Your quiz route could not be prepared. Please try again.");
  let questionIds: unknown;
  try { questionIds = JSON.parse(session.questionIdsJson); } catch { throw new Error("Your quiz route could not be read. Please reopen the activity."); }
  if (!Array.isArray(questionIds) || !questionIds.every(id => typeof id === "string")) throw new Error("Your quiz route could not be read. Please reopen the activity.");
  const questions = resolveQuestionRoute(activity[0].slug as QuizActivitySlug, participant.gradeBand as GradeBand, questionIds);
  return { sessionToken: session.sessionToken, activitySlug: activity[0].slug, title: activity[0].title, questionCount: questions.length, questions: toPublicQuestions(questions) };
}

export async function completeActivity(input: { accessCode: string; activitySlug: string; responseText?: string; sessionToken?: string }) {
  const db = await requireDb();
  const participant = await getParticipantByCode(input.accessCode);
  const activity = await db.select().from(activities).where(eq(activities.slug, input.activitySlug)).limit(1);
  if (!activity[0]) throw new Error("Activity not found.");
  let quizScore: number | undefined;
  let awardedPoints = activity[0].points;
  let storedResponseText = input.responseText?.trim() || null;
  if (QUIZ_ACTIVITY_SLUGS.includes(activity[0].slug as QuizActivitySlug)) {
    if (!input.sessionToken) throw new Error("Please reopen this quiz to load your question route.");
    const session = await db.select().from(quizSessions).where(eq(quizSessions.sessionToken, input.sessionToken)).limit(1);
    if (!session[0] || session[0].participantId !== participant.id || session[0].activityId !== activity[0].id) throw new Error("This quiz route does not belong to your passport. Please reopen the activity.");
    let response: { questionIds?: unknown; answers?: unknown };
    let questionIds: unknown;
    try {
      response = JSON.parse(input.responseText ?? "{}");
      questionIds = JSON.parse(session[0].questionIdsJson);
    } catch { throw new Error("Please complete all three quiz questions before submitting."); }
    if (!Array.isArray(response.answers) || response.answers.length !== 3 || !response.answers.every(answer => typeof answer === "string") || !Array.isArray(response.questionIds) || !Array.isArray(questionIds) || response.questionIds.join("|") !== questionIds.join("|")) {
      throw new Error("Please complete all three quiz questions before submitting.");
    }
    const questions = resolveQuestionRoute(activity[0].slug as QuizActivitySlug, participant.gradeBand as GradeBand, questionIds as string[]);
    quizScore = response.answers.reduce((score, answer, index) => score + (answer === questions[index]?.answer ? 1 : 0), 0);
    awardedPoints = quizScore * 10;
    storedResponseText = JSON.stringify({ questionIds, answers: response.answers });
  } else {
    const correctAnswer = VALIDATED_ACTIVITY_ANSWERS[activity[0].slug];
    if (correctAnswer && input.responseText?.trim() !== correctAnswer) throw new Error("That answer is not quite right. Review the challenge and try again.");
  }
  const existing = await db.select().from(completions).where(and(eq(completions.participantId, participant.id), eq(completions.activityId, activity[0].id))).limit(1);
  if (!canAwardCompletion(Boolean(existing[0]))) return { alreadyCompleted: true, pointsAdded: 0, activity: activity[0] };
  await db.insert(completions).values({
    participantId: participant.id,
    activityId: activity[0].id,
    responseText: storedResponseText,
    awardedPoints,
  });
  if (input.sessionToken && QUIZ_ACTIVITY_SLUGS.includes(activity[0].slug as QuizActivitySlug)) await db.update(quizSessions).set({ completedAt: new Date() }).where(eq(quizSessions.sessionToken, input.sessionToken));
  return { alreadyCompleted: false, pointsAdded: awardedPoints, quizScore, questionCount: quizScore === undefined ? undefined : 3, activity: activity[0] };
}

export async function createCreativeSubmission(input: {
  accessCode: string;
  activitySlug?: string;
  kind: "pixel-art" | "meme" | "website-mockup" | "reflection" | "other";
  body?: string;
  fileUrl?: string;
  storageKey?: string;
  fileName?: string;
  mimeType?: string;
}) {
  const db = await requireDb();
  const participant = await getParticipantByCode(input.accessCode);
  let activityId: number | undefined;
  if (input.activitySlug) {
    const activity = await db.select().from(activities).where(eq(activities.slug, input.activitySlug)).limit(1);
    activityId = activity[0]?.id;
  }
  await db.insert(submissions).values({
    participantId: participant.id,
    activityId,
    kind: input.kind,
    body: input.body?.trim() || null,
    fileUrl: input.fileUrl,
    storageKey: input.storageKey,
    fileName: input.fileName,
    mimeType: input.mimeType,
  });
}

export async function castVote(input: { accessCode: string; optionText: string; promptKey?: string }) {
  const db = await requireDb();
  const participant = await getParticipantByCode(input.accessCode);
  const promptKey = input.promptKey ?? "future-tech";
  if (!LIVE_POLL_KEYS.includes(promptKey as (typeof LIVE_POLL_KEYS)[number])) throw new Error("That live-poll question is not available.");
  await db.insert(votes).values({ participantId: participant.id, promptKey, optionText: input.optionText }).onDuplicateKeyUpdate({
    set: { optionText: input.optionText, createdAt: new Date() },
  });
}

export async function getLiveBoard(eventSection?: "boys" | "girls", classGroupId?: number) {
  await ensureClassGroups();
  const db = await requireDb();
  const [participantRows, completionRows, activityRows, approvedSubmissions, voteRows, subjectCompletionRows] = await Promise.all([
    db.select().from(participants).where(classGroupId ? and(eq(participants.isActive, 1), eq(participants.classGroupId, classGroupId)) : eventSection ? and(eq(participants.isActive, 1), eq(participants.eventSection, eventSection)) : eq(participants.isActive, 1)),
    db.select().from(completions),
    listActivities(),
    db.select({ submission: submissions, displayName: participants.displayName, activityTitle: activities.title })
      .from(submissions)
      .innerJoin(participants, eq(submissions.participantId, participants.id))
      .leftJoin(activities, eq(submissions.activityId, activities.id))
      .where(eq(submissions.status, "approved"))
      .orderBy(desc(submissions.reviewedAt)),
    db.select().from(votes),
    db.select({ completion: completions, activity: activities, displayName: participants.displayName })
      .from(completions)
      .innerJoin(activities, eq(completions.activityId, activities.id))
      .innerJoin(participants, eq(completions.participantId, participants.id))
      .where(classGroupId ? and(eq(participants.isActive, 1), eq(participants.classGroupId, classGroupId)) : eventSection ? and(eq(participants.isActive, 1), eq(participants.eventSection, eventSection)) : eq(participants.isActive, 1)),
  ]);
  const visibleParticipantIds = participantRows.map(participant => participant.id);
  const visibleCompletions = completionRows.filter(item => visibleParticipantIds.includes(item.participantId));
  const participantScores = participantRows.map(participant => {
    const personCompletions = visibleCompletions.filter(item => item.participantId === participant.id);
    const points = personCompletions.reduce((sum, item) => sum + item.awardedPoints, 0);
    return {
      id: participant.id,
      displayName: participant.displayName,
      gradeBand: participant.gradeBand,
      avatarColor: participant.avatarColor,
      points,
      completedCount: personCompletions.length,
      badgeCount: personCompletions.length,
      badges: personCompletions.map(completion => activityRows.find(activity => activity.id === completion.activityId)?.badgeName).filter((badge): badge is string => Boolean(badge)),
    };
  }).sort((a, b) => b.points - a.points || b.completedCount - a.completedCount).slice(0, 8);
  const votesForPrompt = (promptKey: string) => {
    const counts = voteRows.filter(vote => vote.promptKey === promptKey).reduce<Record<string, number>>((accumulator, vote) => {
      accumulator[vote.optionText] = (accumulator[vote.optionText] ?? 0) + 1;
      return accumulator;
    }, {});
    return Object.entries(counts).map(([option, count]) => ({ option, count })).sort((a, b) => b.count - a.count);
  };
  const totalPoints = visibleCompletions.reduce((sum, completion) => sum + completion.awardedPoints, 0);
  const classGroup = classGroupId ? (await db.select().from(classGroups).where(eq(classGroups.id, classGroupId)).limit(1))[0] : undefined;
  const subjectResults = subjectCompletionRows.map(row => {
    if (!QUIZ_ACTIVITY_SLUGS.includes(row.activity.slug as QuizActivitySlug)) return undefined;
    const score = Math.max(0, Math.min(3, Math.round(row.completion.awardedPoints / 10)));
    return { participantId: row.completion.participantId, subject: row.activity.title, score, questionCount: 3, points: row.completion.awardedPoints, completedAt: row.completion.completedAt, name: row.displayName };
  }).filter((item): item is NonNullable<typeof item> => Boolean(item)).sort((a, b) => b.score - a.score || b.points - a.points).slice(0, 12);
  return {
    participants: participantScores,
    eventSection: eventSection ?? "all",
    classGroupId: classGroupId ?? null,
    classGroup: classGroup ? { id: classGroup.id, label: classGroup.label, teacherSlot: classGroup.teacherSlot } : null,
    totals: { participantCount: participantRows.length, completionCount: visibleCompletions.length, totalPoints, activityCount: activityRows.length },
    votes: votesForPrompt("future-tech"),
    icebreakerPolls: LIVE_POLL_PROMPTS.filter(prompt => prompt.key !== "future-tech").map(prompt => ({ ...prompt, votes: votesForPrompt(prompt.key) })),
    subjectResults,
    words: approvedSubmissions.filter(item => item.submission.kind === "reflection" && item.submission.body).slice(0, 24).map(item => item.submission.body as string),
    recentWork: approvedSubmissions.filter(item => item.submission.kind !== "reflection").slice(0, 8).map(item => ({
      id: item.submission.id,
      name: item.displayName,
      title: item.activityTitle ?? "Digital Discovery",
      body: item.submission.body,
      fileUrl: item.submission.fileUrl,
      fileName: item.submission.fileName,
      mimeType: item.submission.mimeType,
      kind: item.submission.kind,
      reviewedAt: item.submission.reviewedAt,
    })),
  };
}

export async function getModerationQueue() {
  const db = await requireDb();
  return db.select({ submission: submissions, displayName: participants.displayName, gradeBand: participants.gradeBand, activityTitle: activities.title })
    .from(submissions)
    .innerJoin(participants, eq(submissions.participantId, participants.id))
    .leftJoin(activities, eq(submissions.activityId, activities.id))
    .where(eq(submissions.status, "pending"))
    .orderBy(desc(submissions.createdAt));
}

export async function moderateSubmission(input: { submissionId: number; status: "approved" | "rejected"; adminNote?: string; reviewerId: number }) {
  const db = await requireDb();
  await db.update(submissions).set({
    status: input.status,
    adminNote: input.adminNote?.trim() || null,
    reviewedAt: new Date(),
    reviewedBy: input.reviewerId,
  }).where(eq(submissions.id, input.submissionId));
}

export async function getStaffOverview(staffSection: "boys" | "girls" | "all" = "all") {
  const db = await requireDb();
  const [participantRows, completionRows, pendingRows, approvedRows, activityRows] = await Promise.all([
    db.select().from(participants),
    db.select().from(completions),
    db.select().from(submissions).where(eq(submissions.status, "pending")),
    db.select().from(submissions).where(eq(submissions.status, "approved")),
    listActivities(),
  ]);
  const scopedParticipants = staffSection === "all" ? participantRows : participantRows.filter(participant => participant.eventSection === staffSection);
  const scopedParticipantIds = new Set(scopedParticipants.map(participant => participant.id));
  const scopedCompletions = completionRows.filter(completion => scopedParticipantIds.has(completion.participantId));
  const activityCount = activityRows.length;
  return {
    totals: {
      participants: scopedParticipants.length,
      completions: scopedCompletions.length,
      pendingSubmissions: pendingRows.length,
      approvedSubmissions: approvedRows.length,
      activeActivities: activityCount,
    },
    activities: activityRows,
    participants: scopedParticipants.map(participant => {
      const personCompletions = scopedCompletions.filter(completion => completion.participantId === participant.id);
      return {
        id: participant.id,
        displayName: participant.displayName,
        gradeBand: participant.gradeBand,
        eventSection: participant.eventSection,
        isActive: participant.isActive,
        completedCount: personCompletions.length,
        totalPoints: personCompletions.reduce((sum, completion) => sum + completion.awardedPoints, 0),
        activityCount,
      };
    }).sort((a, b) => b.totalPoints - a.totalPoints || b.completedCount - a.completedCount),
    resources: await db.select().from(eventSettings),
  };
}

export async function updateActivityResource(input: { activityId: number; resourceUrl: string; resourceLabel: string }) {
  const db = await requireDb();
  await db.update(activities).set({ resourceUrl: input.resourceUrl.trim(), resourceLabel: input.resourceLabel.trim(), updatedAt: new Date() }).where(eq(activities.id, input.activityId));
}

export async function setParticipantVisibility(input: { participantId: number; isActive: boolean; staffSection: "boys" | "girls" | "all" }) {
  const db = await requireDb();
  const participant = await db.select().from(participants).where(eq(participants.id, input.participantId)).limit(1);
  if (!participant[0]) throw new Error("Student record not found.");
  if (input.staffSection !== "all" && participant[0].eventSection !== input.staffSection) throw new Error("You can manage only your assigned event section.");
  await db.update(participants).set({ isActive: input.isActive ? 1 : 0, updatedAt: new Date() }).where(eq(participants.id, input.participantId));
}

export async function getSubjectResultsExport(staffSection: "boys" | "girls" | "all" = "all") {
  const db = await requireDb();
  const rows = await db.select({
    displayName: participants.displayName,
    gradeBand: participants.gradeBand,
    eventSection: participants.eventSection,
    subject: activities.title,
    awardedPoints: completions.awardedPoints,
    completedAt: completions.completedAt,
  })
    .from(completions)
    .innerJoin(participants, eq(completions.participantId, participants.id))
    .innerJoin(activities, eq(completions.activityId, activities.id))
    .where(staffSection === "all" ? inArray(activities.slug, QUIZ_ACTIVITY_SLUGS) : and(inArray(activities.slug, QUIZ_ACTIVITY_SLUGS), eq(participants.eventSection, staffSection)))
    .orderBy(desc(completions.completedAt));

  return rows.map(row => ({
    name: row.displayName,
    gradeBand: row.gradeBand,
    eventSection: row.eventSection,
    subject: row.subject,
    score: Math.max(0, Math.min(3, Math.round(row.awardedPoints / 10))),
    points: row.awardedPoints,
    completedAt: row.completedAt,
  }));
}

export async function resetSubjectResults() {
  const db = await requireDb();
  const activeSubjects = await listActivities();
  const subjectIds = activeSubjects.map(activity => activity.id);
  if (!subjectIds.length) return { cleared: 0 };

  const existing = await db.select({ id: completions.id }).from(completions).where(inArray(completions.activityId, subjectIds));
  if (existing.length) await db.delete(completions).where(inArray(completions.activityId, subjectIds));
  await db.delete(quizSessions).where(inArray(quizSessions.activityId, subjectIds));
  return { cleared: existing.length };
}
