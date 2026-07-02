/**
 * Admin Dashboard — Rapbae CMS
 * Shows content stats, recent activity, and quick actions.
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { BarChart3, BookOpen, Image, Plus } from "lucide-react";
import { Link } from "wouter";

function StatCard({ label, value, sub, icon: Icon, color }: {
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div style={{
      backgroundColor: "#fff",
      border: "1px solid #ebebeb",
      padding: "20px 24px",
      display: "flex",
      alignItems: "flex-start",
      gap: 16,
    }}>
      <div style={{ width: 40, height: 40, backgroundColor: color + "15", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={18} color={color} />
      </div>
      <div>
        <p style={{ fontSize: "1.6rem", fontWeight: 600, color: "#111", lineHeight: 1.1, fontFamily: "'Noto Serif KR', serif" }}>{value}</p>
        <p style={{ fontSize: "0.8rem", color: "#777", marginTop: 4 }}>{label}</p>
        {sub && <p style={{ fontSize: "0.72rem", color: "#bbb", marginTop: 2 }}>{sub}</p>}
      </div>
    </div>
  );
}

const ACTION_LABELS: Record<string, string> = {
  create: "생성",
  update: "수정",
  delete: "삭제",
  publish: "게시",
  unpublish: "비공개",
};

const ENTITY_LABELS: Record<string, string> = {
  project: "프로젝트",
  article: "아티클",
  media: "미디어",
  profile: "프로필",
  settings: "사이트 설정",
  seo: "SEO",
  contact: "연락처",
};

function timeAgo(date: Date | string): string {
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "방금 전";
  if (mins < 60) return `${mins}분 전`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}시간 전`;
  const days = Math.floor(hrs / 24);
  return `${days}일 전`;
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = trpc.settings.dashboard.useQuery();
  const { data: activity } = trpc.settings.recentActivity.useQuery({ limit: 10 });

  return (
    <AdminLayout title="대시보드">
      <div style={{ maxWidth: 960 }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "1.5rem", color: "#111", fontWeight: 400, marginBottom: 6 }}>
            안녕하세요, 관리자님
          </h2>
          <p style={{ color: "#999", fontSize: "0.85rem" }}>
            Rapbae 포트폴리오 콘텐츠를 관리합니다.
          </p>
        </div>

        {/* Stats Grid */}
        {isLoading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "20px 24px", height: 88, animation: "pulse 1.5s ease-in-out infinite" }} />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
            <StatCard
              label="전체 프로젝트"
              value={stats?.projectStats?.total ?? 0}
              sub={`게시 ${stats?.projectStats?.published ?? 0} · 초안 ${stats?.projectStats?.draft ?? 0}`}
              icon={BarChart3}
              color="#111"
            />
            <StatCard
              label="전체 아티클"
              value={stats?.articleStats?.total ?? 0}
              sub={`게시 ${stats?.articleStats?.published ?? 0} · 초안 ${stats?.articleStats?.draft ?? 0}`}
              icon={BookOpen}
              color="#555"
            />
            <StatCard
              label="미디어 파일"
              value={stats?.mediaStats?.total ?? 0}
              icon={Image}
              color="#888"
            />
          </div>
        )}

        {/* Quick Actions */}
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
            빠른 작업
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              { label: "새 프로젝트 추가", href: "/admin/works/new" },
              { label: "새 아티클 작성", href: "/admin/thinking/new" },
              { label: "미디어 업로드", href: "/admin/media" },
              { label: "사이트 설정", href: "/admin/settings" },
            ].map(item => (
              <Link key={item.href} href={item.href}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  fontSize: "0.82rem",
                  color: "#333",
                  cursor: "pointer",
                  transition: "border-color 150ms ease",
                }}>
                  <Plus size={13} />
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
            최근 활동
          </h3>
          <div style={{ backgroundColor: "#fff", border: "1px solid #ebebeb" }}>
            {!activity || activity.length === 0 ? (
              <div style={{ padding: "32px 24px", textAlign: "center" }}>
                <p style={{ color: "#bbb", fontSize: "0.85rem" }}>아직 활동 기록이 없습니다.</p>
              </div>
            ) : (
              activity.map((log, i) => (
                <div key={log.id} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 20px",
                  borderBottom: i < activity.length - 1 ? "1px solid #f5f5f5" : "none",
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#ddd", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: "0.82rem", color: "#555" }}>
                      {ENTITY_LABELS[log.entityType] || log.entityType}
                    </span>
                    <span style={{ fontSize: "0.82rem", color: "#aaa", margin: "0 6px" }}>·</span>
                    <span style={{ fontSize: "0.82rem", color: "#111" }}>
                      {log.entityTitle || "-"}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#bbb", marginLeft: 6 }}>
                      {ACTION_LABELS[log.action] || log.action}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "#ccc", flexShrink: 0 }}>
                    {timeAgo(log.createdAt)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </AdminLayout>
  );
}
