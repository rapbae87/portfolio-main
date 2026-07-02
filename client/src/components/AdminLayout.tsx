/**
 * AdminLayout — Rapbae CMS
 * Sidebar navigation for all admin pages.
 * Redirects non-admin users to login.
 */
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Contact,
  FileText,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

const NAV_ITEMS = [
  { label: "대시보드", href: "/admin", icon: LayoutDashboard },
  { label: "Works", href: "/admin/works", icon: BarChart3 },
  { label: "Thinking", href: "/admin/thinking", icon: BookOpen },
  { label: "미디어", href: "/admin/media", icon: Image },
  { label: "About", href: "/admin/about", icon: User },
  { label: "Contact", href: "/admin/contact", icon: Contact },
  { label: "SEO", href: "/admin/seo", icon: FileText },
  { label: "사이트 설정", href: "/admin/settings", icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => { window.location.href = "/"; },
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [loading, isAuthenticated]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f7f5f2" }}>
        <div className="text-center">
          <div style={{ width: 32, height: 32, border: "2px solid #111", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
          <p style={{ color: "#999", fontSize: "0.85rem", fontFamily: "'Noto Sans KR', sans-serif" }}>로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f7f5f2" }}>
        <div className="text-center" style={{ maxWidth: 360, padding: "0 24px" }}>
          <p style={{ fontSize: "2rem", marginBottom: 12 }}>🔒</p>
          <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "1.4rem", color: "#111", marginBottom: 8 }}>접근 권한이 없습니다</h2>
          <p style={{ color: "#777", fontSize: "0.9rem", marginBottom: 24 }}>관리자만 이 페이지에 접근할 수 있습니다.</p>
          <Link href="/">
            <span style={{ display: "inline-block", padding: "10px 24px", backgroundColor: "#111", color: "#fff", fontSize: "0.8rem", fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: "0.05em", cursor: "pointer" }}>
              홈으로 돌아가기
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f7f5f2", fontFamily: "'Noto Sans KR', sans-serif" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 40 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: 240,
        backgroundColor: "#111",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 220ms cubic-bezier(0.23,1,0.32,1)",
      }}
        className="lg:translate-x-0 lg:static lg:flex"
      >
        {/* Logo */}
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #222" }}>
          <Link href="/">
            <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "1.1rem", color: "#fff", letterSpacing: "-0.02em", cursor: "pointer" }}>
              RAPBAE
            </span>
          </Link>
          <p style={{ color: "#555", fontSize: "0.7rem", marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            CMS Admin
          </p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 0", overflowY: "auto" }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === "/admin"
              ? location === "/admin"
              : location.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 20px",
                  cursor: "pointer",
                  backgroundColor: isActive ? "#1a1a1a" : "transparent",
                  borderLeft: isActive ? "2px solid #fff" : "2px solid transparent",
                  transition: "background-color 150ms ease",
                }}>
                  <Icon size={16} color={isActive ? "#fff" : "#666"} />
                  <span style={{ fontSize: "0.85rem", color: isActive ? "#fff" : "#888", fontWeight: isActive ? 500 : 400 }}>
                    {item.label}
                  </span>
                  {isActive && <ChevronRight size={12} color="#555" style={{ marginLeft: "auto" }} />}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid #222" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={14} color="#888" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "0.8rem", color: "#ddd", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.name || "관리자"}
              </p>
              <p style={{ fontSize: "0.65rem", color: "#555", letterSpacing: "0.05em" }}>ADMIN</p>
            </div>
          </div>
          <button
            onClick={() => logoutMutation.mutate()}
            style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 0", background: "none", border: "none", cursor: "pointer" }}
          >
            <LogOut size={14} color="#555" />
            <span style={{ fontSize: "0.8rem", color: "#666" }}>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, marginLeft: 0 }} className="lg:ml-60">
        {/* Top bar */}
        <header style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          backgroundColor: "#fff",
          borderBottom: "1px solid #ebebeb",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}
            className="lg:hidden"
          >
            <Menu size={20} color="#111" />
          </button>
          <h1 style={{ fontSize: "0.95rem", fontWeight: 500, color: "#111", flex: 1 }}>
            {title || "관리자"}
          </h1>
          <Link href="/">
            <span style={{ fontSize: "0.75rem", color: "#999", cursor: "pointer", letterSpacing: "0.03em" }}>
              사이트 보기 →
            </span>
          </Link>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "32px 24px", maxWidth: 1200, width: "100%" }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          aside { transform: translateX(0) !important; position: sticky !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
