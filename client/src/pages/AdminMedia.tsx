/*
 * AdminMedia Page — Rapbae Brand Builder
 * 관리자 전용 미디어 에셋 관리 페이지
 * 케이스 스터디 이미지, 브랜드 노트 커버, 프로필 사진 등을 업로드·관리
 */

import { useCallback, useRef, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type AssetCategory = "case-study" | "brand-note" | "profile" | "other";

const CATEGORY_LABELS: Record<AssetCategory, string> = {
  "case-study": "케이스 스터디",
  "brand-note": "브랜드 노트",
  "profile": "프로필",
  "other": "기타",
};

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function AdminMedia() {
  const { user, loading } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | undefined>(undefined);
  const [uploadCategory, setUploadCategory] = useState<AssetCategory>("other");
  const [uploadLabel, setUploadLabel] = useState("");
  const [uploadAltText, setUploadAltText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: assets, refetch } = trpc.media.list.useQuery(
    { category: selectedCategory },
    { enabled: !!user && user.role === "admin" },
  );

  const uploadMutation = trpc.media.upload.useMutation({
    onSuccess: () => {
      toast.success("파일이 업로드되었습니다.");
      setUploadProgress(null);
      setUploadLabel("");
      setUploadAltText("");
      refetch();
    },
    onError: (err) => {
      toast.error(err.message || "업로드에 실패했습니다.");
      setUploadProgress(null);
    },
  });

  const deleteMutation = trpc.media.delete.useMutation({
    onSuccess: () => {
      toast.success("파일이 삭제되었습니다.");
      refetch();
    },
    onError: (err) => {
      toast.error(err.message || "삭제에 실패했습니다.");
    },
  });

  const handleFile = useCallback(
    async (file: File) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error("허용되지 않는 파일 형식입니다. (JPG, PNG, WEBP, GIF, PDF만 가능)");
        return;
      }
      if (file.size > MAX_SIZE) {
        toast.error("파일 크기가 10MB를 초과합니다.");
        return;
      }

      setUploadProgress("파일 읽는 중...");

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = (e.target?.result as string).split(",")[1];
        if (!base64) {
          toast.error("파일을 읽을 수 없습니다.");
          setUploadProgress(null);
          return;
        }
        setUploadProgress("업로드 중...");
        uploadMutation.mutate({
          filename: file.name,
          mimeType: file.type,
          data: base64,
          fileSize: file.size,
          category: uploadCategory,
          label: uploadLabel || undefined,
          altText: uploadAltText || undefined,
        });
      };
      reader.readAsDataURL(file);
    },
    [uploadCategory, uploadLabel, uploadAltText, uploadMutation],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-mono-label" style={{ color: "#aaa" }}>로딩 중...</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="font-mono-label" style={{ color: "#aaa" }}>관리자만 접근할 수 있습니다.</p>
        <Link href="/">
          <span className="font-mono-label link-underline" style={{ color: "#111" }}>← 홈으로</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <section className="pt-36 pb-10 md:pt-44 md:pb-14">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono-label mb-2" style={{ color: "#aaa" }}>관리자</p>
              <h1
                className="font-display leading-none"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  color: "#111",
                  letterSpacing: "-0.04em",
                  fontWeight: 400,
                }}
              >
                미디어 관리
              </h1>
            </div>
            <Link href="/">
              <span className="font-mono-label link-underline" style={{ color: "#aaa" }}>← 사이트로</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        <div style={{ borderTop: "1px solid #ebebeb" }} />
      </div>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">

            {/* Upload Panel */}
            <div className="md:col-span-4">
              <p className="font-mono-label mb-6" style={{ color: "#aaa" }}>파일 업로드</p>

              {/* Drop Zone */}
              <div
                className="mb-6 flex flex-col items-center justify-center gap-3 cursor-pointer"
                style={{
                  border: `1.5px dashed ${isDragging ? "#111" : "#ddd"}`,
                  padding: "2.5rem 1.5rem",
                  transition: "border-color 200ms ease, background-color 200ms ease",
                  backgroundColor: isDragging ? "#f7f5f2" : "transparent",
                }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ALLOWED_TYPES.join(",")}
                  className="hidden"
                  onChange={handleFileInput}
                />
                <div
                  style={{
                    width: 40,
                    height: 40,
                    border: "1.5px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "1.2rem", color: "#bbb" }}>↑</span>
                </div>
                <p className="font-mono-label text-center" style={{ color: "#aaa" }}>
                  {uploadProgress ?? "클릭하거나 파일을 드래그하세요"}
                </p>
                <p style={{ color: "#ccc", fontSize: "0.75rem" }}>
                  JPG, PNG, WEBP, GIF, PDF — 최대 10MB
                </p>
              </div>

              {/* Upload Options */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-mono-label block mb-2" style={{ color: "#aaa" }}>
                    카테고리
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as AssetCategory)}
                    className="w-full"
                    style={{
                      border: "1px solid #ebebeb",
                      padding: "0.6rem 0.75rem",
                      fontSize: "0.85rem",
                      color: "#111",
                      backgroundColor: "#fff",
                      outline: "none",
                    }}
                  >
                    {(Object.keys(CATEGORY_LABELS) as AssetCategory[]).map((cat) => (
                      <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-mono-label block mb-2" style={{ color: "#aaa" }}>
                    레이블 (선택)
                  </label>
                  <input
                    type="text"
                    value={uploadLabel}
                    onChange={(e) => setUploadLabel(e.target.value)}
                    placeholder="예: FEEJU 케이스 스터디 커버"
                    style={{
                      width: "100%",
                      border: "1px solid #ebebeb",
                      padding: "0.6rem 0.75rem",
                      fontSize: "0.85rem",
                      color: "#111",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label className="font-mono-label block mb-2" style={{ color: "#aaa" }}>
                    대체 텍스트 (선택)
                  </label>
                  <input
                    type="text"
                    value={uploadAltText}
                    onChange={(e) => setUploadAltText(e.target.value)}
                    placeholder="이미지 설명 (접근성)"
                    style={{
                      width: "100%",
                      border: "1px solid #ebebeb",
                      padding: "0.6rem 0.75rem",
                      fontSize: "0.85rem",
                      color: "#111",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Asset Library */}
            <div className="md:col-span-8">
              <div className="flex items-center justify-between mb-6">
                <p className="font-mono-label" style={{ color: "#aaa" }}>
                  에셋 라이브러리 {assets ? `(${assets.length}개)` : ""}
                </p>
                {/* Category Filter */}
                <div className="flex items-center gap-3">
                  <button
                    className="font-mono-label"
                    style={{
                      color: selectedCategory === undefined ? "#111" : "#bbb",
                      fontSize: "0.7rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onClick={() => setSelectedCategory(undefined)}
                  >
                    전체
                  </button>
                  {(Object.keys(CATEGORY_LABELS) as AssetCategory[]).map((cat) => (
                    <button
                      key={cat}
                      className="font-mono-label"
                      style={{
                        color: selectedCategory === cat ? "#111" : "#bbb",
                        fontSize: "0.7rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>
              </div>

              {!assets || assets.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center gap-3"
                  style={{
                    border: "1px solid #ebebeb",
                    padding: "4rem 2rem",
                    color: "#ccc",
                  }}
                >
                  <p className="font-mono-label">업로드된 파일이 없습니다</p>
                  <p style={{ fontSize: "0.8rem" }}>왼쪽 패널에서 파일을 업로드하세요</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {assets.map((asset) => (
                    <AssetCard
                      key={asset.id}
                      asset={asset}
                      onDelete={() => {
                        if (confirm(`"${asset.filename}" 파일을 삭제하시겠습니까?`)) {
                          deleteMutation.mutate({ id: asset.id });
                        }
                      }}
                      formatBytes={formatBytes}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function AssetCard({
  asset,
  onDelete,
  formatBytes,
}: {
  asset: {
    id: number;
    url: string;
    filename: string;
    mimeType: string;
    fileSize: number;
    category: string;
    label: string | null;
    createdAt: Date;
  };
  onDelete: () => void;
  formatBytes: (bytes: number) => string;
}) {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(asset.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isImage = asset.mimeType.startsWith("image/");

  return (
    <div
      className="group relative flex flex-col"
      style={{ border: "1px solid #ebebeb" }}
    >
      {/* Preview */}
      <div
        style={{
          aspectRatio: "4/3",
          backgroundColor: "#f7f5f2",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {isImage ? (
          <img
            src={asset.url}
            alt={asset.label ?? asset.filename}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span style={{ fontSize: "2rem", color: "#ccc" }}>PDF</span>
          </div>
        )}

        {/* Overlay Actions */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            transition: "opacity 200ms ease",
          }}
        >
          <button
            onClick={copyUrl}
            className="font-mono-label"
            style={{
              backgroundColor: "#fff",
              color: "#111",
              border: "none",
              padding: "0.4rem 0.75rem",
              cursor: "pointer",
              fontSize: "0.65rem",
            }}
          >
            {copied ? "복사됨 ✓" : "URL 복사"}
          </button>
          <button
            onClick={onDelete}
            className="font-mono-label"
            style={{
              backgroundColor: "#111",
              color: "#fff",
              border: "none",
              padding: "0.4rem 0.75rem",
              cursor: "pointer",
              fontSize: "0.65rem",
            }}
          >
            삭제
          </button>
        </div>
      </div>

      {/* Meta */}
      <div style={{ padding: "0.75rem" }}>
        <p
          style={{
            fontSize: "0.78rem",
            color: "#111",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {asset.label ?? asset.filename}
        </p>
        <p className="font-mono-label mt-0.5" style={{ color: "#bbb" }}>
          {formatBytes(asset.fileSize)}
        </p>
      </div>
    </div>
  );
}
