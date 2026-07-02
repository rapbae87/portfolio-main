/*
 * Works.tsx — 전체 프로젝트 목록
 * 레이아웃: 전략 제안서형 테이블 — 역할·범위·결과 컬럼 중심
 * 모바일: 테이블 → 세로 카드
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { projects as fallbackProjects } from "@/lib/data";


function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// 실행 범위 분류
const scopeCategories = [
  "전체",
  "브랜드 전략",
  "상품기획",
  "D2C 구축",
  "콘텐츠 기획",
  "퍼포먼스 마케팅",
  "B2B 제안서",
  "글로벌 전략",
];

const capabilityRows = [
  { cap: "브랜드 전략", detail: "포지셔닝, 네이밍, 아이덴티티 시스템", projects: "전 프로젝트" },
  { cap: "상품기획", detail: "SKU 설계, 카테고리 확장, OEM 소싱", projects: "드림컴스, FEEJU, 더뉴리얼, 네이처리아, 등" },
  { cap: "D2C 커머스", detail: "NAVER, Coupang 자사몰 구축", projects: "드림컴스, FEEJU, 더뉴리얼, 네이처리아, 등 " },
  { cap: "콘텐츠 제작", detail: "상세페이지, 캠페인 크리에이티브, SNS", projects: "드림컴스, FEEJU, 더뉴리얼, 네이처리아, 등" },
  { cap: "퍼포먼스 마케팅", detail: "Meta, Naver, Kakao 광고 운영", projects: "드림컴스, FEEJU, 더뉴리얼, 네이처리아, 등" },
  { cap: "B2B 제안서", detail: "라이선싱, 파트너십, IR 문서 작성", projects: "Atlantis, Klosterfrau, 로보트태권브이, EMFLOW COMPANY" },
  { cap: "글로벌 전략", detail: "한국 시장 진입, 로컬라이제이션", projects: "Atlantis, Klosterfrau, FEEJU" },
];

export default function Works() {
  useReveal();
  const [filter, setFilter] = useState("전체");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { data: dbProjects, isLoading } = trpc.projects.list.useQuery({ status: "published" });

  const projects =
    dbProjects && dbProjects.length > 0
      ? dbProjects
      : fallbackProjects;

      const filtered =
  filter === "전체"
    ? projects
    : projects.filter((p) => {
        const scope = (p.scope as string[]) ?? [];
        const category = p.category ?? "";
        const tags = (p.tags as string[]) ?? [];

        if (filter === "글로벌 전략") {
          return (
            category.includes("글로벌") ||
            tags.some((t) => t.includes("글로벌")) ||
            scope.some(
              (s) =>
                s.includes("글로벌 전략") ||
                s.includes("시장 진입") ||
                s.includes("로컬라이제이션")
            )
          );
        }

        return (
          scope.some((s) => s.includes(filter) || filter.includes(s)) ||
          category.includes(filter) ||
          tags.some((t) => t.includes(filter) || filter.includes(t))
        );
      });

  const thStyle: React.CSSProperties = {
    fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
    fontSize: "0.625rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--color-gray-400)",
    padding: "0.65rem 0.75rem",
    textAlign: "left",
    borderBottom: "2px solid var(--color-ink)",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-white)" }}>
      <Navigation />

      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="page-header">
        <div className="container">
          <div className="doc-header-bar reveal" style={{ marginBottom: "clamp(1.25rem,3vw,2rem)" }}>
            <span>Selected Work</span>
            <span>{isLoading ? "로딩 중..." : `${projects.length}개 프로젝트`}</span>
          </div>
          {/* Mobile: stacked, Desktop: 2-col */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="md:grid-cols-[1fr_360px]">
            <div>
              <p className="doc-label reveal" style={{ marginBottom: "0.75rem" }}>Portfolio</p>
              <h1 className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "var(--text-h1)", fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-0.04em", lineHeight: 1.1, transitionDelay: "60ms" }}>
                Works
              </h1>
            </div>
            <p className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.9375rem", color: "var(--color-gray-400)", lineHeight: 1.8, transitionDelay: "120ms" }}>
              포트폴리오가 아닙니다.<br />
              브랜드를 처음부터 시장에 안착시킨 과정의 기록입니다.<br />
              전략부터 실행까지, 모든 결정의 이유와 함께.
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter Tabs ─────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--color-paper)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", overflowX: "auto", scrollbarWidth: "none", gap: 0 }}>
            {scopeCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: filter === cat ? "2px solid var(--color-ink)" : "2px solid transparent",
                  padding: "0.9rem 0.875rem",
                  cursor: "pointer",
                  fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
                  fontSize: "0.8125rem",
                  fontWeight: filter === cat ? 700 : 500,
                  color: filter === cat ? "var(--color-ink)" : "var(--color-gray-400)",
                  letterSpacing: "0.02em",
                  transition: "color 160ms ease, border-color 160ms ease",
                  whiteSpace: "nowrap",
                  marginBottom: "-1px",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Projects ─────────────────────────────────────────── */}
      <div style={{ paddingBottom: "var(--section-pad-y)" }}>
        <div className="container">

          {/* Desktop: table */}
          <div className="hidden md:block reveal" style={{ overflowX: "auto", marginTop: "0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: "36px" }}>#</th>
                  <th style={thStyle}>프로젝트</th>
                  <th style={thStyle}>역할</th>
                  <th style={thStyle}>실행 범위</th>
                  <th style={thStyle}>연도</th>
                  <th style={{ ...thStyle, width: "32px" }}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((project, i) => (
                  <tr
                    key={project.id}
                    style={{ borderBottom: "1px solid var(--border-color)", cursor: "pointer", transition: "background-color 160ms ease" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--color-gray-50)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                    onClick={() => window.location.href = `/works/${project.slug}`}
                  >
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-gray-300)", padding: "1.25rem 0.75rem", letterSpacing: "0.06em", verticalAlign: "top" }}>
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td style={{ padding: "1.25rem 0.75rem", verticalAlign: "top", minWidth: "180px" }}>
                      <Link href={`/works/${project.slug}`} style={{ textDecoration: "none" }}>
                        <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.3rem", letterSpacing: "-0.02em" }}>{project.title}</p>
                        <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: "var(--color-gray-400)", lineHeight: 1.5 }}>{project.category}</p>
                      </Link>
                    </td>
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-500)", padding: "1.25rem 0.75rem", verticalAlign: "top", maxWidth: "240px", lineHeight: 1.6 }}>
                      {project.role}
                    </td>
                    <td style={{ padding: "1.25rem 0.75rem", verticalAlign: "top" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                        {((project.scope as string[]) ?? []).slice(0, 3).map((s) => (
                          <span key={s} className="tag" style={{ fontSize: "0.625rem" }}>{s}</span>
                        ))}
                        {((project.scope as string[]) ?? []).length > 3 && (
                          <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.625rem", color: "var(--color-gray-400)" }}>+{((project.scope as string[]) ?? []).length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: "var(--color-gray-400)", padding: "1.25rem 0.75rem", verticalAlign: "top", whiteSpace: "nowrap" }}>
                      {project.year}
                    </td>
                    <td style={{ padding: "1.25rem 0.75rem", verticalAlign: "top", textAlign: "right" }}>
                      <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", color: "var(--color-gray-300)" }}>→</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: vertical cards */}
          <div className="md:hidden flex flex-col" style={{ paddingTop: "0.5rem" }}>
            {filtered.map((project, i) => (
              <Link key={project.id} href={`/works/${project.slug}`} style={{ textDecoration: "none" }}>
                <div style={{
                  borderTop: "1px solid var(--border-color)",
                  padding: "1.5rem 0",
                  cursor: "pointer",
                }}>
                  {/* Cover image */}
                  <div style={{ aspectRatio: "5/4", overflow: "hidden", marginBottom: "1rem" }}>
                    <img
                      src={project.coverImage ?? ""}
                      alt={project.title ?? ""}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  {/* Index + year */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-gray-300)", letterSpacing: "0.06em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>
                      {project.year}
                    </span>
                  </div>
                  {/* Title */}
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "1.0625rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.25rem", letterSpacing: "-0.02em" }}>
                    {project.title}
                  </p>
                  {/* Category */}
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: "var(--color-gray-400)", marginBottom: "0.5rem" }}>
                    {project.category}
                  </p>
                  {/* Role */}
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-500)", lineHeight: 1.65, marginBottom: "0.75rem" }}>
                    {project.role}
                  </p>
                  {/* Scope tags + arrow */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {((project.scope as string[]) ?? []).slice(0, 2).map((s) => (
                        <span key={s} className="tag" style={{ fontSize: "0.6rem" }}>{s}</span>
                      ))}
                      {((project.scope as string[]) ?? []).length > 2 && (
                        <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6rem", color: "var(--color-gray-400)" }}>+{((project.scope as string[]) ?? []).length - 2}</span>
                      )}
                    </div>
                    <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", color: "var(--color-ink)" }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: "4rem 0", textAlign: "center" }}>
              <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", color: "var(--color-gray-400)" }}>
                해당 카테고리의 프로젝트가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Capability Summary ──────────────────────────────── */}
      <section style={{ padding: "clamp(2.5rem,6vw,5rem) 0", borderTop: "1px solid var(--border-color)", backgroundColor: "var(--color-paper)" }}>
        <div className="container">
          <p className="doc-label reveal" style={{ marginBottom: "clamp(0.5rem,1.5vw,0.75rem)" }}>Capability Overview</p>
          <h2 className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "clamp(1.1rem,2vw,1.5rem)", fontWeight: 700, color: "var(--color-ink)", letterSpacing: "-0.03em", lineHeight: 1.3, marginBottom: "clamp(1.5rem,4vw,2.5rem)", transitionDelay: "60ms" }}>
            실행 가능한 역량의 범위
          </h2>

          {/* Desktop: table */}
          <div className="hidden md:block reveal" style={{ transitionDelay: "120ms", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid var(--border-color)" }}>
              <thead>
                <tr>
                  {["역량", "세부 내용", "적용 프로젝트"].map((h) => (
                    <th key={h} style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--color-gray-400)", padding: "0.6rem 0.75rem", textAlign: "left" as const, borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--color-gray-50)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {capabilityRows.map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-gray-50)" }}>
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-ink)", padding: "0.75rem 0.75rem", borderBottom: "1px solid var(--border-color)", whiteSpace: "nowrap" }}>{row.cap}</td>
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-500)", padding: "0.75rem 0.75rem", borderBottom: "1px solid var(--border-color)", lineHeight: 1.5 }}>{row.detail}</td>
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: "var(--color-gray-400)", padding: "0.75rem 0.75rem", borderBottom: "1px solid var(--border-color)", lineHeight: 1.5 }}>{row.projects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: vertical cards */}
          <div className="md:hidden flex flex-col reveal" style={{ border: "1px solid var(--border-color)", transitionDelay: "120ms" }}>
            {capabilityRows.map((row, i) => (
              <div key={i} style={{
                padding: "1rem 1.25rem",
                borderBottom: i < capabilityRows.length - 1 ? "1px solid var(--border-color)" : "none",
                backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-gray-50)",
              }}>
                <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.3rem" }}>{row.cap}</p>
                <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-500)", lineHeight: 1.5, marginBottom: "0.25rem" }}>{row.detail}</p>
                <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: "var(--color-gray-400)" }}>{row.projects}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
