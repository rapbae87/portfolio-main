import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { articles as fallbackArticles } from "@/lib/data";


function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Thinking() {
  useReveal();

  const { data: dbArticles, isLoading, error, refetch } = trpc.articles.list.useQuery(
    { status: "published" },
    {
      staleTime: 1000 * 60 * 3, // 3분 fresh
      gcTime: 1000 * 60 * 10, // 10분 캐시
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 2,
    }
  );
  const articles = (dbArticles && dbArticles.length > 0
    ? dbArticles
    : fallbackArticles
  ).map((article: any) => ({
    ...article,
    publishedDate: article.publishedDate ?? article.date ?? "",
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
    // 진입 시 데이터 재검증
    refetch();
  }, [refetch]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-white)" }}>
      <Navigation />

      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(1rem,3vw,2rem)" }}>
            <div>
              <p className="doc-label reveal" style={{ marginBottom: "clamp(0.5rem,1.5vw,1rem)" }}>
                브랜드 노트
              </p>
              <h1
                className="reveal"
                style={{
                  fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                  fontSize: "var(--text-h1)",
                  fontWeight: 800,
                  color: "var(--color-ink)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                  transitionDelay: "60ms",
                }}
              >
                Thinking
              </h1>
            </div>
            <p
              className="reveal"
              style={{
                fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                fontSize: "clamp(0.875rem,1.5vw,0.9375rem)",
                color: "var(--color-gray-400)",
                lineHeight: 1.75,
                transitionDelay: "120ms",
              }}
            >
              블로그가 아닙니다. 브랜드를 만들면서 실제로 부딪힌 생각들의 기록입니다.
              완성된 이론이 아니라, 현장에서 발견한 것들을 씁니다.
            </p>
          </div>
        </div>
      </div>

      {/* Article List */}
      <div style={{ paddingBottom: "clamp(2.5rem,6vw,5rem)" }}>
        <div className="container">
        {error && articles.length === 0 ? (
            <div style={{ padding: "3rem 0", textAlign: "center" }}>
              <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", color: "var(--color-gray-400)" }}>글을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.</p>
            </div>
          ) : isLoading && articles.length === 0 ? (
            <div style={{ padding: "3rem 0", textAlign: "center" }}>
              <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", color: "var(--color-gray-400)" }}>로딩 중...</p>
            </div>
          ) : articles.length === 0 ? (
            <div style={{ padding: "3rem 0", textAlign: "center" }}>
              <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", color: "var(--color-gray-400)" }}>아직 작성된 아티클이 없습니다.</p>
            </div>
          ) : articles && articles.length > 0 ? articles.map((article, i) => (
            <Link
                key={article.id}
                href={`/thinking/${article.slug}`}
                className="reveal"
                style={{
                  textDecoration: "none",
                  display: "block",
                  padding: "clamp(1.5rem,3.5vw,2.25rem) 0",
                  borderBottom: "1px solid var(--border-color)",
                  cursor: "pointer",
                  transitionDelay: `${(i % 5) * 50}ms`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Meta row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.6rem",
                        flexWrap: "wrap" as const,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          color: "var(--color-gray-300)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="tag">{article.category}</span>
                      {article.publishedDate && (
                        <span
                          style={{
                            fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                            fontSize: "0.6875rem",
                            color: "var(--color-gray-300)",
                          }}
                        >
                          {article.publishedDate}
                        </span>
                      )}

                      {article.readTime && (
                        <span
                          style={{
                            fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                            fontSize: "0.6875rem",
                            color: "var(--color-gray-300)",
                          }}
                        >
                          {article.readTime}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2
                      style={{
                        fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                        fontSize: "clamp(0.9375rem, 2vw, 1.25rem)",
                        fontWeight: 700,
                        color: "var(--color-ink)",
                        letterSpacing: "-0.02em",
                        marginBottom: "0.5rem",
                        transition: "color 160ms ease",
                        lineHeight: 1.4,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--color-gray-500)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--color-ink)")}
                    >
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                        fontSize: "0.8125rem",
                        color: "var(--color-gray-400)",
                        lineHeight: 1.65,
                      }}
                    >
                      {(article.excerpt ?? "").length > 120
                        ? (article.excerpt ?? "").substring(0, 120) + "..."
                        : (article.excerpt ?? "")}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-gray-300)",
                      flexShrink: 0,
                      paddingTop: "0.2rem",
                    }}
                  >
                    →
                  </span>
                </div>
            </Link>
          ))
            : null}
        </div>
      </div>

      <Footer />
    </div>
  );
}
