/**
 * Projects Router — Rapbae CMS
 * Public: list published projects, get by slug
 * Admin: full CRUD, reorder, publish/unpublish, feature toggle
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjectBySlug,
  listProjects,
  logActivity,
  reorderProjects,
  updateProject,
} from "./db";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "관리자만 접근할 수 있습니다." });
  return next({ ctx });
});

const ExecutionItemSchema = z.object({
  phase: z.string(),
  action: z.string(),
  detail: z.string(),
});

const ResultItemSchema = z.object({
  metric: z.string(),
  value: z.string(),
  note: z.string().optional(),
});

const ProjectInputSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.string().default(""),
  client: z.string().default(""),
  role: z.string().default(""),
  scope: z.array(z.string()).default([]),
  year: z.string().default(""),
  description: z.string().default(""),
  tagline: z.string().default(""),
  coverImage: z.string().optional(),
  context: z.string().optional(),
  challenge: z.string().optional(),
  approach: z.string().optional(),
  execution: z.array(ExecutionItemSchema).default([]),
  results: z.array(ResultItemSchema).default([]),
  reflection: z.string().optional(),
  tags: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  pdfUrl: z.string().optional(),
  pptUrl: z.string().optional(),
  externalUrl: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
  sortOrder: z.number().default(0),
});

export const projectsRouter = router({
  // ── Public ──────────────────────────────────────────────────────────────────
  list: publicProcedure
    .input(z.object({ status: z.enum(["draft", "published", "all"]).optional() }).optional())
    .query(async ({ input }) => {
      const status = input?.status === "all" ? undefined : (input?.status ?? "published");
      return listProjects(status as "draft" | "published" | undefined);
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const project = await getProjectBySlug(input.slug);
      if (!project) throw new TRPCError({ code: "NOT_FOUND", message: "프로젝트를 찾을 수 없습니다." });
      return project;
    }),

  // ── Admin ───────────────────────────────────────────────────────────────────
  adminList: adminProcedure
    .input(z.object({ status: z.enum(["draft", "published", "all"]).optional() }).optional())
    .query(async ({ input }) => {
      const status = input?.status === "all" ? undefined : input?.status;
      return listProjects(status as "draft" | "published" | undefined);
    }),

  create: adminProcedure
    .input(ProjectInputSchema)
    .mutation(async ({ input, ctx }) => {
      const project = await createProject(input);
      await logActivity({ action: "create", entityType: "project", entityId: String(project?.id), entityTitle: input.title, performedBy: ctx.user.id });
      return project;
    }),

  update: adminProcedure
    .input(z.object({ id: z.number(), data: ProjectInputSchema.partial() }))
    .mutation(async ({ input, ctx }) => {
      const existing = await getProjectById(input.id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND" });
      const project = await updateProject(input.id, input.data);
      await logActivity({ action: "update", entityType: "project", entityId: String(input.id), entityTitle: existing.title, performedBy: ctx.user.id });
      return project;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const project = await deleteProject(input.id);
      if (!project) throw new TRPCError({ code: "NOT_FOUND" });
      await logActivity({ action: "delete", entityType: "project", entityId: String(input.id), entityTitle: project.title, performedBy: ctx.user.id });
      return { success: true };
    }),

  publish: adminProcedure
    .input(z.object({ id: z.number(), status: z.enum(["draft", "published"]) }))
    .mutation(async ({ input, ctx }) => {
      const existing = await getProjectById(input.id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND" });
      await updateProject(input.id, { status: input.status });
      await logActivity({ action: input.status === "published" ? "publish" : "unpublish", entityType: "project", entityId: String(input.id), entityTitle: existing.title, performedBy: ctx.user.id });
      return { success: true };
    }),

  setFeatured: adminProcedure
    .input(z.object({ id: z.number(), featured: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const existing = await getProjectById(input.id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND" });
      await updateProject(input.id, { featured: input.featured });
      await logActivity({ action: "update", entityType: "project", entityId: String(input.id), entityTitle: existing.title, performedBy: ctx.user.id });
      return { success: true };
    }),

  reorder: adminProcedure
    .input(z.object({ orderedIds: z.array(z.number()) }))
    .mutation(async ({ input, ctx }) => {
      await reorderProjects(input.orderedIds);
      await logActivity({ action: "update", entityType: "project", entityId: "bulk", entityTitle: "순서 변경", performedBy: ctx.user.id });
      return { success: true };
    }),
});
