import { and, asc, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  activityLog,
  articles,
  contactInfo,
  InsertActivityLog,
  InsertArticle,
  InsertContactInfo,
  InsertMediaAsset,
  InsertProfile,
  InsertProject,
  InsertSeoSettings,
  InsertSiteSettings,
  InsertUser,
  mediaAssets,
  profile,
  projects,
  seoSettings,
  siteSettings,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  // Try process.env first, then ENV helper (which also reads process.env but may be cached)
  const dbUrl = process.env.DATABASE_URL || ENV.databaseUrl;
  if (!_db && dbUrl) {
    try {
      _db = drizzle(dbUrl);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  type TextField = (typeof textFields)[number];
  const assignNullable = (field: TextField) => {
    const value = user[field];
    if (value === undefined) return;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  };
  textFields.forEach(assignNullable);
  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
  else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Media Assets ─────────────────────────────────────────────────────────────

export async function createMediaAsset(asset: InsertMediaAsset) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(mediaAssets).values(asset);
  const result = await db.select().from(mediaAssets).where(eq(mediaAssets.storageKey, asset.storageKey)).limit(1);
  return result[0];
}

type AssetCategory = "case-study" | "brand-note" | "profile" | "site" | "other";

export async function listMediaAssets(category?: AssetCategory) {
  const db = await getDb();
  if (!db) return [];
  if (category) return db.select().from(mediaAssets).where(eq(mediaAssets.category, category)).orderBy(desc(mediaAssets.createdAt));
  return db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt));
}

export async function deleteMediaAsset(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(mediaAssets).where(eq(mediaAssets.id, id)).limit(1);
  if (result.length === 0) return null;
  await db.delete(mediaAssets).where(eq(mediaAssets.id, id));
  return result[0];
}

export async function updateMediaAssetLabel(id: number, label: string, altText?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(mediaAssets).set({ label, ...(altText !== undefined ? { altText } : {}) }).where(eq(mediaAssets.id, id));
  const result = await db.select().from(mediaAssets).where(eq(mediaAssets.id, id)).limit(1);
  return result[0];
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function listProjects(status?: "draft" | "published") {
  const db = await getDb();
  if (!db) return [];  // DB 미연결 시 빈 배열 반환 (공개 페이지 graceful fallback)
  const query = db.select().from(projects);
  if (status) return query.where(eq(projects.status, status)).orderBy(asc(projects.sortOrder), desc(projects.createdAt));
  return query.orderBy(asc(projects.sortOrder), desc(projects.createdAt));
}

export async function getProjectBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return result[0] ?? null;
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result[0] ?? null;
}

export async function createProject(data: InsertProject) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [res] = await db.insert(projects).values(data);
  return getProjectById((res as { insertId: number }).insertId);
}

export async function updateProject(id: number, data: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(projects).set(data).where(eq(projects.id, id));
  return getProjectById(id);
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const p = await getProjectById(id);
  if (!p) return null;
  await db.delete(projects).where(eq(projects.id, id));
  return p;
}

export async function reorderProjects(orderedIds: number[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await Promise.all(orderedIds.map((id, idx) => db.update(projects).set({ sortOrder: idx }).where(eq(projects.id, id))));
}

// ─── Articles ─────────────────────────────────────────────────────────────────

export async function listArticles(status?: "draft" | "published") {
  const db = await getDb();
  if (!db) return [];  // DB 미연결 시 빈 배열 반환
  const query = db.select().from(articles);
  if (status) return query.where(eq(articles.status, status)).orderBy(asc(articles.sortOrder), desc(articles.createdAt));
  return query.orderBy(asc(articles.sortOrder), desc(articles.createdAt));
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  return result[0] ?? null;
}

export async function getArticleById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return result[0] ?? null;
}

export async function createArticle(data: InsertArticle) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [res] = await db.insert(articles).values(data);
  return getArticleById((res as { insertId: number }).insertId);
}

export async function updateArticle(id: number, data: Partial<InsertArticle>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(articles).set(data).where(eq(articles.id, id));
  return getArticleById(id);
}

export async function deleteArticle(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const a = await getArticleById(id);
  if (!a) return null;
  await db.delete(articles).where(eq(articles.id, id));
  return a;
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export async function getProfile() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(profile).limit(1);
  return result[0] ?? null;
}

export async function upsertProfile(data: Partial<InsertProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getProfile();
  if (existing) {
    await db.update(profile).set(data).where(eq(profile.id, existing.id));
    return getProfile();
  }
  await db.insert(profile).values(data as InsertProfile);
  return getProfile();
}

// ─── Contact Info ─────────────────────────────────────────────────────────────

export async function getContactInfo() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(contactInfo).limit(1);
  return result[0] ?? null;
}

export async function upsertContactInfo(data: Partial<InsertContactInfo>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getContactInfo();
  if (existing) {
    await db.update(contactInfo).set(data).where(eq(contactInfo.id, existing.id));
    return getContactInfo();
  }
  await db.insert(contactInfo).values(data as InsertContactInfo);
  return getContactInfo();
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function getSiteSettings() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(siteSettings).limit(1);
  return result[0] ?? null;
}

export async function upsertSiteSettings(data: Partial<InsertSiteSettings>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getSiteSettings();
  if (existing) {
    await db.update(siteSettings).set(data).where(eq(siteSettings.id, existing.id));
    return getSiteSettings();
  }
  await db.insert(siteSettings).values(data as InsertSiteSettings);
  return getSiteSettings();
}

// ─── SEO Settings ─────────────────────────────────────────────────────────────

export async function listSeoSettings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(seoSettings).orderBy(asc(seoSettings.page));
}

export async function getSeoByPage(page: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(seoSettings).where(eq(seoSettings.page, page)).limit(1);
  return result[0] ?? null;
}

export async function upsertSeoSettings(page: string, data: Partial<InsertSeoSettings>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getSeoByPage(page);
  if (existing) {
    await db.update(seoSettings).set(data).where(eq(seoSettings.page, page));
  } else {
    await db.insert(seoSettings).values({ ...data, page } as InsertSeoSettings);
  }
  return getSeoByPage(page);
}

// ─── Activity Log ─────────────────────────────────────────────────────────────

export async function logActivity(data: InsertActivityLog) {
  const db = await getDb();
  if (!db) return;
  await db.insert(activityLog).values(data).catch(() => {});
}

export async function getRecentActivity(limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(activityLog).orderBy(desc(activityLog.createdAt)).limit(limit);
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [projectStats] = await db.select({
    total: sql<number>`COUNT(*)`,
    published: sql<number>`SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END)`,
    draft: sql<number>`SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END)`,
    featured: sql<number>`SUM(CASE WHEN featured = 1 THEN 1 ELSE 0 END)`,
  }).from(projects);
  const [articleStats] = await db.select({
    total: sql<number>`COUNT(*)`,
    published: sql<number>`SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END)`,
    draft: sql<number>`SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END)`,
  }).from(articles);
  const [mediaStats] = await db.select({ total: sql<number>`COUNT(*)` }).from(mediaAssets);
  const recentProjects = await db.select().from(projects).orderBy(desc(projects.updatedAt)).limit(3);
  const recentArticles = await db.select().from(articles).orderBy(desc(articles.updatedAt)).limit(3);
  const recentMedia = await db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt)).limit(3);
  return { projectStats, articleStats, mediaStats, recentProjects, recentArticles, recentMedia };
}
