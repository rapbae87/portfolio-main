/**
 * Media Router — Rapbae Brand Builder
 * Handles file upload, listing, labeling, and deletion of media assets.
 * All mutations are protected (admin only).
 */

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createMediaAsset, deleteMediaAsset, listMediaAssets, updateMediaAssetLabel } from "./db";
import { storagePut } from "./storage";
import { protectedProcedure, router } from "./_core/trpc";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

/** Admin guard — only the site owner can manage media */
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "관리자만 접근할 수 있습니다." });
  }
  return next({ ctx });
});

export const mediaRouter = router({
  /**
   * Upload a file to S3 and save metadata to DB.
   * Accepts base64-encoded file data from the frontend.
   */
  upload: adminProcedure
    .input(
      z.object({
        filename: z.string().min(1),
        mimeType: z.string().min(1),
        /** Base64-encoded file content */
        data: z.string().min(1),
        fileSize: z.number().int().positive(),
        category: z.enum(["case-study", "brand-note", "profile", "other"]).default("other"),
        label: z.string().optional(),
        altText: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Validate MIME type
      if (!ALLOWED_MIME_TYPES.includes(input.mimeType)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `허용되지 않는 파일 형식입니다. 허용: ${ALLOWED_MIME_TYPES.join(", ")}`,
        });
      }

      // Validate file size
      if (input.fileSize > MAX_FILE_SIZE) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `파일 크기가 너무 큽니다. 최대 10MB까지 업로드 가능합니다.`,
        });
      }

      // Decode base64
      const buffer = Buffer.from(input.data, "base64");

      // Build storage key: category/filename
      const safeFilename = input.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
      const storageKey = `rapbae/${input.category}/${safeFilename}`;

      // Upload to S3
      const { key, url } = await storagePut(storageKey, buffer, input.mimeType);

      // Save to DB
      const asset = await createMediaAsset({
        storageKey: key,
        url,
        filename: input.filename,
        mimeType: input.mimeType,
        fileSize: input.fileSize,
        category: input.category,
        label: input.label ?? null,
        altText: input.altText ?? null,
        uploadedBy: ctx.user.id,
      });

      return asset;
    }),

  /**
   * List all media assets, optionally filtered by category.
   */
  list: adminProcedure
    .input(
      z.object({
        category: z
          .enum(["case-study", "brand-note", "profile", "other"])
          .optional(),
      }),
    )
    .query(async ({ input }) => {
      return listMediaAssets(input.category);
    }),

  /**
   * Delete a media asset record from the DB.
   * (The S3 object is effectively orphaned but unreachable.)
   */
  delete: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      const deleted = await deleteMediaAsset(input.id);
      if (!deleted) {
        throw new TRPCError({ code: "NOT_FOUND", message: "파일을 찾을 수 없습니다." });
      }
      return { success: true, id: input.id };
    }),

  /**
   * Update label and alt text of a media asset.
   */
  updateLabel: adminProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        label: z.string().min(1),
        altText: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return updateMediaAssetLabel(input.id, input.label, input.altText);
    }),
});
