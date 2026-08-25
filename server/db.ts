import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { customAlphabet } from "nanoid";
import {
  activities,
  completions,
  eventSettings,
  InsertUser,
  participants,
  submissions,
  users,
  votes,
} from "../drizzle/schema";
import { ENV } from "./_core/env";
import { canAwardCompletion, summarizePassport } from "./passportSummary";

let _db: ReturnType<typeof drizzle> | null = null;

const createAccessCode = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 6);

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
];

const VALIDATED_ACTIVITY_ANSWERS: Record<string, string> = {
  "welcome-quiz": "Check, create, and be kind online",
  "cyber-escape": "Check the sender and tell a trusted adult",
  "code-breaker": "CREATE",
  "tech-timeline": "Internet → Smartphone → AI tools",
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
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function ensureEventCatalog() {
  const db = await requireDb();
  for (const activity of EVENT_ACTIVITY_CATALOG) {
    await db.insert(activities).values(activity).onDuplicateKeyUpdate({
      set: { ...activity, updatedAt: new Date() },
    });
  }
}

export async function listActivities() {
  await ensureEventCatalog();
  const db = await requireDb();
  return db.select().from(activities).where(eq(activities.isActive, 1)).orderBy(activities.displayOrder);
}

export async function createParticipant(input: { displayName: string; gradeBand: "6-7" | "8-9" | "10-12" }) {
  const db = await requireDb();
  const palette = ["gold", "coral", "teal", "violet"];
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const accessCode = `TFA-${createAccessCode()}`;
    try {
      await db.insert(participants).values({
        displayName: input.displayName.trim(),
        gradeBand: input.gradeBand,
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

export async function completeActivity(input: { accessCode: string; activitySlug: string; responseText?: string }) {
  const db = await requireDb();
  const participant = await getParticipantByCode(input.accessCode);
  const activity = await db.select().from(activities).where(eq(activities.slug, input.activitySlug)).limit(1);
  if (!activity[0]) throw new Error("Activity not found.");
  const correctAnswer = VALIDATED_ACTIVITY_ANSWERS[activity[0].slug];
  if (correctAnswer && input.responseText?.trim() !== correctAnswer) {
    throw new Error("That answer is not quite right. Review the challenge and try again.");
  }
  const existing = await db.select().from(completions).where(and(eq(completions.participantId, participant.id), eq(completions.activityId, activity[0].id))).limit(1);
  if (!canAwardCompletion(Boolean(existing[0]))) return { alreadyCompleted: true, pointsAdded: 0, activity: activity[0] };
  await db.insert(completions).values({
    participantId: participant.id,
    activityId: activity[0].id,
    responseText: input.responseText?.trim() || null,
    awardedPoints: activity[0].points,
  });
  return { alreadyCompleted: false, pointsAdded: activity[0].points, activity: activity[0] };
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

export async function castVote(input: { accessCode: string; optionText: string }) {
  const db = await requireDb();
  const participant = await getParticipantByCode(input.accessCode);
  await db.insert(votes).values({ participantId: participant.id, promptKey: "future-tech", optionText: input.optionText }).onDuplicateKeyUpdate({
    set: { optionText: input.optionText, createdAt: new Date() },
  });
}

export async function getLiveBoard() {
  const db = await requireDb();
  const [participantRows, completionRows, activityRows, approvedSubmissions, voteRows] = await Promise.all([
    db.select().from(participants).where(eq(participants.isActive, 1)),
    db.select().from(completions),
    listActivities(),
    db.select({ submission: submissions, displayName: participants.displayName, activityTitle: activities.title })
      .from(submissions)
      .innerJoin(participants, eq(submissions.participantId, participants.id))
      .leftJoin(activities, eq(submissions.activityId, activities.id))
      .where(eq(submissions.status, "approved"))
      .orderBy(desc(submissions.reviewedAt)),
    db.select().from(votes).where(eq(votes.promptKey, "future-tech")),
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
  const voteCounts = voteRows.reduce<Record<string, number>>((accumulator, vote) => {
    accumulator[vote.optionText] = (accumulator[vote.optionText] ?? 0) + 1;
    return accumulator;
  }, {});
  const totalPoints = visibleCompletions.reduce((sum, completion) => sum + completion.awardedPoints, 0);
  return {
    participants: participantScores,
    totals: { participantCount: participantRows.length, completionCount: visibleCompletions.length, totalPoints, activityCount: activityRows.length },
    votes: Object.entries(voteCounts).map(([option, count]) => ({ option, count })).sort((a, b) => b.count - a.count),
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

export async function getStaffOverview() {
  const db = await requireDb();
  const [participantRows, completionRows, pendingRows, approvedRows, activityRows] = await Promise.all([
    db.select().from(participants),
    db.select().from(completions),
    db.select().from(submissions).where(eq(submissions.status, "pending")),
    db.select().from(submissions).where(eq(submissions.status, "approved")),
    listActivities(),
  ]);
  const activityCount = activityRows.length;
  return {
    totals: {
      participants: participantRows.length,
      completions: completionRows.length,
      pendingSubmissions: pendingRows.length,
      approvedSubmissions: approvedRows.length,
      activeActivities: activityCount,
    },
    activities: activityRows,
    participants: participantRows.map(participant => {
      const personCompletions = completionRows.filter(completion => completion.participantId === participant.id);
      return {
        id: participant.id,
        displayName: participant.displayName,
        gradeBand: participant.gradeBand,
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

export async function setParticipantVisibility(input: { participantId: number; isActive: boolean }) {
  const db = await requireDb();
  await db.update(participants).set({ isActive: input.isActive ? 1 : 0, updatedAt: new Date() }).where(eq(participants.id, input.participantId));
}
