/*
 * Home.tsx — Rapbae Brand Builder
 * 디자인 원칙: 브랜드 전략 제안서를 보는 느낌
 * 5초 안에 "이 사람은 전략부터 실행까지 수행하는 브랜드 빌더"를 전달
 * 모바일 반응형: 테이블 → 카드, 2열 → 1열, 여백 확보
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { projects } from "@/lib/data";

// Fallback 핵심 수치 — 이력서 기반 확인된 내용
const FALLBACK_STATS = [
  { num: "10년+", label: "업무 경력", sub: "브랜드 빌드, 온라인 마케팅 전반," },
  { num: "3.5배", label: "자사몰 매출 증가", sub: "효성에스피 재직 중" },
  { num: "3+", label: "해외 사업권 확보", sub: "Atlantis Strength, FEEJU, Klosterfrau 국내 사업 제안" },
  { num: "6개", label: "협업 프로젝트", sub: "브랜드·IP·IR·D2C 프로젝트" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
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
  }, []);
}

// 실행 범위 7단계 — 이력서 기반
const executionChain = [
  { step: "01", label: "브랜드 전략 및 신사업 기획", desc: "시장 분석 → 브랜드 컨셉 → 런칭 설계" },
  { step: "02", label: "온라인 커머스 운영", desc: "매출 접점 전체 선택 및 전환 Funnel 최적화" },
  { step: "03", label: "퍼포먼스 마케팅", desc: "네이버 · 구글 · 메타 3개 전채 단독 운영" },
  { step: "04", label: "콘텐츠 · 크리에이티브 디렉팅", desc: "광고 소재 · 콘텐츠 방향 · 인플루언서 운영" },
  { step: "05", label: "데이터 기반 성장 전략", desc: "GA4 · 광고 데이터 분석 → 매출 개선 → 의사결정 지원" },
  { step: "06", label: "글로벌 파트너십", desc: "해외 브랜드 라이선스 · OEM 소싱 · 협상" },
  { step: "07", label: "B2B 제안 · IR", desc: "사업제안서 · 투자자료 · 영문 제안서" },
];



// 협업 브랜드 — 자료에서 확인된 내용만 포함
const clientBrands = [
  "Atlantis Strength (Australia)",
  "Klosterfrau Healthcare Group (Germany)",
  "EMFLOW COMPANY",
  "효성에스피",
  "FEEJU",
  "드림컴스",
  "로보트 태권V IP",
];

const globalWork = [
  { brand: "Atlantis Strength", country: "🇨🇦 Canada", role: "라이선싱 전략 · 한국 GTM", type: "라이선싱 파트너십" },
  { brand: "Feeju", country: "🇬🇷 Greece", role: "브랜드 런칭 · D2C · 한국 시장 구축", type: "독점 수입 · 브랜드 운영" },
  { brand: "Klosterfrau", country: "🇩🇪 Germany", role: "한국 시장 진입 전략", type: "유통 파트너십" },
  ];

const ctaItems = [
  { situation: "브랜드를 처음 만드는 경우", action: "전략 수립부터 함께합니다" },
  { situation: "기존 브랜드를 리뉴얼하는 경우", action: "포지셔닝 재정의부터 시작합니다" },
  { situation: "글로벌 시장에 진입하는 경우", action: "현지화 전략과 파트너십을 설계합니다" },
  { situation: "D2C 커머스를 구축하는 경우", action: "자사몰부터 마케팅까지 실행합니다" },
];

export default function Home() {
  useReveal();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { data: allProjects } = trpc.projects.list.useQuery({ status: "published" });

  const projectList =
    allProjects && allProjects.length > 0
      ? allProjects
      : projects;

  const heroSlides = projectList;
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay || heroSlides.length === 0) return;
  
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
  
    return () => clearInterval(timer);
  }, [heroSlides.length, autoPlay]);
  
  const moveHeroSlide = (direction: number) => {
    setAutoPlay(false);
  
    setHeroSlideIndex((prev) =>
      (prev + direction + heroSlides.length) % heroSlides.length
    );
  
    setTimeout(() => {
      setAutoPlay(true);
    }, 5000);
  };

  const activeHeroProject = heroSlides[heroSlideIndex];

  const featuredProjects =
    projectList.filter((p) => p.featured).slice(0, 3);

  const { data: siteSettings } = trpc.settings.getSiteSettings.useQuery();

  // DB keyMetrics가 있으면 사용, 없으면 fallback
  const dbMetrics = (siteSettings?.keyMetrics as Array<{ label: string; value: string; note?: string }> | null) ?? null;
  const stats = dbMetrics && dbMetrics.length > 0
    ? dbMetrics.map((m) => ({ num: m.value, label: m.label, sub: m.note ?? "" }))
    : FALLBACK_STATS;

  // Hero 텍스트 — DB에 저장된 값이 있으면 사용, 없으면 fallback
  const heroTitle = siteSettings?.heroTitle || "브랜드 전략부터\n커머스 실행까지,\n하나의 흐름으로.";
  const heroSubtitle = siteSettings?.heroSubtitle || "브랜드 전략 수립부터 상품기획, 패키지, 콘텐츠, 자사몰 구축, 퍼포먼스 마케팅, B2B 제안까지 —\n아이디어가 실제 매출이 되는 전 과정을 직접 설계하고 실행합니다.";
  const heroCtaPrimary = siteSettings?.heroCtaPrimary || "프로젝트 보기 →";
  const heroCtaSecondary = siteSettings?.heroCtaSecondary || "소개";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-white)" }}>
      <Navigation />

      {/* ═══════════════════════════════════════════════════════
          HERO — 역할 정의 + 핵심 수치
      ═══════════════════════════════════════════════════════ */}
      <section style={{ paddingTop: "calc(var(--header-height) + clamp(2rem,5vw,4rem))", paddingBottom: "clamp(2.5rem,6vw,4.5rem)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">

          {/* Document header bar */}
          <div className="doc-header-bar reveal" style={{ marginBottom: "clamp(1.5rem,4vw,3rem)" }}>
            <span>Brand Builder — Seoul</span>
            <span>배승현 · BAE SEUNGHYUN</span>
          </div>

          {/* Hero text + rolling project box */}
          <div
              className="hero-main-grid"
              style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
              gap: "2rem",
              alignItems: "center",
              marginBottom: "clamp(2rem,5vw,3.5rem)",
            }}
          >
            <div>
              <p className="doc-label reveal" style={{ marginBottom: "clamp(0.75rem,2vw,1.25rem)" }}>
                Brand Strategist · Product Planner · Commerce Builder
              </p>
              <h1 className="reveal" style={{
                fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
                fontSize: "clamp(2.15rem,10vw,4.2rem)",
                wordBreak: "keep-all",
                fontWeight: 800,
                color: "var(--color-ink)",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                marginBottom: "clamp(1rem,3vw,2rem)",
                transitionDelay: "60ms",
                whiteSpace: "pre-line",
              }}>
                {heroTitle}
              </h1>
              <p className="reveal" style={{
                fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
                fontSize: "clamp(0.875rem,1.5vw,1rem)",
                color: "var(--color-gray-500)",
                lineHeight: 1.85,
                maxWidth: "540px",
                marginBottom: "clamp(1.5rem,4vw,2.5rem)",
                transitionDelay: "120ms",
                whiteSpace: "pre-line",
              }}>
                {heroSubtitle}
              </p>
              <div className="reveal" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", transitionDelay: "180ms" }}>
                <Link href="/works" className="btn-primary" style={{ textDecoration: "none" }}>{heroCtaPrimary}</Link>
                <Link href="/about" className="btn-outline" style={{ textDecoration: "none" }}>{heroCtaSecondary}</Link>
              </div>
            </div>

            {activeHeroProject && (
            <div>
            <Link href={`/works/${activeHeroProject.slug}`} style={{ textDecoration: "none" }}>
           <div
        className="reveal"
        key={activeHeroProject.slug}
        style={{
          width: "100%",
          aspectRatio: "5 / 4",
          border: "1px solid var(--border-color)",
          overflow: "hidden",
          backgroundColor: "var(--color-paper)",
          animation: "slideInFromRight 520ms ease both",
        }}
      >
        <img
          src={activeHeroProject.coverImage ?? ""}
          alt={activeHeroProject.title ?? ""}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </Link>

    <div style={{ padding: "1rem 1.25rem", border: "1px solid var(--border-color)", borderTop: "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
        <div>
          <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.2rem" }}>
            {activeHeroProject.title}
          </p>
          <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: "var(--color-gray-400)" }}>
            {activeHeroProject.category}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      moveHeroSlide(-1);
    }}
    style={{
      border: "1px solid var(--border-color)",
      background: "#fff",
      cursor: "pointer",
      width: "28px",
      height: "28px",
    }}
  >
    ←
  </button>

  <p
    style={{
      fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
      fontSize: "0.75rem",
      color: "var(--color-gray-400)",
      whiteSpace: "nowrap",
    }}
  >
    {String(heroSlideIndex + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
  </p>

  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      moveHeroSlide(1);
    }}
    style={{
      border: "1px solid var(--border-color)",
      background: "#fff",
      cursor: "pointer",
      width: "28px",
      height: "28px",
    }}
  >
    →
  </button>
</div>
      </div>
    </div>
  </div>
)}
          </div>

          {/* Key Metrics — mobile: 2x2 grid, desktop: 4-col row */}
          <div className="reveal" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0",
            border: "1px solid var(--border-color)",
            transitionDelay: "240ms",
          }}>
            <div style={{
              padding: "0.4rem 0.6rem",
              backgroundColor: "var(--color-black)",
              borderBottom: "1px solid var(--border-color)",
              gridColumn: "1 / -1",
            }}>
              <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888" }}>
                Key Metrics
              </p>
            </div>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: "clamp(0.75rem,2vw,1rem) clamp(0.75rem,2vw,1.25rem)",
                borderBottom: i < 2 ? "1px solid var(--border-color)" : "none",
                borderRight: i % 2 === 0 ? "1px solid var(--border-color)" : "none",
              }}>
                <p style={{
                  fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
                  fontSize: "clamp(1.1rem,2.5vw,1.75rem)",
                  fontWeight: 800,
                  color: "var(--color-ink)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: "0.3rem",
                }}>
                  {s.num}
                </p>
                <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-ink)", marginBottom: "0.1rem" }}>{s.label}</p>
                <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          EXECUTION SYSTEM — 7단계 실행 범위
          모바일: 테이블 → 세로 카드 리스트
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(2.5rem,6vw,5rem) 0", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--color-paper)" }}>
        <div className="container">
          <p className="doc-label reveal" style={{ marginBottom: "clamp(0.5rem,1.5vw,0.75rem)" }}>Execution System</p>
          <h2 className="reveal" style={{
            fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
            fontSize: "clamp(1.2rem,2.5vw,1.75rem)",
            fontWeight: 700,
            color: "var(--color-ink)",
            letterSpacing: "-0.03em",
            lineHeight: 1.3,
            marginBottom: "clamp(0.5rem,1.5vw,1rem)",
            transitionDelay: "60ms",
          }}>
            전략에서 커머스까지 7단계 실행
          </h2>
          <p className="reveal" style={{
            fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
            fontSize: "0.875rem",
            color: "var(--color-gray-400)",
            marginBottom: "clamp(1.5rem,4vw,2.5rem)",
            lineHeight: 1.7,
            transitionDelay: "120ms",
          }}>
            단일 직무가 아닌 통합 가치사슬을 직접 수행합니다.
          </p>

          {/* Desktop: table */}
          <div className="hidden md:block reveal" style={{ transitionDelay: "120ms", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid var(--border-color)" }}>
              <thead>
                <tr>
                  {["Step", "역할", "실행 범위"].map((h) => (
                    <th key={h} style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.6rem 1rem", textAlign: "left", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--color-black)", color: "#666" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {executionChain.map((item, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-gray-50)" }}>
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-gray-300)", padding: "0.85rem 1rem", borderBottom: "1px solid var(--border-color)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{item.step}</td>
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-ink)", padding: "0.85rem 1rem", borderBottom: "1px solid var(--border-color)", whiteSpace: "nowrap" }}>{item.label}</td>
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-500)", padding: "0.85rem 1rem", borderBottom: "1px solid var(--border-color)", lineHeight: 1.6 }}>{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: vertical card list */}
          <div className="md:hidden flex flex-col reveal" style={{ border: "1px solid var(--border-color)", transitionDelay: "120ms" }}>
            {executionChain.map((item, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "1rem",
                padding: "1rem 1.25rem",
                borderBottom: i < executionChain.length - 1 ? "1px solid var(--border-color)" : "none",
                backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-gray-50)",
                alignItems: "flex-start",
              }}>
                <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-gray-300)", letterSpacing: "0.06em", minWidth: "28px", paddingTop: "0.15rem" }}>{item.step}</span>
                <div>
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.25rem" }}>{item.label}</p>
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-500)", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURED PROJECTS — 프로젝트 목록
          모바일: 테이블 → 세로 카드
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(2.5rem,6vw,5rem) 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          {/* Section header */}
          <div className="section-header reveal" style={{ marginBottom: "clamp(1.25rem,3vw,2rem)" }}>
            <div>
              <p className="doc-label" style={{ marginBottom: "0.4rem" }}>Selected Work</p>
              <h2 style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "clamp(1.2rem,2vw,1.6rem)", fontWeight: 700, color: "var(--color-ink)", letterSpacing: "-0.03em" }}>
                주요 프로젝트
              </h2>
            </div>
            <Link href="/works" className="link-arrow" style={{ textDecoration: "none" }}>전체 보기 →</Link>
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["#", "프로젝트", "역할", "실행 범위", "연도"].map((h) => (
                    <th key={h} style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gray-400)", padding: "0.6rem 0.75rem", textAlign: "left", borderBottom: "2px solid var(--color-ink)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featuredProjects.map((project, i) => (
                  <tr key={project.id}
                    style={{ borderBottom: "1px solid var(--border-color)", cursor: "pointer", transition: "background-color 160ms ease" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--color-gray-50)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                    onClick={() => window.location.href = `/works/${project.slug}`}
                  >
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-gray-300)", padding: "1.1rem 0.75rem", letterSpacing: "0.06em", width: "36px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td style={{ padding: "1.1rem 0.75rem", minWidth: "160px" }}>
                      <Link href={`/works/${project.slug}`} style={{ textDecoration: "none" }}>
                        <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.2rem" }}>{project.title}</p>
                        <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: "var(--color-gray-400)" }}>{project.category}</p>
                      </Link>
                    </td>
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-500)", padding: "1.1rem 0.75rem", maxWidth: "220px", lineHeight: 1.5 }}>
                      {project.role}
                    </td>
                    <td style={{ padding: "1.1rem 0.75rem", maxWidth: "200px" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                        {((project.scope as string[]) ?? []).slice(0, 3).map((s) => (
                          <span key={s} className="tag" style={{ fontSize: "0.6rem" }}>{s}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-400)", padding: "1.1rem 0.75rem", whiteSpace: "nowrap" }}>
                      {project.year}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: vertical cards */}
          <div className="md:hidden flex flex-col">
            {featuredProjects.map((project, i) => (
              <Link key={project.id} href={`/works/${project.slug}`} style={{ textDecoration: "none" }}>
                <div style={{
                  borderTop: "1px solid var(--border-color)",
                  padding: "1.25rem 0",
                  cursor: "pointer",
                }}>
                  {/* Image */}
                  <div style={{ aspectRatio: "16/9", overflow: "hidden", marginBottom: "0.875rem" }}>
                    <img
                      src={project.coverImage ?? ""}
                      alt={project.title ?? ""}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  {/* Meta */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-gray-300)", letterSpacing: "0.06em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>
                      {project.year}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "1rem", fontWeight: 700, color: "var(--color-ink)", marginBottom: "0.25rem", letterSpacing: "-0.02em" }}>
                    {project.title}
                  </p>
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: "var(--color-gray-400)", marginBottom: "0.5rem" }}>
                    {project.category}
                  </p>
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-500)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                    {project.role}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {((project.scope as string[]) ?? []).slice(0, 2).map((s) => (
                        <span key={s} className="tag" style={{ fontSize: "0.6rem" }}>{s}</span>
                      ))}
                    </div>
                    <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-ink)" }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          GLOBAL PROJECTS — 글로벌 협업 하이라이트
          모바일: 테이블 → 세로 카드
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(2.5rem,6vw,5rem) 0", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--color-black)" }}>
        <div className="container">
          <p className="doc-label reveal" style={{ color: "#555", marginBottom: "clamp(0.5rem,1.5vw,0.75rem)" }}>Global Work</p>
          <h2 className="reveal" style={{
            fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
            fontSize: "clamp(1.2rem,2.5vw,1.75rem)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.3,
            marginBottom: "clamp(0.5rem,1.5vw,1rem)",
            transitionDelay: "60ms",
          }}>
            한국을 넘어 글로벌 시장으로
          </h2>
          <p className="reveal" style={{
            fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
            fontSize: "0.875rem",
            color: "#666",
            marginBottom: "clamp(1.5rem,4vw,2.5rem)",
            lineHeight: 1.7,
            transitionDelay: "120ms",
          }}>
            호주·독일·동남아 브랜드의 한국 시장 진입 전략 및 파트너십 제안을 수행했습니다.
          </p>

          {/* Desktop: table */}
          <div className="hidden md:block reveal" style={{ overflowX: "auto", transitionDelay: "120ms" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["브랜드", "국가", "역할", "유형"].map((h) => (
                    <th key={h} style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#444", padding: "0.6rem 0.75rem", textAlign: "left", borderBottom: "1px solid #222" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {globalWork.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "#fff", padding: "0.85rem 0.75rem" }}>{row.brand}</td>
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "#666", padding: "0.85rem 0.75rem" }}>{row.country}</td>
                    <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "#888", padding: "0.85rem 0.75rem", lineHeight: 1.5 }}>{row.role}</td>
                    <td style={{ padding: "0.85rem 0.75rem" }}>
                      <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.08em", color: "#555", border: "1px solid #333", padding: "0.2rem 0.5rem" }}>{row.type}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: vertical cards */}
          <div className="md:hidden flex flex-col reveal" style={{ transitionDelay: "120ms" }}>
            {globalWork.map((row, i) => (
              <div key={i} style={{
                borderTop: "1px solid #222",
                padding: "1.25rem 0",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.9375rem", fontWeight: 700, color: "#fff" }}>{row.brand}</p>
                  <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "#666" }}>{row.country}</span>
                </div>
                <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "#888", lineHeight: 1.6, marginBottom: "0.5rem" }}>{row.role}</p>
                <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.08em", color: "#555", border: "1px solid #333", padding: "0.2rem 0.5rem" }}>{row.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CLIENT BRANDS — 협업 브랜드
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(2rem,5vw,3rem) 0", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--color-paper)" }}>
        <div className="container">
          <p className="doc-label reveal" style={{ marginBottom: "clamp(1rem,2.5vw,1.5rem)" }}>Collaborated With</p>
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", transitionDelay: "60ms" }}>
            {clientBrands.map((brand) => (
              <span key={brand} style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-gray-500)", border: "1px solid var(--border-color)", padding: "0.35rem 0.85rem", letterSpacing: "0.02em" }}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA — 상황별 제안
          모바일: 2열 → 1열 스택
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(2.5rem,6vw,5rem) 0" }}>
        <div className="container">
          {/* Headline */}
          <p className="doc-label reveal" style={{ marginBottom: "clamp(0.75rem,2vw,1.25rem)" }}>Let's Work Together</p>
          <h2 className="reveal" style={{
            fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
            fontSize: "clamp(1.6rem,4vw,3rem)",
            fontWeight: 800,
            color: "var(--color-ink)",
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
            marginBottom: "clamp(1.5rem,4vw,2.5rem)",
            transitionDelay: "60ms",
          }}>
            브랜드를 만들고 싶다면,<br />
            아이디어가 있다면,<br />
            시장에 나가고 싶다면.
          </h2>

          {/* CTA items */}
          <div className="reveal" style={{ transitionDelay: "120ms", marginBottom: "clamp(1.25rem,3vw,2rem)" }}>
            <div style={{ border: "1px solid var(--border-color)" }}>
              {ctaItems.map((item, i) => (
                <div key={i} style={{ padding: "clamp(0.875rem,2vw,1rem) clamp(1rem,2.5vw,1.25rem)", borderBottom: i < ctaItems.length - 1 ? "1px solid var(--border-color)" : "none" }}>
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-gray-400)", letterSpacing: "0.04em", marginBottom: "0.25rem" }}>{item.situation}</p>
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-ink)" }}>→ {item.action}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: "200ms" }}>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: "none" }}>대화 시작하기 →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

