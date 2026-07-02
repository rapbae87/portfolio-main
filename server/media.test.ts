/**
 * Media Router Tests — Rapbae Brand Builder
 * Tests upload validation, list, and delete procedures.
 */

import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@rapbae.com",
    name: "Admin",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

describe("media.upload", () => {
  it("rejects non-admin users with FORBIDDEN", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.media.upload({
        filename: "test.jpg",
        mimeType: "image/jpeg",
        data: "base64data",
        fileSize: 1024,
        category: "other",
      }),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects disallowed MIME types for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    await expect(
      caller.media.upload({
        filename: "test.exe",
        mimeType: "application/x-msdownload",
        data: "base64data",
        fileSize: 1024,
        category: "other",
      }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects files exceeding 10MB for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    await expect(
      caller.media.upload({
        filename: "large.jpg",
        mimeType: "image/jpeg",
        data: "base64data",
        fileSize: 11 * 1024 * 1024, // 11MB
        category: "case-study",
      }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});

describe("media.list", () => {
  it("rejects non-admin users with FORBIDDEN", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.media.list({})).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("media.delete", () => {
  it("rejects non-admin users with FORBIDDEN", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.media.delete({ id: 1 })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
