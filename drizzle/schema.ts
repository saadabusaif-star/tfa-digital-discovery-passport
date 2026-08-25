import { int, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const participants = mysqlTable("participants", {
  id: int("id").autoincrement().primaryKey(),
  displayName: varchar("displayName", { length: 80 }).notNull(),
  gradeBand: mysqlEnum("gradeBand", ["6-7", "8-9", "10-12"]).notNull(),
  accessCode: varchar("accessCode", { length: 16 }).notNull().unique(),
  avatarColor: varchar("avatarColor", { length: 24 }).default("gold").notNull(),
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const activities = mysqlTable("activities", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 120 }).notNull(),
  zone: mysqlEnum("zone", ["play", "create", "discover", "connect"]).notNull(),
  kind: mysqlEnum("kind", ["quiz", "scenario", "puzzle", "hunt", "timeline", "reflection", "creative", "vote"]).notNull(),
  summary: text("summary").notNull(),
  instructions: text("instructions").notNull(),
  resourceUrl: varchar("resourceUrl", { length: 512 }),
  resourceLabel: varchar("resourceLabel", { length: 160 }),
  points: int("points").default(10).notNull(),
  badgeKey: varchar("badgeKey", { length: 64 }).notNull(),
  badgeName: varchar("badgeName", { length: 80 }).notNull(),
  gradeHint: varchar("gradeHint", { length: 120 }).notNull(),
  isActive: int("isActive").default(1).notNull(),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const completions = mysqlTable("completions", {
  id: int("id").autoincrement().primaryKey(),
  participantId: int("participantId").notNull(),
  activityId: int("activityId").notNull(),
  responseText: text("responseText"),
  awardedPoints: int("awardedPoints").default(0).notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
}, table => [
  uniqueIndex("completions_participant_activity_unique").on(table.participantId, table.activityId),
]);

export const submissions = mysqlTable("submissions", {
  id: int("id").autoincrement().primaryKey(),
  participantId: int("participantId").notNull(),
  activityId: int("activityId"),
  kind: mysqlEnum("kind", ["pixel-art", "meme", "website-mockup", "reflection", "other"]).notNull(),
  body: text("body"),
  fileUrl: varchar("fileUrl", { length: 512 }),
  storageKey: varchar("storageKey", { length: 512 }),
  fileName: varchar("fileName", { length: 255 }),
  mimeType: varchar("mimeType", { length: 128 }),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  adminNote: text("adminNote"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  reviewedAt: timestamp("reviewedAt"),
  reviewedBy: int("reviewedBy"),
});

export const votes = mysqlTable("votes", {
  id: int("id").autoincrement().primaryKey(),
  participantId: int("participantId").notNull(),
  promptKey: varchar("promptKey", { length: 64 }).notNull(),
  optionText: varchar("optionText", { length: 160 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, table => [
  uniqueIndex("votes_participant_prompt_unique").on(table.participantId, table.promptKey),
]);

export const eventSettings = mysqlTable("event_settings", {
  settingKey: varchar("settingKey", { length: 80 }).primaryKey(),
  settingValue: text("settingValue").notNull(),
  label: varchar("label", { length: 160 }).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Participant = typeof participants.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type Completion = typeof completions.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
export type Vote = typeof votes.$inferSelect;
