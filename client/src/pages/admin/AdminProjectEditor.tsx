/**
 * Admin Project Editor — Rapbae CMS
 * Create or edit a project with all fields.
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { toast } from "sonner";

type ExecutionItem = { phase: string; action: string; detail: string };
type ResultItem = { metric: string; value: string; note?: string };

interface FormState {
  slug: string;
  title: string;
  category: string;
  client: string;
  role: string;
  scope: string[];
  year: string;
  description: string;
  tagline: string;
  coverImage: string;
  context: string;
  challenge: string;
  approach: string;
  execution: ExecutionItem[];
  results: ResultItem[];
  reflection: string;
  tags: string[];
  images: string[];
  pdfUrl: string;
  pptUrl: string;
  externalUrl: string;
  featured: boolean;
  status: "draft" | "published";
  sortOrder: number;
}

const EMPTY_FORM: FormState = {
  slug: "", title: "", category: "", client: "", role: "", scope: [],
  year: new Date().getFullYear().toString(), description: "", tagline: "",
  coverImage: "", context: "", challenge: "", approach: "",
  execution: [{ phase: "", action: "", detail: "" }],
  results: [{ metric: "", value: "" }],
  reflection: "", tags: [], images: [], pdfUrl: "", pptUrl: "", externalUrl: "",
  featured: false, status: "draft", sortOrder: 0,
};

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: "0.78rem", color: "#777", letterSpacing: "0.05em", marginBottom: 6, textTransform: "uppercase" }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ fontSize: "0.72rem", color: "#bbb", marginTop: 4 }}>{hint}</p>}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  border: "1px solid #e5e5e5",
  fontSize: "0.88rem",
  color: "#111",
  outline: "none",
  backgroundColor: "#fff",
  boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 100,
  resize: "vertical",
  fontFamily: "inherit",
};

export default function AdminProjectEditor() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const isNew = params.id === "new";
  const projectId = isNew ? null : parseInt(params.id);

  const { data: existing, isLoading } = trpc.projects.adminList.useQuery(
    { status: "all" },
    { enabled: !isNew }
  );

  const project = isNew ? null : existing?.find(p => p.id === projectId);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [scopeInput, setScopeInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  useEffect(() => {
    if (project) {
      setForm({
        slug: project.slug ?? "",
        title: project.title ?? "",
        category: project.category ?? "",
        client: project.client ?? "",
        role: project.role ?? "",
        scope: (project.scope as string[]) ?? [],
        year: project.year ?? "",
        description: project.description ?? "",
        tagline: project.tagline ?? "",
        coverImage: project.coverImage ?? "",
        context: project.context ?? "",
        challenge: project.challenge ?? "",
        approach: project.approach ?? "",
        execution: ((project.execution as ExecutionItem[]) ?? []).length > 0
          ? (project.execution as ExecutionItem[])
          : [{ phase: "", action: "", detail: "" }],
        results: ((project.results as ResultItem[]) ?? []).length > 0
          ? (project.results as ResultItem[])
          : [{ metric: "", value: "" }],
        reflection: project.reflection ?? "",
        tags: (project.tags as string[]) ?? [],
        images: (project.images as string[]) ?? [],
        pdfUrl: project.pdfUrl ?? "",
        pptUrl: project.pptUrl ?? "",
        externalUrl: project.externalUrl ?? "",
        featured: project.featured ?? false,
        status: project.status ?? "draft",
        sortOrder: project.sortOrder ?? 0,
      });
    }
  }, [project]);

  const utils = trpc.useUtils();

  const createMutation = trpc.projects.create.useMutation({
    onSuccess: () => {
      toast.success("프로젝트가 생성됐습니다.");
      utils.projects.adminList.invalidate();
      navigate("/admin/works");
    },
    onError: (e) => toast.error(e.message),
  });

  const updateMutation = trpc.projects.update.useMutation({
    onSuccess: () => {
      toast.success("저장됐습니다.");
      utils.projects.adminList.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const set = (field: keyof FormState, value: unknown) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      execution: form.execution.filter(i => i.phase || i.action),
      results: form.results.filter(i => i.metric || i.value),
    };
    if (isNew) {
      createMutation.mutate(data);
    } else if (projectId) {
      updateMutation.mutate({ id: projectId, data });
    }
  };

  const addExecution = () => set("execution", [...form.execution, { phase: "", action: "", detail: "" }]);
  const removeExecution = (i: number) => set("execution", form.execution.filter((_, idx) => idx !== i));
  const updateExecution = (i: number, field: keyof ExecutionItem, val: string) => {
    const updated = [...form.execution];
    updated[i] = { ...updated[i], [field]: val };
    set("execution", updated);
  };

  const addResult = () => set("results", [...form.results, { metric: "", value: "" }]);
  const removeResult = (i: number) => set("results", form.results.filter((_, idx) => idx !== i));
  const updateResult = (i: number, field: keyof ResultItem, val: string) => {
    const updated = [...form.results];
    updated[i] = { ...updated[i], [field]: val };
    set("results", updated);
  };

  if (!isNew && isLoading) {
    return <AdminLayout title="프로젝트 편집"><p style={{ color: "#bbb" }}>로딩 중...</p></AdminLayout>;
  }

  if (!isNew && !project && !isLoading) {
    return <AdminLayout title="프로젝트 편집"><p style={{ color: "#bbb" }}>프로젝트를 찾을 수 없습니다.</p></AdminLayout>;
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminLayout title={isNew ? "새 프로젝트" : "프로젝트 편집"}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 800 }}>
        {/* Status bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, padding: "12px 16px", backgroundColor: "#fff", border: "1px solid #ebebeb" }}>
          <select
            value={form.status}
            onChange={e => set("status", e.target.value)}
            style={{ ...inputStyle, width: "auto", padding: "6px 10px", fontSize: "0.82rem" }}
          >
            <option value="draft">초안</option>
            <option value="published">게시됨</option>
          </select>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#555", cursor: "pointer" }}>
            <input type="checkbox" checked={form.featured} onChange={e => set("featured", e.target.checked)} />
            대표 프로젝트
          </label>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={() => navigate("/admin/works")}
              style={{ padding: "8px 16px", border: "1px solid #ddd", background: "none", fontSize: "0.82rem", color: "#777", cursor: "pointer" }}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSaving}
              style={{ padding: "8px 20px", backgroundColor: "#111", color: "#fff", border: "none", fontSize: "0.82rem", cursor: "pointer", opacity: isSaving ? 0.6 : 1 }}
            >
              {isSaving ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>

        {/* Basic Info */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>기본 정보</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="제목 *">
              <input required value={form.title} onChange={e => set("title", e.target.value)} style={inputStyle} placeholder="프로젝트 제목" />
            </Field>
            <Field label="슬러그 *" hint="URL에 사용됩니다 (영문, 하이픈만)">
              <input required value={form.slug} onChange={e => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} style={inputStyle} placeholder="project-slug" />
            </Field>
            <Field label="클라이언트">
              <input value={form.client} onChange={e => set("client", e.target.value)} style={inputStyle} placeholder="클라이언트명" />
            </Field>
            <Field label="카테고리">
              <input value={form.category} onChange={e => set("category", e.target.value)} style={inputStyle} placeholder="브랜드 전략" />
            </Field>
            <Field label="역할">
              <input value={form.role} onChange={e => set("role", e.target.value)} style={inputStyle} placeholder="Brand Strategist" />
            </Field>
            <Field label="연도">
              <input value={form.year} onChange={e => set("year", e.target.value)} style={inputStyle} placeholder="2024" />
            </Field>
          </div>
          <Field label="태그라인">
            <input value={form.tagline} onChange={e => set("tagline", e.target.value)} style={inputStyle} placeholder="한 줄 요약" />
          </Field>
          <Field label="설명">
            <textarea value={form.description} onChange={e => set("description", e.target.value)} style={textareaStyle} placeholder="프로젝트 설명" />
          </Field>
          <Field label="커버 이미지 URL">
            <input value={form.coverImage} onChange={e => set("coverImage", e.target.value)} style={inputStyle} placeholder="/manus-storage/..." />
          </Field>
          <Field label="범위 (Scope)" hint="입력 후 Enter로 추가">
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input
                value={scopeInput}
                onChange={e => setScopeInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); if (scopeInput.trim()) { set("scope", [...form.scope, scopeInput.trim()]); setScopeInput(""); } } }}
                style={{ ...inputStyle, flex: 1 }}
                placeholder="브랜드 전략"
              />
              <button type="button" onClick={() => { if (scopeInput.trim()) { set("scope", [...form.scope, scopeInput.trim()]); setScopeInput(""); } }} style={{ padding: "9px 14px", backgroundColor: "#f5f5f5", border: "1px solid #e5e5e5", cursor: "pointer" }}>
                <Plus size={14} />
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {form.scope.map((s, i) => (
                <span key={i} style={{ padding: "3px 10px", backgroundColor: "#f5f5f5", fontSize: "0.78rem", color: "#555", display: "flex", alignItems: "center", gap: 4 }}>
                  {s}
                  <button type="button" onClick={() => set("scope", form.scope.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1 }}>×</button>
                </span>
              ))}
            </div>
          </Field>
        </section>

        {/* Strategy */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>전략 내용</h3>
          <Field label="배경 (Context)">
            <textarea value={form.context} onChange={e => set("context", e.target.value)} style={textareaStyle} placeholder="프로젝트 배경" />
          </Field>
          <Field label="과제 (Challenge)">
            <textarea value={form.challenge} onChange={e => set("challenge", e.target.value)} style={textareaStyle} placeholder="해결해야 할 과제" />
          </Field>
          <Field label="접근 방식 (Approach)">
            <textarea value={form.approach} onChange={e => set("approach", e.target.value)} style={textareaStyle} placeholder="접근 방식" />
          </Field>
          <Field label="성찰 (Reflection)">
            <textarea value={form.reflection} onChange={e => set("reflection", e.target.value)} style={{ ...textareaStyle, minHeight: 80 }} placeholder="이 프로젝트에서 얻은 인사이트" />
          </Field>
        </section>

        {/* Execution */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>실행 단계</h3>
            <button type="button" onClick={addExecution} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", border: "1px solid #e5e5e5", background: "none", fontSize: "0.78rem", color: "#555", cursor: "pointer" }}>
              <Plus size={12} /> 단계 추가
            </button>
          </div>
          {form.execution.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8, marginBottom: 10, alignItems: "start" }}>
              <input value={item.phase} onChange={e => updateExecution(i, "phase", e.target.value)} style={inputStyle} placeholder="단계명" />
              <input value={item.action} onChange={e => updateExecution(i, "action", e.target.value)} style={inputStyle} placeholder="액션" />
              <input value={item.detail} onChange={e => updateExecution(i, "detail", e.target.value)} style={inputStyle} placeholder="상세" />
              <button type="button" onClick={() => removeExecution(i)} style={{ padding: 8, border: "1px solid #e5e5e5", background: "none", cursor: "pointer" }}>
                <Trash2 size={13} color="#bbb" />
              </button>
            </div>
          ))}
        </section>

        {/* Results */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>성과 지표</h3>
            <button type="button" onClick={addResult} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", border: "1px solid #e5e5e5", background: "none", fontSize: "0.78rem", color: "#555", cursor: "pointer" }}>
              <Plus size={12} /> 지표 추가
            </button>
          </div>
          {form.results.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginBottom: 10, alignItems: "start" }}>
              <input value={item.metric} onChange={e => updateResult(i, "metric", e.target.value)} style={inputStyle} placeholder="지표명" />
              <input value={item.value} onChange={e => updateResult(i, "value", e.target.value)} style={inputStyle} placeholder="값" />
              <button type="button" onClick={() => removeResult(i)} style={{ padding: 8, border: "1px solid #e5e5e5", background: "none", cursor: "pointer" }}>
                <Trash2 size={13} color="#bbb" />
              </button>
            </div>
          ))}
        </section>

        {/* Media & Links */}
        <section style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "24px", marginBottom: 16 }}>
          <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>미디어 & 링크</h3>
          <Field label="갤러리 이미지 URL" hint="입력 후 Enter로 추가">
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input
                value={imageInput}
                onChange={e => setImageInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); if (imageInput.trim()) { set("images", [...form.images, imageInput.trim()]); setImageInput(""); } } }}
                style={{ ...inputStyle, flex: 1 }}
                placeholder="/manus-storage/..."
              />
              <button type="button" onClick={() => { if (imageInput.trim()) { set("images", [...form.images, imageInput.trim()]); setImageInput(""); } }} style={{ padding: "9px 14px", backgroundColor: "#f5f5f5", border: "1px solid #e5e5e5", cursor: "pointer" }}>
                <Plus size={14} />
              </button>
            </div>
            {form.images.map((url, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ flex: 1, fontSize: "0.78rem", color: "#777", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{url}</span>
                <button type="button" onClick={() => set("images", form.images.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb" }}>×</button>
              </div>
            ))}
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <Field label="PDF URL">
              <input value={form.pdfUrl} onChange={e => set("pdfUrl", e.target.value)} style={inputStyle} placeholder="https://..." />
            </Field>
            <Field label="PPT URL">
              <input value={form.pptUrl} onChange={e => set("pptUrl", e.target.value)} style={inputStyle} placeholder="https://..." />
            </Field>
            <Field label="외부 링크">
              <input value={form.externalUrl} onChange={e => set("externalUrl", e.target.value)} style={inputStyle} placeholder="https://..." />
            </Field>
          </div>
          <Field label="태그" hint="입력 후 Enter로 추가">
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); if (tagInput.trim()) { set("tags", [...form.tags, tagInput.trim()]); setTagInput(""); } } }}
                style={{ ...inputStyle, flex: 1 }}
                placeholder="브랜드 전략"
              />
              <button type="button" onClick={() => { if (tagInput.trim()) { set("tags", [...form.tags, tagInput.trim()]); setTagInput(""); } }} style={{ padding: "9px 14px", backgroundColor: "#f5f5f5", border: "1px solid #e5e5e5", cursor: "pointer" }}>
                <Plus size={14} />
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {form.tags.map((t, i) => (
                <span key={i} style={{ padding: "3px 10px", backgroundColor: "#f5f5f5", fontSize: "0.78rem", color: "#555", display: "flex", alignItems: "center", gap: 4 }}>
                  {t}
                  <button type="button" onClick={() => set("tags", form.tags.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1 }}>×</button>
                </span>
              ))}
            </div>
          </Field>
          <Field label="정렬 순서" hint="숫자가 낮을수록 먼저 표시됩니다">
            <input type="number" value={form.sortOrder} onChange={e => set("sortOrder", parseInt(e.target.value) || 0)} style={{ ...inputStyle, width: 100 }} />
          </Field>
        </section>

        {/* Bottom save */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            type="button"
            onClick={() => navigate("/admin/works")}
            style={{ padding: "10px 20px", border: "1px solid #ddd", background: "none", fontSize: "0.85rem", color: "#777", cursor: "pointer" }}
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSaving}
            style={{ padding: "10px 24px", backgroundColor: "#111", color: "#fff", border: "none", fontSize: "0.85rem", cursor: "pointer", opacity: isSaving ? 0.6 : 1 }}
          >
            {isSaving ? "저장 중..." : isNew ? "프로젝트 생성" : "변경사항 저장"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
