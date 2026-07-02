/*
 * CaseStudy.tsx — 전략 제안서형 케이스 스터디
 * 구조: 문서 커버 → 컨텍스트 → 과제 → 전략 → 실행 표 → 결과 표 → 회고
 * 모바일: 테이블 → 세로 카드, 2열 → 1열
 */

import { useEffect } from "react";
import { Link, useParams } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { projects } from "@/lib/data";

function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");

    els.forEach((el) => {
      el.classList.add("visible");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, deps);
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();

  const { data: dbProject, isLoading } =
    trpc.projects.getBySlug.useQuery(
      { slug: slug ?? "" },
      { enabled: !!slug }
    );

  const { data: dbProjects } =
    trpc.projects.list.useQuery({ status: "published" });

  const project =
    dbProject ??
    projects.find((p) => p.slug === slug);

  const allProjects =
    dbProjects && dbProjects.length > 0
      ? dbProjects
      : projects;

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);

  const nextProject =
    currentIndex >= 0 && allProjects.length > 1
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : null;

  useReveal([slug, project]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading && !project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Navigation />
        <p className="doc-label">로딩 중...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <Navigation />
        <p className="doc-label">프로젝트를 찾을 수 없습니다</p>
        <Link href="/works" className="link-arrow" style={{ textDecoration: "none" }}>← Works로 돌아가기</Link>
      </div>
    );
  }

  const S = {
    sectionWrap: (bg?: string): React.CSSProperties => ({
      padding: "clamp(2rem,5vw,4rem) 0",
      borderBottom: "1px solid var(--border-color)",
      backgroundColor: bg || "var(--color-white)",
    }),
    sectionGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "1.5rem",
    } as React.CSSProperties,
    sectionTitle: {
      fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
      fontSize: "0.875rem",
      fontWeight: 700,
      color: "var(--color-ink)",
    },
    body: {
      fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
      fontSize: "var(--text-body-lg)",
      color: "var(--color-gray-500)",
      lineHeight: 1.85,
    } as React.CSSProperties,
    th: {
      fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
      fontSize: "0.6875rem",
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
      color: "var(--color-gray-400)",
      padding: "0.6rem 1rem",
      textAlign: "left" as const,
      borderBottom: "1px solid var(--border-color)",
      backgroundColor: "var(--color-gray-50)",
    },
    td: {
      fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
      fontSize: "0.875rem",
      color: "var(--color-ink)",
      padding: "0.85rem 1rem",
      borderBottom: "1px solid var(--border-color)",
      verticalAlign: "top" as const,
      lineHeight: 1.65,
    },
    tdMuted: {
      fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
      fontSize: "0.8125rem",
      color: "var(--color-gray-500)",
      padding: "0.85rem 1rem",
      borderBottom: "1px solid var(--border-color)",
      verticalAlign: "top" as const,
      lineHeight: 1.65,
    },
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-white)" }}>
      <Navigation />

      {/* ── Document Cover ─────────────────────────────────── */}
      <div style={{ paddingTop: "calc(var(--header-height) + clamp(2rem,4vw,3.5rem))", paddingBottom: "clamp(1.5rem,4vw,3rem)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          {/* Doc header bar */}
          <div className="doc-header-bar reveal" style={{ marginBottom: "clamp(1.25rem,3vw,2.5rem)" }}>
            <span>Case Study</span>
            <span>{project.category} — {project.year}</span>
          </div>

          {/* Breadcrumb */}
          <div className="reveal" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "clamp(1rem,3vw,2rem)" }}>
            <Link href="/works" className="link-arrow" style={{ textDecoration: "none", fontSize: "0.75rem" }}>← Works</Link>
            <span style={{ color: "var(--color-gray-300)", fontSize: "0.75rem" }}>/</span>
            <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: "var(--color-gray-400)" }}>{project.title}</span>
          </div>

          {/* Title + Spec grid — Mobile: stacked, Desktop: 2-col */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(1.5rem,4vw,3rem)", alignItems: "start" }} className="md:grid-cols-[1fr_300px]">
            <div>
              <h1 className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "clamp(1.8rem,5.5vw,4.5rem)", fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "clamp(0.75rem,2vw,1.25rem)", transitionDelay: "60ms" }}>
                {project.title}
              </h1>
              <p className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "clamp(0.9375rem,1.5vw,1.0625rem)", color: "var(--color-gray-500)", lineHeight: 1.75, transitionDelay: "120ms" }}>
                {project.description}
              </p>
            </div>

            {/* Project spec box */}
            <div className="reveal" style={{ border: "1px solid var(--border-color)", transitionDelay: "180ms" }}>
              {[
                { label: "클라이언트", value: project.client },
                { label: "역할", value: project.role },
                { label: "기간", value: project.year },
                { label: "분야", value: project.category },
              ].map((row) => (
                <div key={row.label} style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: "0.5rem", padding: "0.7rem 1rem", borderBottom: "1px solid var(--border-color)" }}>
                  <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-gray-400)", letterSpacing: "0.04em", paddingTop: "0.1rem" }}>{row.label}</span>
                  <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-ink)", lineHeight: 1.5 }}>{row.value}</span>
                </div>
              ))}
              <div style={{ padding: "0.75rem 1rem", display: "flex", flexWrap: "wrap" as const, gap: "0.4rem" }}>
                {((project.scope as string[]) ?? []).map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cover Image ─────────────────────────────────────── */}
      {project.coverImage && (
  <div style={{ backgroundColor: "var(--color-gray-50)", borderBottom: "1px solid var(--border-color)" }}>
    <div
      className="container"
      style={{
        padding: "clamp(2rem,4vw,3rem) var(--container-pad)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="reveal"
        style={{
          width: "min(100%, 720px)",
          aspectRatio: "5 / 4",
          border: "1px solid var(--border-color)",
          overflow: "hidden",
          backgroundColor: "var(--color-paper)",
        }}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </div>
  </div>
)}

      {/* ── 01 Context ──────────────────────────────────────── */}
      <section style={S.sectionWrap("var(--color-paper)")}>
        <div className="container">
          <div style={S.sectionGrid} className="md:grid-cols-[200px_1fr]">
            <div>
              <p className="section-num reveal">01</p>
              <p className="reveal" style={{ ...S.sectionTitle, transitionDelay: "60ms" }}>시장 컨텍스트</p>
            </div>
            <p className="reveal" style={S.body}>{project.context}</p>
          </div>
        </div>
      </section>

      {/* ── 02 Challenge ────────────────────────────────────── */}
      <section style={S.sectionWrap()}>
        <div className="container">
          <div style={S.sectionGrid} className="md:grid-cols-[200px_1fr]">
            <div>
              <p className="section-num reveal">02</p>
              <p className="reveal" style={{ ...S.sectionTitle, transitionDelay: "60ms" }}>핵심 과제</p>
            </div>
            <p className="reveal" style={S.body}>{project.challenge}</p>
          </div>
        </div>
      </section>

      {/* ── 03 Approach ─────────────────────────────────────── */}
      <section style={S.sectionWrap("var(--color-black)")}>
        <div className="container">
          <div style={S.sectionGrid} className="md:grid-cols-[200px_1fr]">
            <div>
              <p className="section-num reveal" style={{ color: "#444" }}>03</p>
              <p className="reveal" style={{ ...S.sectionTitle, color: "#888", transitionDelay: "60ms" }}>전략적 접근</p>
            </div>
            <p className="reveal" style={{ ...S.body, color: "#ccc" }}>{project.approach}</p>
          </div>
        </div>
      </section>

      {/* ── 04 Execution Table ──────────────────────────────── */}
      <section style={S.sectionWrap("var(--color-paper)")}>
        <div className="container">
          <div style={{ marginBottom: "clamp(1rem,3vw,2rem)" }}>
            <p className="section-num reveal">04</p>
            <p className="reveal" style={{ ...S.sectionTitle, transitionDelay: "60ms" }}>실행 단계</p>
          </div>
          {/* Desktop: table */}
          <div className="hidden md:block reveal" style={{ overflowX: "auto" as const, transitionDelay: "120ms" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" as const, border: "1px solid var(--border-color)" }}>
              <thead>
                <tr>
                  <th style={S.th}>단계</th>
                  <th style={S.th}>실행 내용</th>
                  <th style={S.th}>세부 사항</th>
                </tr>
              </thead>
              <tbody>
                {((project.execution as Array<{phase:string;action:string;detail:string}>) ?? []).map((item, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-gray-50)" }}>
                    <td style={{ ...S.td, fontWeight: 600, whiteSpace: "nowrap" as const, width: "120px" }}>{item.phase}</td>
                    <td style={S.td}>{item.action}</td>
                    <td style={S.tdMuted}>{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile: vertical cards */}
          <div className="md:hidden flex flex-col reveal" style={{ border: "1px solid var(--border-color)", transitionDelay: "120ms" }}>
            {((project.execution as Array<{phase:string;action:string;detail:string}>) ?? []).map((item, i) => (
              <div key={i} style={{
                padding: "1.25rem",
                borderBottom: i < ((project.execution as Array<unknown>) ?? []).length - 1 ? "1px solid var(--border-color)" : "none",
                backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-gray-50)",
              }}>
                <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--color-gray-400)", marginBottom: "0.35rem" }}>{item.phase}</p>
                <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-ink)", marginBottom: "0.4rem", lineHeight: 1.5 }}>{item.action}</p>
                <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-500)", lineHeight: 1.65 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 Results Table ────────────────────────────────── */}
      <section style={S.sectionWrap()}>
        <div className="container">
          <div style={{ marginBottom: "clamp(1rem,3vw,2rem)" }}>
            <p className="section-num reveal">05</p>
            <p className="reveal" style={{ ...S.sectionTitle, transitionDelay: "60ms" }}>주요 성과</p>
          </div>
          {/* Desktop: table */}
          <div className="hidden md:block reveal" style={{ overflowX: "auto" as const, transitionDelay: "120ms" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" as const, border: "1px solid var(--border-color)" }}>
              <thead>
                <tr>
                  <th style={S.th}>지표</th>
                  <th style={S.th}>결과</th>
                  <th style={S.th}>비고</th>
                </tr>
              </thead>
              <tbody>
                {((project.results as Array<{metric:string;value:string;note?:string}>) ?? []).map((item, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-gray-50)" }}>
                    <td style={{ ...S.td, fontWeight: 600, width: "160px" }}>{item.metric}</td>
                    <td style={{ ...S.td, fontWeight: 700, color: "var(--color-ink)" }}>{item.value}</td>
                    <td style={S.tdMuted}>{item.note || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile: vertical cards */}
          <div className="md:hidden flex flex-col reveal" style={{ border: "1px solid var(--border-color)", transitionDelay: "120ms" }}>
            {((project.results as Array<{metric:string;value:string;note?:string}>) ?? []).map((item, i) => (
              <div key={i} style={{
                padding: "1.25rem",
                borderBottom: i < ((project.results as Array<unknown>) ?? []).length - 1 ? "1px solid var(--border-color)" : "none",
                backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-gray-50)",
              }}>
                <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-gray-400)", marginBottom: "0.3rem" }}>{item.metric}</p>
                <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "1.125rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.25rem", letterSpacing: "-0.01em" }}>{item.value}</p>
                {item.note && <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-500)", lineHeight: 1.5 }}>{item.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 Image Gallery (if images exist) ─────────────── */}
      {project.images && project.images.length > 0 && (
  <section style={S.sectionWrap()}>
    <div className="container">
      <div style={{ marginBottom: "clamp(1rem,3vw,2rem)" }}>
        <p className="section-num reveal">06</p>
        <p className="reveal" style={{ ...S.sectionTitle, transitionDelay: "60ms" }}>자료 이미지</p>
      </div>

      <div
        className="reveal"
        style={{
          border: "1px solid var(--border-color)",
          backgroundColor: "var(--color-paper)",
          overflow: "hidden",
        }}
      >
        <div
          id="case-study-gallery"
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
          }}
        >
          {project.images.map((src, i) => (
            <div
              key={i}
              style={{
                flex: "0 0 100%",
                scrollSnapAlign: "start",
                aspectRatio: "16 / 9",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={src}
                alt={`${project.title} 자료 이미지 ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.85rem 1rem",
            borderTop: "1px solid var(--border-color)",
          }}
        >
          <button
            onClick={() => {
              const el = document.getElementById("case-study-gallery");
              if (el) el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
            }}
            style={{
              width: "32px",
              height: "32px",
              border: "1px solid var(--border-color)",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            ←
          </button>

          <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>
            좌우로 넘겨보기
          </p>

          <button
            onClick={() => {
              const el = document.getElementById("case-study-gallery");
              if (el) el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
            }}
            style={{
              width: "32px",
              height: "32px",
              border: "1px solid var(--border-color)",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  </section>
)}

      {/* ── 07 Reflection ───────────────────────────────────── */}
      <section style={S.sectionWrap("var(--color-paper)")}>
        <div className="container">
          <div style={S.sectionGrid} className="md:grid-cols-[200px_1fr]">
            <div>
              <p className="section-num reveal">07</p>
              <p className="reveal" style={{ ...S.sectionTitle, transitionDelay: "60ms" }}>인사이트</p>
            </div>
            <blockquote className="reveal" style={{ borderLeft: "3px solid var(--color-ink)", paddingLeft: "clamp(1rem,3vw,1.5rem)", margin: 0 }}>
              <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "clamp(0.9375rem,1.5vw,1.0625rem)", fontWeight: 500, color: "var(--color-ink)", lineHeight: 1.8 }}>
                {project.reflection}
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Next Project ────────────────────────────────────── */}
      <section style={{ padding: "clamp(2rem,5vw,4rem) 0" }}>
        <div className="container">
          <p className="doc-label reveal" style={{ marginBottom: "clamp(1rem,2.5vw,1.5rem)" }}>다음 케이스 스터디</p>
          {nextProject && (
            <Link href={`/works/${nextProject.slug}`} className="reveal" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "clamp(1.25rem,3vw,2rem) 0", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", transitionDelay: "60ms", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: "var(--color-gray-400)", marginBottom: "0.4rem" }}>
                  {nextProject.category} — {nextProject.year}
                </p>
                <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "clamp(1.2rem,3vw,2.2rem)", fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                  {nextProject.title}
                </p>
              </div>
              <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "1.5rem", color: "var(--color-gray-300)", flexShrink: 0 }}>→</span>
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
