import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { contactService } from "./services/contactService";
import { portfolioService } from "./services/portfolioService";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";

export const contactSubmissionInput = z.object({
  name: z.string().trim().min(2).max(128),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(8).max(5000),
  website: z.string().trim().max(200).optional().or(z.literal("")),
});

const optionalUrl = z.union([
  z.literal(""),
  z.string().trim().url().max(512),
  z.string().trim().regex(/^[#/][^\s]*$/, "Use an absolute URL, hash target, or site-relative path").max(512),
]).optional();

const projectInput = z.object({
  id: z.number().int().positive().optional(),
  slug: z.string().trim().min(3).max(160),
  title: z.string().trim().min(2).max(200),
  summary: z.string().trim().min(1).max(5000),
  category: z.string().trim().min(2).max(96),
  techStack: z.string().trim().min(2).max(5000),
  liveUrl: optionalUrl,
  repoUrl: optionalUrl,
  featured: z.boolean(),
  sortOrder: z.number().int().min(0),
});

const skillInput = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().trim().min(1).max(96),
  category: z.string().trim().min(1).max(96),
  proficiency: z.number().int().min(0).max(100),
  sortOrder: z.number().int().min(0),
});

const articleInput = z.object({
  id: z.number().int().positive().optional(),
  slug: z.string().trim().min(3).max(160),
  title: z.string().trim().min(2).max(200),
  excerpt: z.string().trim().min(1).max(5000),
  tags: z.string().trim().min(2).max(5000),
  readTime: z.string().trim().max(32).optional(),
  url: optionalUrl,
  publishedAt: z.date().optional(),
});

const detailInput = z.object({
  id: z.number().int().positive().optional(),
  section: z.string().trim().min(2).max(64),
  label: z.string().trim().min(2).max(160),
  content: z.string().trim().max(5000),
  sortOrder: z.number().int().min(0),
});

const profileInput = z.object({
  displayName: z.string().trim().min(2).max(128),
  handle: z.string().trim().max(64).optional(),
  role: z.string().trim().min(2).max(160),
  intro: z.string().trim().min(1).max(5000),
  about: z.string().trim().min(1).max(5000),
  location: z.string().trim().max(160).optional(),
  email: z.string().trim().email().max(320).optional().or(z.literal("")),
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  instagramUrl: optionalUrl,
  resumeUrl: optionalUrl,
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  portfolio: router({
    get: publicProcedure.query(() => portfolioService.getPublicContent()),
    sendMessage: publicProcedure.input(contactSubmissionInput).mutation(({ input }) => {
      return contactService.submitMessage(input);
    }),
  }),
  admin: router({
    get: adminProcedure.query(() => portfolioService.getAdminContent()),
    updateSubmissionStatus: adminProcedure
      .input(z.object({ id: z.number().int().positive(), status: z.enum(["new", "read", "archived"]) }))
      .mutation(({ input }) => portfolioService.updateSubmissionStatus(input.id, input.status)),
    updateProfile: adminProcedure.input(profileInput).mutation(({ input }) => portfolioService.updateProfile(input)),
    saveProject: adminProcedure.input(projectInput).mutation(({ input }) => portfolioService.saveProject(input)),
    deleteProject: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => portfolioService.deleteProject(input.id)),
    saveSkill: adminProcedure.input(skillInput).mutation(({ input }) => portfolioService.saveSkill(input)),
    deleteSkill: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => portfolioService.deleteSkill(input.id)),
    saveArticle: adminProcedure.input(articleInput).mutation(({ input }) => portfolioService.saveArticle(input)),
    deleteArticle: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => portfolioService.deleteArticle(input.id)),
    saveDetail: adminProcedure.input(detailInput).mutation(({ input }) => portfolioService.saveDetail(input)),
    deleteDetail: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => portfolioService.deleteDetail(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
