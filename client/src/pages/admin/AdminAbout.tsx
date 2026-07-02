/**
 * Admin About — Rapbae CMS
 * Edit profile, career timeline, skills, education, certifications.
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type CareerItem = { company: string; role: string; period: string; description: string };
type SkillItem = { name: string; level?: string };
type EducationItem = { institution: string; degree: string; period: string };
type CertItem = { name: string; issuer: string; year: string };

interface FormState {
  name: string;
  nameEn: string;
  title: string;
  bio: string;
  profileImage: string;
  career: CareerItem[];
  skills: SkillItem[];
  education: EducationItem[];
  certifications: CertItem[];
}

const EMPTY: FormState = {
  name: "", nameEn: "", title: "", bio: "", profileImage: "",
  career: [{ company: "", role: "", period: "", description: "" }],
  skills: [{ name: "", level: "" }],
  education: [{ institution: "", degree: "", period: "" }],
  certifications: [{ name: "", issuer: "", year: "" }],
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px", border: "1px solid #e5e5e5",
  fontSize: "0.88rem", color: "#111", outline: "none", backgroundColor: "#fff", boxSizing: "border-box",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

function SectionHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>{title}</h3>
      <button type="button" onClick={onAdd} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", border: "1px solid #e5e5e5", background: "none", fontSize: "0.75rem", color: "#555", cursor: "pointer" }}>
        <Plus size={11} /> 추가
      </button>
    </div>
  );
}

export default function AdminAbout() {
  const utils = trpc.useUtils();
  const { data: profile, isLoading } = trpc.settings.getProfile.useQuery();
  const [form, setForm] = useState<FormState>(EMPTY);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name ?? "",
        nameEn: profile.nameEn ?? "",
        title: profile.title ?? "",
        bio: profile.bio ?? "",
        profileImage: profile.profileImage ?? "",
        career: ((profile.career as CareerItem[]) ?? []).length > 0 ? (profile.career as CareerItem[]) : EMPTY.career,
        skills: ((profile.skills as SkillItem[]) ?? []).length > 0 ? (profile.skills as SkillItem[]) : EMPTY.skills,
        education: ((profile.education as EducationItem[]) ?? []).length > 0 ? (profile.education as EducationItem[]) : EMPTY.education,
        certifications: ((profile.certifications as CertItem[]) ?? []).length > 0 ? (profile.certifications as CertItem[]) : EMPTY.certifications,
      });
    }
  }, [profile]);

  const updateMutation = trpc.settings.updateProfile.useMutation({
    onSuccess: () => { toast.success("프로필이 저장됐습니다."); utils.settings.getProfile.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const set = (field: keyof FormState, value: unknown) => setForm(f => ({ ...f, [field]: value }));

  const updateCareer = (i: number, field: keyof CareerItem, val: string) => {
    const updated = [...form.career];
    updated[i] = { ...updated[i], [field]: val };
    set("career", updated);
  };
  const updateSkill = (i: number, field: keyof SkillItem, val: string) => {
    const updated = [...form.skills];
    updated[i] = { ...updated[i], [field]: val };
    set("skills", updated);
  };
  const updateEducation = (i: number, field: keyof EducationItem, val: string) => {
    const updated = [...form.education];
    updated[i] = { ...updated[i], [field]: val };
    set("education", updated);
  };
  const updateCert = (i: number, field: keyof CertItem, val: string) => {
    const updated = [...form.certifications];
    updated[i] = { ...updated[i], [field]: val };
    set("certifications", updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      ...form,
      career: form.career.filter(c => c.company || c.role),
      skills: form.skills.filter(s => s.name),
      education: form.education.filter(e => e.institution),
      certifications: form.certifications.filter(c => c.name),
    });
  };

  if (isLoading) return <AdminLayout title="About 관리"><p style={{ color: "#bbb" }}>로딩 중...</p></AdminLayout>;

  return (
    <AdminLayout title="About 관리">
      <form onSubmit={handleSubmit} style={{ maxWidth: 800 }}>
        {/* Basic */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>기본 정보</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="이름 (한국어)"><input value={form.name} onChange={e => set("name", e.target.value)} style={inputStyle} placeholder="배삼" /></Field>
            <Field label="이름 (영문)"><input value={form.nameEn} onChange={e => set("nameEn", e.target.value)} style={inputStyle} placeholder="Sam Bae" /></Field>
          </div>
          <Field label="직함/타이틀"><input value={form.title} onChange={e => set("title", e.target.value)} style={inputStyle} placeholder="Brand Strategist" /></Field>
          <Field label="소개 (Bio)">
            <textarea value={form.bio} onChange={e => set("bio", e.target.value)} style={{ ...inputStyle, minHeight: 120, resize: "vertical", fontFamily: "inherit" }} placeholder="자기소개" />
          </Field>
          <Field label="프로필 이미지 URL"><input value={form.profileImage} onChange={e => set("profileImage", e.target.value)} style={inputStyle} placeholder="/manus-storage/..." /></Field>
        </section>

        {/* Career */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <SectionHeader title="커리어 타임라인" onAdd={() => set("career", [...form.career, { company: "", role: "", period: "", description: "" }])} />
          {form.career.map((item, i) => (
            <div key={i} style={{ marginBottom: 16, padding: "16px", backgroundColor: "#fafafa", border: "1px solid #f0f0f0" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8, marginBottom: 8 }}>
                <input value={item.company} onChange={e => updateCareer(i, "company", e.target.value)} style={inputStyle} placeholder="회사명" />
                <input value={item.role} onChange={e => updateCareer(i, "role", e.target.value)} style={inputStyle} placeholder="직책" />
                <input value={item.period} onChange={e => updateCareer(i, "period", e.target.value)} style={inputStyle} placeholder="2020.03 – 현재" />
                <button type="button" onClick={() => set("career", form.career.filter((_, idx) => idx !== i))} style={{ padding: 8, border: "1px solid #e5e5e5", background: "none", cursor: "pointer" }}>
                  <Trash2 size={13} color="#bbb" />
                </button>
              </div>
              <textarea value={item.description} onChange={e => updateCareer(i, "description", e.target.value)} style={{ ...inputStyle, minHeight: 60, resize: "vertical", fontFamily: "inherit" }} placeholder="주요 역할 및 성과" />
            </div>
          ))}
        </section>

        {/* Skills */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <SectionHeader title="역량 / 스킬" onAdd={() => set("skills", [...form.skills, { name: "", level: "" }])} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 8 }}>
            {form.skills.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 6 }}>
                <input value={item.name} onChange={e => updateSkill(i, "name", e.target.value)} style={{ ...inputStyle, flex: 2 }} placeholder="스킬명" />
                <input value={item.level ?? ""} onChange={e => updateSkill(i, "level", e.target.value)} style={{ ...inputStyle, flex: 1 }} placeholder="수준" />
                <button type="button" onClick={() => set("skills", form.skills.filter((_, idx) => idx !== i))} style={{ padding: 8, border: "1px solid #e5e5e5", background: "none", cursor: "pointer" }}>
                  <Trash2 size={12} color="#bbb" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <SectionHeader title="학력" onAdd={() => set("education", [...form.education, { institution: "", degree: "", period: "" }])} />
          {form.education.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8, marginBottom: 8 }}>
              <input value={item.institution} onChange={e => updateEducation(i, "institution", e.target.value)} style={inputStyle} placeholder="학교명" />
              <input value={item.degree} onChange={e => updateEducation(i, "degree", e.target.value)} style={inputStyle} placeholder="전공/학위" />
              <input value={item.period} onChange={e => updateEducation(i, "period", e.target.value)} style={inputStyle} placeholder="2010 – 2014" />
              <button type="button" onClick={() => set("education", form.education.filter((_, idx) => idx !== i))} style={{ padding: 8, border: "1px solid #e5e5e5", background: "none", cursor: "pointer" }}>
                <Trash2 size={13} color="#bbb" />
              </button>
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <SectionHeader title="자격증 / 수료" onAdd={() => set("certifications", [...form.certifications, { name: "", issuer: "", year: "" }])} />
          {form.certifications.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px auto", gap: 8, marginBottom: 8 }}>
              <input value={item.name} onChange={e => updateCert(i, "name", e.target.value)} style={inputStyle} placeholder="자격증명" />
              <input value={item.issuer} onChange={e => updateCert(i, "issuer", e.target.value)} style={inputStyle} placeholder="발급기관" />
              <input value={item.year} onChange={e => updateCert(i, "year", e.target.value)} style={inputStyle} placeholder="2023" />
              <button type="button" onClick={() => set("certifications", form.certifications.filter((_, idx) => idx !== i))} style={{ padding: 8, border: "1px solid #e5e5e5", background: "none", cursor: "pointer" }}>
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
