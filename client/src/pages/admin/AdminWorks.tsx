/**
 * Admin Works — Rapbae CMS
 * List, create, edit, delete, publish/unpublish, feature projects.
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Edit, Eye, EyeOff, Plus, Star, StarOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

const STATUS_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  published: { label: "게시됨", color: "#166534", bg: "#dcfce7" },
  draft: { label: "초안", color: "#92400e", bg: "#fef3c7" },
};

export default function AdminWorks() {
  const utils = trpc.useUtils();
  const { data: projects, isLoading } = trpc.projects.adminList.useQuery({ status: "all" });

  const publishMutation = trpc.projects.publish.useMutation({
    onSuccess: () => { utils.projects.adminList.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const featureMutation = trpc.projects.setFeatured.useMutation({
    onSuccess: () => { utils.projects.adminList.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = trpc.projects.delete.useMutation({
    onSuccess: () => { utils.projects.adminList.invalidate(); toast.success("프로젝트가 삭제됐습니다."); },
    onError: (e) => toast.error(e.message),
  });

  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (deleteConfirm === id) {
      deleteMutation.mutate({ id });
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <AdminLayout title="Works 관리">
      <div style={{ maxWidth: 960 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "1.3rem", color: "#111", fontWeight: 400 }}>
              프로젝트 목록
            </h2>
            <p style={{ color: "#999", fontSize: "0.82rem", marginTop: 4 }}>
              {projects?.length ?? 0}개 프로젝트
            </p>
          </div>
          <Link href="/admin/works/new">
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 18px",
              backgroundColor: "#111",
              color: "#fff",
              fontSize: "0.82rem",
              cursor: "pointer",
              letterSpacing: "0.03em",
            }}>
              <Plus size={14} />
              새 프로젝트
            </span>
          </Link>
        </div>

        {/* Table */}
        {isLoading ? (
          <div style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "40px", textAlign: "center" }}>
            <p style={{ color: "#bbb", fontSize: "0.85rem" }}>로딩 중...</p>
          </div>
        ) : !projects || projects.length === 0 ? (
          <div style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "60px 40px", textAlign: "center" }}>
            <p style={{ color: "#bbb", fontSize: "0.9rem", marginBottom: 16 }}>아직 프로젝트가 없습니다.</p>
            <Link href="/admin/works/new">
              <span style={{ fontSize: "0.82rem", color: "#111", textDecoration: "underline", cursor: "pointer" }}>
                첫 프로젝트 추가하기 →
              </span>
            </Link>
          </div>
        ) : (
          <div style={{ backgroundColor: "#fff", border: "1px solid #ebebeb" }}>
            {/* Desktop header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 80px 80px 120px",
              padding: "10px 20px",
              borderBottom: "1px solid #f0f0f0",
              gap: 12,
            }} className="hidden md:grid">
              {["프로젝트", "카테고리", "연도", "상태", "작업"].map(h => (
                <span key={h} style={{ fontSize: "0.7rem", color: "#bbb", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</span>
              ))}
            </div>

            {projects.map((project, i) => {
              const badge = STATUS_BADGE[project.status] ?? STATUS_BADGE.draft;
              return (
                <div key={project.id} style={{
                  borderBottom: i < projects.length - 1 ? "1px solid #f5f5f5" : "none",
                }}>
                  {/* Desktop row */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 120px 80px 80px 120px",
                    padding: "14px 20px",
                    gap: 12,
                    alignItems: "center",
                  }} className="hidden md:grid">
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {project.featured && <Star size={12} color="#f59e0b" fill="#f59e0b" />}
                        <span style={{ fontSize: "0.88rem", color: "#111", fontWeight: 500 }}>{project.title}</span>
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "#bbb" }}>{project.client}</span>
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "#777" }}>{project.category}</span>
                    <span style={{ fontSize: "0.8rem", color: "#999" }}>{project.year}</span>
                    <span style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: 4,
                      fontSize: "0.72rem",
                      color: badge.color,
                      backgroundColor: badge.bg,
                      fontWeight: 500,
                    }}>{badge.label}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Link href={`/admin/works/${project.id}`}>
                        <button title="편집" style={{ padding: 6, background: "none", border: "1px solid #e5e5e5", cursor: "pointer", borderRadius: 4 }}>
                          <Edit size={13} color="#555" />
                        </button>
                      </Link>
                      <button
                        title={project.status === "published" ? "비공개" : "게시"}
                        onClick={() => publishMutation.mutate({ id: project.id, status: project.status === "published" ? "draft" : "published" })}
                        style={{ padding: 6, background: "none", border: "1px solid #e5e5e5", cursor: "pointer", borderRadius: 4 }}
                      >
                        {project.status === "published" ? <EyeOff size={13} color="#555" /> : <Eye size={13} color="#555" />}
                      </button>
                      <button
                        title={project.featured ? "대표 해제" : "대표 지정"}
                        onClick={() => featureMutation.mutate({ id: project.id, featured: !project.featured })}
                        style={{ padding: 6, background: "none", border: "1px solid #e5e5e5", cursor: "pointer", borderRadius: 4 }}
                      >
                        {project.featured ? <StarOff size={13} color="#f59e0b" /> : <Star size={13} color="#bbb" />}
                      </button>
                      <button
                        title={deleteConfirm === project.id ? "한 번 더 클릭하면 삭제됩니다" : "삭제"}
                        onClick={() => handleDelete(project.id)}
                        style={{
                          padding: 6,
                          background: "none",
                          border: `1px solid ${deleteConfirm === project.id ? "#ef4444" : "#e5e5e5"}`,
                          cursor: "pointer",
                          borderRadius: 4,
                        }}
                      >
                        <Trash2 size={13} color={deleteConfirm === project.id ? "#ef4444" : "#bbb"} />
                      </button>
                    </div>
                  </div>

                  {/* Mobile card */}
                  <div style={{ padding: "16px 20px" }} className="md:hidden">
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          {project.featured && <Star size={12} color="#f59e0b" fill="#f59e0b" />}
                          <span style={{ fontSize: "0.9rem", color: "#111", fontWeight: 500 }}>{project.title}</span>
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#999" }}>{project.client} · {project.year}</span>
                      </div>
                      <span style={{
                        padding: "2px 8px",
                        borderRadius: 4,
                        fontSize: "0.7rem",
                        color: badge.color,
                        backgroundColor: badge.bg,
                        fontWeight: 500,
                        flexShrink: 0,
                      }}>{badge.label}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link href={`/admin/works/${project.id}`}>
                        <span style={{ fontSize: "0.78rem", color: "#555", padding: "6px 12px", border: "1px solid #e5e5e5", cursor: "pointer" }}>편집</span>
                      </Link>
                      <button
                        onClick={() => publishMutation.mutate({ id: project.id, status: project.status === "published" ? "draft" : "published" })}
                        style={{ fontSize: "0.78rem", color: "#555", padding: "6px 12px", border: "1px solid #e5e5e5", cursor: "pointer", background: "none" }}
                      >
                        {project.status === "published" ? "비공개" : "게시"}
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        style={{
                          fontSize: "0.78rem",
                          color: deleteConfirm === project.id ? "#ef4444" : "#bbb",
                          padding: "6px 12px",
                          border: `1px solid ${deleteConfirm === project.id ? "#ef4444" : "#e5e5e5"}`,
                          cursor: "pointer",
                          background: "none",
                        }}
                      >
                        {deleteConfirm === project.id ? "확인" : "삭제"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
