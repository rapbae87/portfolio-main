/**
 * Admin SEO — Rapbae CMS
 * Edit SEO meta tags for each page.
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

const PAGES = [
  { key: "home", label: "홈 (/)"},
  { key: "works", label: "Works (/works)"},
  { key: "thinking", label: "Thinking (/thinking)"},
  { key: "about", label: "About (/about)"},
  { key: "contact", label: "Contact (/contact)"},
];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px", border: "1px solid #e5e5e5",
  fontSize: "0.88rem", color: "#111", outline: "none", backgroundColor: "#fff", boxSizing: "border-box",
};

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
      {children}
      {hint && <p style={{ fontSize: "0.72rem", color: "#bbb", marginTop: 4 }}>{hint}</p>}
    </div>
  );
}

interface SeoForm {
  title: string;
  description: string;
  ogImage: string;
  robots: string;
  canonical: string;
}

function PageSeoEditor({ pageKey, pageLabel }: { pageKey: string; pageLabel: string }) {
  const utils = trpc.useUtils();
  const { data: seo, isLoading } = trpc.settings.getSeo.useQuery({ page: pageKey });
  const [form, setForm] = useState<SeoForm>({ title: "", description: "", ogImage: "", robots: "index, follow", canonical: "" });
  const [initialized, setInitialized] = useState(false);

  if (!initialized && seo) {
    setForm({
      title: seo.title ?? "",
      description: seo.description ?? "",
      ogImage: seo.ogImage ?? "",
      robots: seo.robots ?? "index, follow",
      canonical: seo.canonical ?? "",
    });
    setInitialized(true);
  }

  const updateMutation = trpc.settings.updateSeo.useMutation({
    onSuccess: () => { toast.success(`${pageLabel} SEO 저장됐습니다.`); utils.settings.getSeo.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const set = (field: keyof SeoForm, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ page: pageKey, ...form });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ fontSize: "0.85rem", color: "#333", fontWeight: 500 }}>{pageLabel}</h3>
          <button type="submit" disabled={updateMutation.isPending || isLoading} style={{ padding: "6px 16px", backgroundColor: "#111", color: "#fff", border: "none", fontSize: "0.78rem", cursor: "pointer", opacity: updateMutation.isPending ? 0.6 : 1 }}>
            {updateMutation.isPending ? "저장 중..." : "저장"}
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="페이지 제목" hint="60자 이내 권장">
            <input value={form.title} onChange={e => set("title", e.target.value)} style={inputStyle} placeholder="Rapbae — Brand Strategist" />
          </Field>
          <Field label="OG 이미지 URL">
            <input value={form.ogImage} onChange={e => set("ogImage", e.target.value)} style={inputStyle} placeholder="/manus-storage/..." />
          </Field>
        </div>
        <Field label="메타 설명" hint="160자 이내 권장">
          <textarea value={form.description} onChange={e => set("description", e.target.value)} style={{ ...inputStyle, minHeight: 70, resize: "vertical", fontFamily: "inherit" }} placeholder="페이지 설명" />
        </Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Robots">
            <select value={form.robots} onChange={e => set("robots", e.target.value)} style={inputStyle}>
              <option value="index, follow">index, follow</option>
              <option value="noindex, follow">noindex, follow</option>
              <option value="index, nofollow">index, nofollow</option>
              <option value="noindex, nofollow">noindex, nofollow</option>
            </select>
          </Field>
          <Field label="Canonical URL">
            <input value={form.canonical} onChange={e => set("canonical", e.target.value)} style={inputStyle} placeholder="https://rapbae.com/..." />
          </Field>
        </div>
      </div>
    </form>
  );
}

export default function AdminSEO() {
  return (
    <AdminLayout title="SEO 관리">
      <div style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "1.3rem", color: "#111", fontWeight: 400 }}>SEO 설정</h2>
          <p style={{ color: "#999", fontSize: "0.82rem", marginTop: 4 }}>각 페이지의 메타 태그와 OG 이미지를 관리합니다.</p>
        </div>
        {PAGES.map(page => (
          <PageSeoEditor key={page.key} pageKey={page.key} pageLabel={page.label} />
        ))}
      </div>
    </AdminLayout>
  );
}
