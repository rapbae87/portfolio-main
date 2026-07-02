/**
 * Articles Router — Rapbae CMS
 * Public: list published articles, get by slug
 * Admin: full CRUD, publish/unpublish
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticleBySlug,
  listArticles,
  logActivity,
  updateArticle,
} from "./db";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "관리자만 접근할 수 있습니다." });
  return next({ ctx });
});

const ArticleInputSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.string().default(""),
  publishedDate: z.string().optional(),
  readTime: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
  sortOrder: z.number().default(0),
});

export const articlesRouter = router({
  // ── Public ──────────────────────────────────────────────────────────────────
  list: publicProcedure
    .input(z.object({ status: z.enum(["draft", "published", "all"]).optional() }).optional())
    .query(async ({ input }) => {
      const status = input?.status === "all" ? undefined : (input?.status ?? "published");
      return listArticles(status as "draft" | "published" | undefined);
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const article = await getArticleBySlug(input.slug);
      if (!article) throw new TRPCError({ code: "NOT_FOUND", message: "아티클을 찾을 수 없습니다." });
      return article;
    }),

  // ── Admin ───────────────────────────────────────────────────────────────────
  adminList: adminProcedure
    .input(z.object({ status: z.enum(["draft", "published", "all"]).optional() }).optional())
    .query(async ({ input }) => {
      const status = input?.status === "all" ? undefined : input?.status;
      return listArticles(status as "draft" | "published" | undefined);
    }),

  create: adminProcedure
    .input(ArticleInputSchema)
    .mutation(async ({ input, ctx }) => {
      const article = await createArticle(input);
      await logActivity({ action: "create", entityType: "article", entityId: String(article?.id), entityTitle: input.title, performedBy: ctx.user.id });
      return article;
    }),

  update: adminProcedure
    .input(z.object({ id: z.number(), data: ArticleInputSchema.partial() }))
    .mutation(async ({ input, ctx }) => {
      const existing = await getArticleById(input.id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND" });
      const article = await updateArticle(input.id, input.data);
      await logActivity({ action: "update", entityType: "article", entityId: String(input.id), entityTitle: existing.title, performedBy: ctx.user.id });
      return article;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const article = await deleteArticle(input.id);
      if (!article) throw new TRPCError({ code: "NOT_FOUND" });
      await logActivity({ action: "delete", entityType: "article", entityId: String(input.id), entityTitle: article.title, performedBy: ctx.user.id });
      return { success: true };
    }),

  publish: adminProcedure
    .input(z.object({ id: z.number(), status: z.enum(["draft", "published"]) }))
    .mutation(async ({ input, ctx }) => {
      const existing = await getArticleById(input.id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND" });
      await updateArticle(input.id, { status: input.status });
      await logActivity({ action: input.status === "published" ? "publish" : "unpublish", entityType: "article", entityId: String(input.id), entityTitle: existing.title, performedBy: ctx.user.id });
      return { success: true };
    }),
});
