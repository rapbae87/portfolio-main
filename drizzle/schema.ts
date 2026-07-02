import {
  boolean,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  bigint,
} from "drizzle-orm/mysql-core";

// ─────────────────────────────────────────────
// USERS (auth)
// ─────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
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

// ─────────────────────────────────────────────
// MEDIA ASSETS
// ─────────────────────────────────────────────
export const mediaAssets = mysqlTable("media_assets", {
  id: int("id").autoincrement().primaryKey(),
  storageKey: varchar("storageKey", { length: 512 }).notNull().unique(),
  url: text("url").notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  fileSize: bigint("fileSize", { mode: "number" }).notNull(),
  category: mysqlEnum("category", ["case-study", "brand-note", "profile", "site", "other"])
    .default("other")
    .notNull(),
  label: varchar("label", { length: 255 }),
  altText: text("altText"),
  uploadedBy: int("uploadedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MediaAsset = typeof mediaAssets.$inferSelect;
export type InsertMediaAsset = typeof mediaAssets.$inferInsert;

// ─────────────────────────────────────────────
// PROJECTS (Works / Case Studies)
// ─────────────────────────────────────────────
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull().default(""),
  client: varchar("client", { length: 255 }).notNull().default(""),
  role: text("role").notNull().default(""),
  /** JSON array of scope tags */
  scope: json("scope").$type<string[]>().default([]),
  year: varchar("year", { length: 20 }).notNull().default(""),
  description: text("description").notNull().default(""),
  tagline: varchar("tagline", { length: 255 }).notNull().default(""),
  coverImage: text("coverImage").default(""),
  /** Market context / why this project */
  context: text("context").default(""),
  challenge: text("challenge").default(""),
  approach: text("approach").default(""),
  /** JSON array of { phase, action, detail } */
  execution: json("execution").$type<{ phase: string; action: string; detail: string }[]>().default([]),
  /** JSON array of { metric, value, note? } */
  results: json("results").$type<{ metric: string; value: string; note?: string }[]>().default([]),
  reflection: text("reflection").default(""),
  /** JSON array of tag strings */
  tags: json("tags").$type<string[]>().default([]),
  /** JSON array of gallery image URLs */
  images: json("images").$type<string[]>().default([]),
  /** PDF attachment URL */
  pdfUrl: text("pdfUrl").default(""),
  /** PPT attachment URL */
  pptUrl: text("pptUrl").default(""),
  /** External link */
  externalUrl: text("externalUrl").default(""),
  featured: boolean("featured").default(false).notNull(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  /** Display order (lower = first) */
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

// ─────────────────────────────────────────────
// ARTICLES (Thinking / Brand Notes)
// ─────────────────────────────────────────────
export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull().default(""),
  /** ISO date string e.g. "2024.03" */
  publishedDate: varchar("publishedDate", { length: 20 }).default(""),
  readTime: varchar("readTime", { length: 20 }).default(""),
  excerpt: text("excerpt").default(""),
  content: text("content").default(""),
  coverImage: text("coverImage").default(""),
  /** JSON array of tag strings */
  tags: json("tags").$type<string[]>().default([]),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

// ─────────────────────────────────────────────
// PROFILE (About page)
// ─────────────────────────────────────────────
export const profile = mysqlTable("profile", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().default(""),
  nameEn: varchar("nameEn", { length: 100 }).notNull().default(""),
  title: varchar("title", { length: 255 }).notNull().default(""),
  bio: text("bio").default(""),
  profileImage: text("profileImage").default(""),
  /** JSON array of { company, role, period, description } */
  career: json("career")
    .$type<{ company: string; role: string; period: string; description: string }[]>()
    .default([]),
  /** JSON array of { name, level } */
  skills: json("skills").$type<{ name: string; level?: string }[]>().default([]),
  /** JSON array of { institution, degree, period } */
  education: json("education")
    .$type<{ institution: string; degree: string; period: string }[]>()
    .default([]),
  /** JSON array of { name, issuer, year } */
  certifications: json("certifications")
    .$type<{ name: string; issuer: string; year: string }[]>()
    .default([]),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Profile = typeof profile.$inferSelect;
export type InsertProfile = typeof profile.$inferInsert;

// ─────────────────────────────────────────────
// CONTACT INFO
// ─────────────────────────────────────────────
export const contactInfo = mysqlTable("contact_info", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).default(""),
  phone: varchar("phone", { length: 50 }).default(""),
  linkedin: varchar("linkedin", { length: 255 }).default(""),
  github: varchar("github", { length: 255 }).default(""),
  instagram: varchar("instagram", { length: 255 }).default(""),
  kakao: varchar("kakao", { length: 255 }).default(""),
  kakaoLabel: varchar("kakaoLabel", { length: 100 }).default(""),
  address: text("address").default(""),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactInfo = typeof contactInfo.$inferSelect;
export type InsertContactInfo = typeof contactInfo.$inferInsert;

// ─────────────────────────────────────────────
// SITE SETTINGS
// ─────────────────────────────────────────────
export const siteSettings = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  siteName: varchar("siteName", { length: 100 }).default("RAPBAE"),
  siteTagline: varchar("siteTagline", { length: 255 }).default(""),
  logoUrl: text("logoUrl").default(""),
  faviconUrl: text("faviconUrl").default(""),
  primaryColor: varchar("primaryColor", { length: 20 }).default("#111111"),
  secondaryColor: varchar("secondaryColor", { length: 20 }).default("#f7f5f2"),
  fontDisplay: varchar("fontDisplay", { length: 100 }).default("Noto Serif KR"),
  fontBody: varchar("fontBody", { length: 100 }).default("Noto Sans KR"),
  footerText: text("footerText").default(""),
  /** JSON array of { label, href, visible } */
  navItems: json("navItems")
    .$type<{ label: string; href: string; visible: boolean }[]>()
    .default([]),
  /** JSON object for hero section */
  heroTitle: text("heroTitle").default(""),
  heroSubtitle: text("heroSubtitle").default(""),
  heroCtaPrimary: varchar("heroCtaPrimary", { length: 100 }).default(""),
  heroCtaSecondary: varchar("heroCtaSecondary", { length: 100 }).default(""),
  heroBgImage: text("heroBgImage").default(""),
  /** JSON array of { label, value, note } for key metrics */
  keyMetrics: json("keyMetrics")
    .$type<{ label: string; value: string; note?: string }[]>()
    .default([]),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type InsertSiteSettings = typeof siteSettings.$inferInsert;

// ─────────────────────────────────────────────
// SEO SETTINGS (per-page)
// ─────────────────────────────────────────────
export const seoSettings = mysqlTable("seo_settings", {
  id: int("id").autoincrement().primaryKey(),
  /** page identifier: home | about | works | thinking | contact */
  page: varchar("page", { length: 50 }).notNull().unique(),
  title: varchar("title", { length: 255 }).default(""),
  description: text("description").default(""),
  slug: varchar("slug", { length: 255 }).default(""),
  canonical: text("canonical").default(""),
  ogImage: text("ogImage").default(""),
  robots: varchar("robots", { length: 100 }).default("index, follow"),
  includeInSitemap: boolean("includeInSitemap").default(true).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SeoSettings = typeof seoSettings.$inferSelect;
export type InsertSeoSettings = typeof seoSettings.$inferInsert;

// ─────────────────────────────────────────────
// ACTIVITY LOG (for admin dashboard)
// ─────────────────────────────────────────────
export const activityLog = mysqlTable("activity_log", {
  id: int("id").autoincrement().primaryKey(),
  /** Type of action: create | update | delete | publish | unpublish */
  action: varchar("action", { length: 50 }).notNull(),
  /** Entity type: project | article | media | profile | settings | seo | contact */
  entityType: varchar("entityType", { length: 50 }).notNull(),
  entityId: varchar("entityId", { length: 100 }),
  entityTitle: varchar("entityTitle", { length: 255 }),
  performedBy: int("performedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ActivityLog = typeof activityLog.$inferSelect;
export type InsertActivityLog = typeof activityLog.$inferInsert;
