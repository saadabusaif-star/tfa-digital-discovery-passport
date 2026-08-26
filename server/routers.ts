import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router, staffProcedure } from "./_core/trpc";
import {
  castVote,
  completeActivity,
  createCreativeSubmission,
  createParticipant,
  getLiveBoard,
  listTeacherAccessGrants,
  getModerationQueue,
  getPassport,
  startQuizSession,
  getStaffOverview,
  getSubjectResultsExport,
  listActivities,
  listClassGroups,
  moderateSubmission,
  resetSubjectResults,
  setParticipantVisibility,
  setTeacherAccessGrantStatus,
  saveTeacherAccessGrant,
  updateActivityResource,
} from "./db";
import { storagePut } from "./storage";

const passportCode = z.string().trim().regex(/^TFA-[A-Z0-9]{6}$/, "Enter a valid passport code.");
const activitySlug = z.string().trim().min(2).max(64);
const approvedMimeTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "video/mp4", "video/webm", "application/pdf"]);

function decodeUpload(dataBase64: string, mimeType: string) {
  if (!approvedMimeTypes.has(mimeType)) throw new Error("Please upload an approved image, GIF, short MP4/WebM video, or PDF only.");
  const raw = dataBase64.includes(",") ? dataBase64.split(",").pop() ?? "" : dataBase64;
  const buffer = Buffer.from(raw, "base64");
  if (!buffer.length || buffer.byteLength > 8 * 1024 * 1024) throw new Error("Evidence files must be smaller than 8 MB.");
  return buffer;
}

function safeFileName(fileName: string) {
  const cleaned = fileName.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-").slice(0, 80);
  return cleaned || "event-evidence";
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  event: router({
    activities: publicProcedure.query(() => listActivities()),
    join: publicProcedure.input(z.object({
      displayName: z.string().trim().min(2, "Please enter at least 2 characters.").max(80),
      gradeBand: z.enum(["6-7", "8-9", "10-12"]),
      classLabel: z.string().trim().min(5, "Enter your section and class, for example Boy 7F.").max(40),
    })).mutation(({ input }) => createParticipant(input)),
    passport: publicProcedure.input(z.object({ accessCode: passportCode })).query(({ input }) => getPassport(input.accessCode)),
    quizSession: publicProcedure.input(z.object({ accessCode: passportCode, activitySlug })).query(({ input }) => startQuizSession(input)),
    complete: publicProcedure.input(z.object({
      accessCode: passportCode,
      activitySlug,
      responseText: z.string().trim().max(2000).optional(),
      sessionToken: z.string().trim().min(12).max(40).optional(),
    })).mutation(({ input }) => completeActivity(input)),
    submit: publicProcedure.input(z.object({
      accessCode: passportCode,
      activitySlug: activitySlug.optional(),
      kind: z.enum(["pixel-art", "meme", "website-mockup", "reflection", "other"]),
      body: z.string().trim().max(600).optional(),
      upload: z.object({
        dataBase64: z.string().min(12),
        fileName: z.string().trim().min(1).max(160),
        mimeType: z.string().trim().max(120),
      }).optional(),
    }).refine(input => Boolean(input.body || input.upload), { message: "Add a short response or an evidence file before submitting." })).mutation(async ({ input }) => {
      let uploaded: { key: string; url: string } | undefined;
      if (input.upload) {
        const buffer = decodeUpload(input.upload.dataBase64, input.upload.mimeType);
        uploaded = await storagePut(`event-evidence/${input.accessCode}/${safeFileName(input.upload.fileName)}`, buffer, input.upload.mimeType);
      }
      await createCreativeSubmission({
        accessCode: input.accessCode,
        activitySlug: input.activitySlug,
        kind: input.kind,
        body: input.body,
        fileUrl: uploaded?.url,
        storageKey: uploaded?.key,
        fileName: input.upload?.fileName,
        mimeType: input.upload?.mimeType,
      });
      return { success: true } as const;
    }),
    vote: publicProcedure.input(z.object({
      accessCode: passportCode,
      optionText: z.string().trim().min(2).max(160),
      promptKey: z.enum(["future-tech", "timetable-pulse", "elective-pulse"]).optional(),
    })).mutation(({ input }) => castVote(input)),
    liveBoard: publicProcedure.input(z.object({ eventSection: z.enum(["boys", "girls"]).optional(), classGroupId: z.number().int().positive().optional(), classLabel: z.string().trim().max(40).optional() }).optional()).query(({ input }) => getLiveBoard(input?.eventSection, input?.classGroupId, input?.classLabel)),
  }),
  staff: router({
    overview: staffProcedure.query(({ ctx }) => getStaffOverview(ctx.user.staffSection)),
    moderationQueue: adminProcedure.query(() => getModerationQueue()),
    moderate: adminProcedure.input(z.object({
      submissionId: z.number().int().positive(),
      status: z.enum(["approved", "rejected"]),
      adminNote: z.string().trim().max(300).optional(),
    })).mutation(({ input, ctx }) => moderateSubmission({ ...input, reviewerId: ctx.user.id })),
    updateResource: adminProcedure.input(z.object({
      activityId: z.number().int().positive(),
      resourceUrl: z.string().trim().url().max(512),
      resourceLabel: z.string().trim().min(2).max(160),
    })).mutation(({ input }) => updateActivityResource(input)),
    setParticipantVisibility: staffProcedure.input(z.object({ participantId: z.number().int().positive(), isActive: z.boolean() })).mutation(({ input, ctx }) => setParticipantVisibility({ ...input, staffSection: ctx.user.staffSection })),
    exportResults: staffProcedure.query(({ ctx }) => getSubjectResultsExport(ctx.user.staffSection)),
    resetResults: adminProcedure.input(z.object({ confirmation: z.literal("RESET RESULTS") })).mutation(() => resetSubjectResults()),
    teacherAccess: adminProcedure.query(() => listTeacherAccessGrants()),
    saveTeacherAccess: adminProcedure.input(z.object({ email: z.string().trim().email().max(320), staffSection: z.enum(["boys", "girls", "all"]) })).mutation(({ input }) => saveTeacherAccessGrant(input)),
    setTeacherAccessStatus: adminProcedure.input(z.object({ id: z.number().int().positive(), isActive: z.boolean() })).mutation(({ input }) => setTeacherAccessGrantStatus(input)),
  }),
});

export type AppRouter = typeof appRouter;
