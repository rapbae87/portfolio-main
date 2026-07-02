/**
 * Admin Site Settings — Rapbae CMS
 * Edit site name, hero section, navigation, key metrics, footer.
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type NavItem = { label: string; href: string; visible: boolean };
type KeyMetric = { label: string; value: string; note?: string };

interface FormState {
  siteName: string;
  siteTagline: string;
  logoUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroBgImage: string;
  footerText: string;
  navItems: NavItem[];
  keyMetrics: KeyMetric[];
}

const EMPTY: FormState = {
  siteName: "RAPBAE", siteTagline: "Brand Strategist",
  logoUrl: "", heroTitle: "", heroSubtitle: "", heroCtaPrimary: "", heroCtaSecondary: "",
  heroBgImage: "", footerText: "",
  navItems: [
    { label: "Works", href: "/works", visible: true },
    { label: "Thinking", href: "/thinking", visible: true },
    { label: "About", href: "/about", visible: true },
    { label: "Contact", href: "/contact", visible: true },
  ],
  keyMetrics: [{ label: "", value: "", note: "" }],
};

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

export default function AdminSettings() {
  const utils = trpc.useUtils();
  const { data: settings, isLoading } = trpc.settings.getSiteSettings.useQuery();
  const [form, setForm] = useState<FormState>(EMPTY);

  useEffect(() => {
    if (settings) {
      setForm({
        siteName: settings.siteName ?? "RAPBAE",
        siteTagline: settings.siteTagline ?? "",
        logoUrl: settings.logoUrl ?? "",
        heroTitle: settings.heroTitle ?? "",
        heroSubtitle: settings.heroSubtitle ?? "",
        heroCtaPrimary: settings.heroCtaPrimary ?? "",
        heroCtaSecondary: settings.heroCtaSecondary ?? "",
        heroBgImage: settings.heroBgImage ?? "",
        footerText: settings.footerText ?? "",
        navItems: ((settings.navItems as NavItem[]) ?? []).length > 0 ? (settings.navItems as NavItem[]) : EMPTY.navItems,
        keyMetrics: ((settings.keyMetrics as KeyMetric[]) ?? []).length > 0 ? (settings.keyMetrics as KeyMetric[]) : EMPTY.keyMetrics,
      });
    }
  }, [settings]);

  const updateMutation = trpc.settings.updateSiteSettings.useMutation({
    onSuccess: () => { toast.success("사이트 설정이 저장됐습니다."); utils.settings.getSiteSettings.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const set = (field: keyof FormState, value: unknown) => setForm(f => ({ ...f, [field]: value }));

  const updateNav = (i: number, field: keyof NavItem, val: string | boolean) => {
    const updated = [...form.navItems];
    updated[i] = { ...updated[i], [field]: val };
    set("navItems", updated);
  };
  const updateMetric = (i: number, field: keyof KeyMetric, val: string) => {
    const updated = [...form.keyMetrics];
    updated[i] = { ...updated[i], [field]: val };
    set("keyMetrics", updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      ...form,
      keyMetrics: form.keyMetrics.filter(m => m.label || m.value),
    });
  };

  if (isLoading) return <AdminLayout title="사이트 설정"><p style={{ color: "#bbb" }}>로딩 중...</p></AdminLayout>;

  return (
    <AdminLayout title="사이트 설정">
      <form onSubmit={handleSubmit} style={{ maxWidth: 800 }}>
        {/* Basic */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>기본 정보</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="사이트 이름"><input value={form.siteName} onChange={e => set("siteName", e.target.value)} style={inputStyle} placeholder="RAPBAE" /></Field>
            <Field label="태그라인"><input value={form.siteTagline} onChange={e => set("siteTagline", e.target.value)} style={inputStyle} placeholder="Brand Strategist" /></Field>
          </div>
          <Field label="로고 이미지 URL"><input value={form.logoUrl} onChange={e => set("logoUrl", e.target.value)} style={inputStyle} placeholder="/manus-storage/..." /></Field>
          <Field label="푸터 텍스트"><input value={form.footerText} onChange={e => set("footerText", e.target.value)} style={inputStyle} placeholder="© 2025 RAPBAE. All rights reserved." /></Field>
        </section>

        {/* Hero */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Hero 섹션</h3>
          <Field label="헤드라인">
            <textarea value={form.heroTitle} onChange={e => set("heroTitle", e.target.value)} style={{ ...inputStyle, minHeight: 80, resize: "vertical", fontFamily: "inherit" }} placeholder="브랜드를 만드는 것은&#10;이야기를 설계하는 일이다." />
          </Field>
          <Field label="서브타이틀">
            <textarea value={form.heroSubtitle} onChange={e => set("heroSubtitle", e.target.value)} style={{ ...inputStyle, minHeight: 60, resize: "vertical", fontFamily: "inherit" }} placeholder="전략, 아이덴티티, 경험을 하나의 흐름으로 연결합니다." />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="CTA 버튼 (주)"><input value={form.heroCtaPrimary} onChange={e => set("heroCtaPrimary", e.target.value)} style={inputStyle} placeholder="작업 보기 →" /></Field>
            <Field label="CTA 버튼 (부)"><input value={form.heroCtaSecondary} onChange={e => set("heroCtaSecondary", e.target.value)} style={inputStyle} placeholder="랩배 소개" /></Field>
          </div>
          <Field label="배경 이미지 URL"><input value={form.heroBgImage} onChange={e => set("heroBgImage", e.target.value)} style={inputStyle} placeholder="/manus-storage/..." /></Field>
        </section>

        {/* Key Metrics */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>Key Metrics</h3>
            <button type="button" onClick={() => set("keyMetrics", [...form.keyMetrics, { label: "", value: "", note: "" }])} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", border: "1px solid #e5e5e5", background: "none", fontSize: "0.75rem", color: "#555", cursor: "pointer" }}>
              <Plus size={11} /> 추가
            </button>
          </div>
          {form.keyMetrics.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8, marginBottom: 8 }}>
              <input value={item.label} onChange={e => updateMetric(i, "label", e.target.value)} style={inputStyle} placeholder="레이블 (예: 경력)" />
              <input value={item.value} onChange={e => updateMetric(i, "value", e.target.value)} style={inputStyle} placeholder="값 (예: 10년 5개월)" />
              <input value={item.note ?? ""} onChange={e => updateMetric(i, "note", e.target.value)} style={inputStyle} placeholder="부연 설명 (선택)" />
              <button type="button" onClick={() => set("keyMetrics", form.keyMetrics.filter((_, idx) => idx !== i))} style={{ padding: 8, border: "1px solid #e5e5e5", background: "none", cursor: "pointer" }}>
                <Trash2 size={13} color="#bbb" />
              </button>
            </div>
          ))}
        </section>

        {/* Navigation */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>네비게이션 메뉴</h3>
            <button type="button" onClick={() => set("navItems", [...form.navItems, { label: "", href: "", visible: true }])} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", border: "1px solid #e5e5e5", background: "none", fontSize: "0.75rem", color: "#555", cursor: "pointer" }}>
              <Plus size={11} /> 추가
            </button>
          </div>
          {form.navItems.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px auto", gap: 8, marginBottom: 8, alignItems: "center" }}>
              <input value={item.label} onChange={e => updateNav(i, "label", e.target.value)} style={inputStyle} placeholder="메뉴명" />
              <input value={item.href} onChange={e => updateNav(i, "href", e.target.value)} style={inputStyle} placeholder="/works" />
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "#555", cursor: "pointer" }}>
                <input type="checkbox" checked={item.visible} onChange={e => updateNav(i, "visible", e.target.checked)} />
                표시
              </label>
              <button type="button" onClick={() => set("navItems", form.navItems.filter((_, idx) => idx !== i))} style={{ padding: 8, border: "1px solid #e5e5e5", background: "none", cursor: "pointer" }}>
                <Trash2 size={13} color="#bbb" />
              </button>
            </div>
          ))}
        </section>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" disabled={updateMutation.isPending} style={{ padding: "10px 28px", backgroundColor: "#111", color: "#fff", border: "none", fontSize: "0.85rem", cursor: "pointer", opacity: updateMutation.isPending ? 0.6 : 1 }}>
            {updateMutation.isPending ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
