import { useEffect } from "react";
import { Link, useParams } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { articles as fallbackArticles } from "@/lib/data";

function useReveal() {
  useEffect(() => {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("visible");
    });
  }, []);
}

export default function Article() {
  const { slug } = useParams<{ slug: string }>();

  const { data: dbArticle, isLoading } = trpc.articles.getBySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: !!slug }
  );

  const { data: dbArticles } = trpc.articles.list.useQuery({ status: "published" });

  const article =
    dbArticle ??
    fallbackArticles.find((a) => a.slug === slug);

  const allArticles =
    dbArticles && dbArticles.length > 0
      ? dbArticles
      : fallbackArticles;

  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading && !article) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Navigation />
        <p className="doc-label">로딩 중...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <Navigation />
        <p className="doc-label">글을 찾을 수 없습니다</p>
        <Link href="/thinking" className="link-arrow" style={{ textDecoration: "none" }}>
          ← 브랜드 노트로
        </Link>
      </div>
    );
  }

  const publishedDate = (article as any).publishedDate ?? (article as any).date ?? "";
  const paragraphs = (article.content ?? "").split("\n\n").filter(Boolean);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-white)" }}>
      <Navigation />

      <div className="page-header">
        <div className="container">
          <div className="reveal" style={{ marginBottom: "2.5rem" }}>
            <Link href="/thinking" className="link-arrow" style={{ textDecoration: "none", fontSize: "0.75rem" }}>
              ← Thinking
            </Link>
          </div>

          <div style={{ maxWidth: "760px" }}>
            <div className="reveal" style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <span className="tag">{article.category}</span>
              {publishedDate && <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-300)" }}>{publishedDate}</span>}
              {article.readTime && <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-300)" }}>{article.readTime}</span>}
            </div>

            <h1 className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)", fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1.5rem" }}>
              {article.title}
            </h1>

            <p className="reveal" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "1.0625rem", color: "var(--color-gray-500)", lineHeight: 1.8 }}>
              {article.excerpt ?? ""}
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div style={{ borderTop: "1px solid var(--border-color)" }} />
      </div>

      <div style={{ padding: "4rem 0 var(--section-pad-y)" }}>
        <div className="container">
          <div style={{ maxWidth: "640px" }}>
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="reveal"
                style={{
                  fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
                  fontSize: "var(--text-body-lg)",
                  color: "var(--color-gray-500)",
                  lineHeight: 1.85,
                  marginBottom: "1.5rem",
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "var(--section-pad-y) 0", backgroundColor: "var(--color-paper)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          <p className="doc-label reveal" style={{ marginBottom: "2rem" }}>더 읽어보기</p>

          <div>
            {allArticles
              .filter((a) => a.slug !== article.slug)
              .slice(0, 3)
              .map((a) => (
                <Link
                  key={a.id}
                  href={`/thinking/${a.slug}`}
                  className="reveal"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1.5rem 0",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-300)", marginBottom: "0.3rem" }}>
                      {a.category}
                    </p>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-ink)" }}>
                      {a.title}
                    </h3>
                  </div>
                  <span style={{ color: "var(--color-gray-300)" }}>→</span>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}