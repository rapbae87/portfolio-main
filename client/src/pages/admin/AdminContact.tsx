/**
 * Admin Contact — Rapbae CMS
 * Edit all contact information.
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FormState {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  instagram: string;
  kakao: string;
  kakaoLabel: string;
  address: string;
}

const EMPTY: FormState = { email: "", phone: "", linkedin: "", github: "", instagram: "", kakao: "", kakaoLabel: "", address: "" };

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

export default function AdminContact() {
  const utils = trpc.useUtils();
  const { data: contact, isLoading } = trpc.settings.getContact.useQuery();
  const [form, setForm] = useState<FormState>(EMPTY);

  useEffect(() => {
    if (contact) {
      setForm({
        email: contact.email ?? "",
        phone: contact.phone ?? "",
        linkedin: contact.linkedin ?? "",
        github: contact.github ?? "",
        instagram: contact.instagram ?? "",
        kakao: contact.kakao ?? "",
        kakaoLabel: contact.kakaoLabel ?? "",
        address: contact.address ?? "",
      });
    }
  }, [contact]);

  const updateMutation = trpc.settings.updateContact.useMutation({
    onSuccess: () => { toast.success("연락처가 저장됐습니다."); utils.settings.getContact.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const set = (field: keyof FormState, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(form);
  };

  if (isLoading) return <AdminLayout title="Contact 관리"><p style={{ color: "#bbb" }}>로딩 중...</p></AdminLayout>;

  return (
    <AdminLayout title="Contact 관리">
      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>연락처 정보</h3>
          <Field label="이메일">
            <input type="email" value={form.email} onChange={e => set("email", e.target.value)} style={inputStyle} placeholder="hello@rapbae.com" />
          </Field>
          <Field label="전화번호">
            <input value={form.phone} onChange={e => set("phone", e.target.value)} style={inputStyle} placeholder="010-0000-0000" />
          </Field>
          <Field label="LinkedIn URL">
            <input value={form.linkedin} onChange={e => set("linkedin", e.target.value)} style={inputStyle} placeholder="https://linkedin.com/in/..." />
          </Field>
          <Field label="GitHub URL">
            <input value={form.github} onChange={e => set("github", e.target.value)} style={inputStyle} placeholder="https://github.com/..." />
          </Field>
          <Field label="Instagram URL">
            <input value={form.instagram} onChange={e => set("instagram", e.target.value)} style={inputStyle} placeholder="https://instagram.com/..." />
          </Field>
          <Field label="카카오톡 URL" hint="오픈채팅 링크를 입력하세요">
            <input value={form.kakao} onChange={e => set("kakao", e.target.value)} style={inputStyle} placeholder="https://open.kakao.com/o/..." />
          </Field>
          <Field label="카카오톡 표시 텍스트">
            <input value={form.kakaoLabel} onChange={e => set("kakaoLabel", e.target.value)} style={inputStyle} placeholder="일대일채팅문의" />
          </Field>
          <Field label="주소">
            <input value={form.address} onChange={e => set("address", e.target.value)} style={inputStyle} placeholder="서울특별시" />
          </Field>
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
