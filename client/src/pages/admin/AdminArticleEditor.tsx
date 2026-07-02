/**
 * Admin Article Editor — Rapbae CMS
 * Create or edit an article with full content editing.
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { toast } from "sonner";

interface FormState {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  readTime: string;
  publishedDate: string;
  tags: string[];
  status: "draft" | "published";
}

const EMPTY_FORM: FormState = {
  slug: "", title: "", category: "", excerpt: "", content: "",
  coverImage: "", readTime: "5분", publishedDate: new Date().toISOString().split("T")[0],
  tags: [], status: "draft",
};

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: "0.78rem", color: "#777", letterSpacing: "0.05em", marginBottom: 6, textTransform: "uppercase" }}>{label}</label>
      {children}
      {hint && <p style={{ fontSize: "0.72rem", color: "#bbb", marginTop: 4 }}>{hint}</p>}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px", border: "1px solid #e5e5e5",
  fontSize: "0.88rem", color: "#111", outline: "none", backgroundColor: "#fff", boxSizing: "border-box",
};

export default function AdminArticleEditor() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const isNew = params.id === "new";
  const articleId = isNew ? null : parseInt(params.id);

  const { data: articles, isLoading } = trpc.articles.adminList.useQuery(
    { status: "all" },
    { enabled: !isNew }
  );
  const article = isNew ? null : articles?.find(a => a.id === articleId);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (article) {
      setForm({
        slug: article.slug ?? "",
        title: article.title ?? "",
        category: article.category ?? "",
        excerpt: article.excerpt ?? "",
        content: article.content ?? "",
        coverImage: article.coverImage ?? "",
        readTime: article.readTime ?? "5분",
        publishedDate: article.publishedDate ?? new Date().toISOString().split("T")[0],
        tags: (article.tags as string[]) ?? [],
        status: article.status ?? "draft",
      });
    }
  }, [article]);

  const utils = trpc.useUtils();

  const createMutation = trpc.articles.create.useMutation({
    onSuccess: () => { toast.success("아티클이 생성됐습니다."); utils.articles.adminList.invalidate(); navigate("/admin/thinking"); },
    onError: (e) => toast.error(e.message),
  });

  const updateMutation = trpc.articles.update.useMutation({
    onSuccess: () => { toast.success("저장됐습니다."); utils.articles.adminList.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const set = (field: keyof FormState, value: unknown) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) {
      createMutation.mutate(form);
    } else if (articleId) {
      updateMutation.mutate({ id: articleId, data: form });
    }
  };

  if (!isNew && isLoading) return <AdminLayout title="아티클 편집"><p style={{ color: "#bbb" }}>로딩 중...</p></AdminLayout>;
  if (!isNew && !article && !isLoading) return <AdminLayout title="아티클 편집"><p style={{ color: "#bbb" }}>아티클을 찾을 수 없습니다.</p></AdminLayout>;

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminLayout title={isNew ? "새 아티클" : "아티클 편집"}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 800 }}>
        {/* Status bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, padding: "12px 16px", backgroundColor: "#fff", border: "1px solid #ebebeb" }}>
          <select
            value={form.status}
            onChange={e => set("status", e.target.value)}
            style={{ ...inputStyle, width: "auto", padding: "6px 10px", fontSize: "0.82rem" }}
          >
            <option value="draft">초안</option>
            <option value="published">게시됨</option>
          </select>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <button type="button" onClick={() => navigate("/admin/thinking")} style={{ padding: "8px 16px", border: "1px solid #ddd", background: "none", fontSize: "0.82rem", color: "#777", cursor: "pointer" }}>취소</button>
            <button type="submit" disabled={isSaving} style={{ padding: "8px 20px", backgroundColor: "#111", color: "#fff", border: "none", fontSize: "0.82rem", cursor: "pointer", opacity: isSaving ? 0.6 : 1 }}>
              {isSaving ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>

        {/* Basic Info */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>기본 정보</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="제목 *">
              <input required value={form.title} onChange={e => set("title", e.target.value)} style={inputStyle} placeholder="아티클 제목" />
            </Field>
            <Field label="슬러그 *" hint="URL에 사용됩니다">
              <input required value={form.slug} onChange={e => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} style={inputStyle} placeholder="article-slug" />
            </Field>
            <Field label="카테고리">
              <input value={form.category} onChange={e => set("category", e.target.value)} style={inputStyle} placeholder="브랜드 전략" />
            </Field>
            <Field label="읽기 시간">
              <input value={form.readTime} onChange={e => set("readTime", e.target.value)} style={inputStyle} placeholder="5분" />
            </Field>
            <Field label="게시 날짜">
              <input type="date" value={form.publishedDate} onChange={e => set("publishedDate", e.target.value)} style={inputStyle} />
            </Field>
          </div>
          <Field label="커버 이미지 URL">
            <input value={form.coverImage} onChange={e => set("coverImage", e.target.value)} style={inputStyle} placeholder="/manus-storage/..." />
          </Field>
          <Field label="요약 (Excerpt)">
            <textarea value={form.excerpt} onChange={e => set("excerpt", e.target.value)} style={{ ...inputStyle, minHeight: 80, resize: "vertical", fontFamily: "inherit" }} placeholder="아티클 요약 (목록에 표시됩니다)" />
          </Field>
          <Field label="태그" hint="입력 후 Enter로 추가">
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); if (tagInput.trim()) { set("tags", [...form.tags, tagInput.trim()]); setTagInput(""); } } }}
                style={{ ...inputStyle, flex: 1 }}
                placeholder="브랜드 전략"
              />
              <button type="button" onClick={() => { if (tagInput.trim()) { set("tags", [...form.tags, tagInput.trim()]); setTagInput(""); } }} style={{ padding: "9px 14px", backgroundColor: "#f5f5f5", border: "1px solid #e5e5e5", cursor: "pointer" }}>+</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {form.tags.map((t, i) => (
                <span key={i} style={{ padding: "3px 10px", backgroundColor: "#f5f5f5", fontSize: "0.78rem", color: "#555", display: "flex", alignItems: "center", gap: 4 }}>
                  {t}
                  <button type="button" onClick={() => set("tags", form.tags.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>×</button>
                </span>
              ))}
            </div>
          </Field>
        </section>

        {/* Content */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>본문 (Markdown)</h3>
          <textarea
            value={form.content}
            onChange={e => set("content", e.target.value)}
            style={{ ...inputStyle, minHeight: 400, resize: "vertical", fontFamily: "monospace", fontSize: "0.85rem", lineHeight: 1.6 }}
            placeholder="## 제목&#10;&#10;본문 내용을 Markdown으로 작성하세요.&#10;&#10;**굵게**, *기울임*, [링크](https://...) 등을 사용할 수 있습니다."
          />
          <p style={{ fontSize: "0.72rem", color: "#bbb", marginTop: 6 }}>Markdown 형식으로 작성하세요. 미리보기는 프론트엔드에서 확인할 수 있습니다.</p>
        </section>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button type="button" onClick={() => navigate("/admin/thinking")} style={{ padding: "10px 20px", border: "1px solid #ddd", background: "none", fontSize: "0.85rem", color: "#777", cursor: "pointer" }}>취소</button>
          <button type="submit" disabled={isSaving} style={{ padding: "10px 24px", backgroundColor: "#111", color: "#fff", border: "none", fontSize: "0.85rem", cursor: "pointer", opacity: isSaving ? 0.6 : 1 }}>
            {isSaving ? "저장 중..." : isNew ? "아티클 생성" : "변경사항 저장"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
