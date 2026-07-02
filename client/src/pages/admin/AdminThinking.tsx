/**
 * Admin Thinking — Rapbae CMS
 * List articles with create/edit/delete/publish controls.
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Edit, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

const STATUS_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  published: { label: "게시됨", color: "#166534", bg: "#dcfce7" },
  draft: { label: "초안", color: "#92400e", bg: "#fef3c7" },
};

export default function AdminThinking() {
  const utils = trpc.useUtils();
  const { data: articles, isLoading } = trpc.articles.adminList.useQuery({ status: "all" });

  const publishMutation = trpc.articles.publish.useMutation({
    onSuccess: () => utils.articles.adminList.invalidate(),
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = trpc.articles.delete.useMutation({
    onSuccess: () => { utils.articles.adminList.invalidate(); toast.success("아티클이 삭제됐습니다."); },
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

  function formatDate(d: Date | string | null) {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
  }

  return (
    <AdminLayout title="Thinking 관리">
      <div style={{ maxWidth: 960 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "1.3rem", color: "#111", fontWeight: 400 }}>아티클 목록</h2>
            <p style={{ color: "#999", fontSize: "0.82rem", marginTop: 4 }}>{articles?.length ?? 0}개 아티클</p>
          </div>
          <Link href="/admin/thinking/new">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", backgroundColor: "#111", color: "#fff", fontSize: "0.82rem", cursor: "pointer" }}>
              <Plus size={14} /> 새 아티클
            </span>
          </Link>
        </div>

        {isLoading ? (
          <div style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: 40, textAlign: "center" }}>
            <p style={{ color: "#bbb", fontSize: "0.85rem" }}>로딩 중...</p>
          </div>
        ) : !articles || articles.length === 0 ? (
          <div style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "60px 40px", textAlign: "center" }}>
            <p style={{ color: "#bbb", fontSize: "0.9rem", marginBottom: 16 }}>아직 아티클이 없습니다.</p>
            <Link href="/admin/thinking/new">
              <span style={{ fontSize: "0.82rem", color: "#111", textDecoration: "underline", cursor: "pointer" }}>첫 아티클 작성하기 →</span>
            </Link>
          </div>
        ) : (
          <div style={{ backgroundColor: "#fff", border: "1px solid #ebebeb" }}>
            {articles.map((article, i) => {
              const badge = STATUS_BADGE[article.status] ?? STATUS_BADGE.draft;
              return (
                <div key={article.id} style={{ padding: "16px 20px", borderBottom: i < articles.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: "0.88rem", color: "#111", fontWeight: 500 }}>{article.title}</span>
                        <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: "0.7rem", color: badge.color, backgroundColor: badge.bg, fontWeight: 500, flexShrink: 0 }}>{badge.label}</span>
                      </div>
                      <p style={{ fontSize: "0.78rem", color: "#999" }}>
                        {article.category} · {formatDate(article.publishedDate ?? article.createdAt)}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <Link href={`/admin/thinking/${article.id}`}>
                        <button title="편집" style={{ padding: 6, background: "none", border: "1px solid #e5e5e5", cursor: "pointer", borderRadius: 4 }}>
                          <Edit size={13} color="#555" />
                        </button>
                      </Link>
                      <button
                        title={article.status === "published" ? "비공개" : "게시"}
                        onClick={() => publishMutation.mutate({ id: article.id, status: article.status === "published" ? "draft" : "published" })}
                        style={{ padding: 6, background: "none", border: "1px solid #e5e5e5", cursor: "pointer", borderRadius: 4 }}
                      >
                        {article.status === "published" ? <EyeOff size={13} color="#555" /> : <Eye size={13} color="#555" />}
                      </button>
                      <button
                        title={deleteConfirm === article.id ? "한 번 더 클릭하면 삭제됩니다" : "삭제"}
                        onClick={() => handleDelete(article.id)}
                        style={{ padding: 6, background: "none", border: `1px solid ${deleteConfirm === article.id ? "#ef4444" : "#e5e5e5"}`, cursor: "pointer", borderRadius: 4 }}
                      >
                        <Trash2 size={13} color={deleteConfirm === article.id ? "#ef4444" : "#bbb"} />
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
