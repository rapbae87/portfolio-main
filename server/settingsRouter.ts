/**
 * Settings Router — Rapbae CMS
 * Public: read profile, contact, site settings, seo
 * Admin: update all settings
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  getDashboardStats,
  getContactInfo,
  getProfile,
  getRecentActivity,
  getSeoByPage,
  getSiteSettings,
  listSeoSettings,
  logActivity,
  upsertContactInfo,
  upsertProfile,
  upsertSeoSettings,
  upsertSiteSettings,
} from "./db";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "관리자만 접근할 수 있습니다." });
  return next({ ctx });
});

const CareerItemSchema = z.object({
  company: z.string(),
  role: z.string(),
  period: z.string(),
  description: z.string(),
});

const SkillItemSchema = z.object({
  name: z.string(),
  level: z.string().optional(),
});

const EducationItemSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  period: z.string(),
});

const CertificationItemSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  year: z.string(),
});

const NavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  visible: z.boolean(),
});

const KeyMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  note: z.string().optional(),
});

export const settingsRouter = router({
  // ── Dashboard ────────────────────────────────────────────────────────────────
  dashboard: adminProcedure.query(async () => {
    return getDashboardStats();
  }),

  recentActivity: adminProcedure
    .input(z.object({ limit: z.number().optional() }).optional())
    .query(async ({ input }) => {
      return getRecentActivity(input?.limit ?? 20);
    }),

  // ── Profile ──────────────────────────────────────────────────────────────────
  getProfile: publicProcedure.query(async () => {
    return getProfile();
  }),

  updateProfile: adminProcedure
    .input(z.object({
      name: z.string().optional(),
      nameEn: z.string().optional(),
      title: z.string().optional(),
      bio: z.string().optional(),
      profileImage: z.string().optional(),
      career: z.array(CareerItemSchema).optional(),
      skills: z.array(SkillItemSchema).optional(),
      education: z.array(EducationItemSchema).optional(),
      certifications: z.array(CertificationItemSchema).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const result = await upsertProfile(input);
      await logActivity({ action: "update", entityType: "profile", entityTitle: "프로필", performedBy: ctx.user.id });
      return result;
    }),

  // ── Contact ──────────────────────────────────────────────────────────────────
  getContact: publicProcedure.query(async () => {
    return getContactInfo();
  }),

  updateContact: adminProcedure
    .input(z.object({
      email: z.string().optional(),
      phone: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
      instagram: z.string().optional(),
      kakao: z.string().optional(),
      kakaoLabel: z.string().optional(),
      address: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const result = await upsertContactInfo(input);
      await logActivity({ action: "update", entityType: "contact", entityTitle: "연락처", performedBy: ctx.user.id });
      return result;
    }),

  // ── Site Settings ─────────────────────────────────────────────────────────────
  getSiteSettings: publicProcedure.query(async () => {
    return getSiteSettings();
  }),

  updateSiteSettings: adminProcedure
    .input(z.object({
      siteName: z.string().optional(),
      siteTagline: z.string().optional(),
      logoUrl: z.string().optional(),
      faviconUrl: z.string().optional(),
      primaryColor: z.string().optional(),
      secondaryColor: z.string().optional(),
      fontDisplay: z.string().optional(),
      fontBody: z.string().optional(),
      footerText: z.string().optional(),
      navItems: z.array(NavItemSchema).optional(),
      heroTitle: z.string().optional(),
      heroSubtitle: z.string().optional(),
      heroCtaPrimary: z.string().optional(),
      heroCtaSecondary: z.string().optional(),
      heroBgImage: z.string().optional(),
      keyMetrics: z.array(KeyMetricSchema).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const result = await upsertSiteSettings(input);
      await logActivity({ action: "update", entityType: "settings", entityTitle: "사이트 설정", performedBy: ctx.user.id });
      return result;
    }),

  // ── SEO ───────────────────────────────────────────────────────────────────────
  listSeo: adminProcedure.query(async () => {
    return listSeoSettings();
  }),

  getSeo: publicProcedure
    .input(z.object({ page: z.string() }))
    .query(async ({ input }) => {
      return getSeoByPage(input.page);
    }),

  updateSeo: adminProcedure
    .input(z.object({
      page: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      slug: z.string().optional(),
      canonical: z.string().optional(),
      ogImage: z.string().optional(),
      robots: z.string().optional(),
      includeInSitemap: z.boolean().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { page, ...data } = input;
      const result = await upsertSeoSettings(page, data);
      await logActivity({ action: "update", entityType: "seo", entityTitle: `SEO: ${page}`, performedBy: ctx.user.id });
      return result;
    }),
});
