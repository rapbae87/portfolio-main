/*
 * About.tsx — 배승현 소개
 * 레이아웃: 커리어 타임라인 + 역량 표 + 브랜드 철학
 * 모바일: 테이블 → 세로 카드, 2열 → 1열
 */

import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

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

// Fallback 커리어 타임라인 — 이력서(2026.04.28) 기반
const FALLBACK_CAREER = [
  {
    period: "2024.03 – 현재",
    company: "효성에스피",
    role: "온라인 마케팅 매니저",
    detail: "Klosterfrau(독일) 글로벌 파트너십 제안. 로보트 태권V IP 사업화 제안. FEEJU 마케팅 전략. 브랜드 전략 및 신사업 기획, 온라인 종합 마케팅 총괄, 콘텐츠·크리에이티브 디렉팅, 커머스 운영 및 데이터 기반 매출 관리, 파트너십 및 대외 협업. 자사몰 매출 3.5배 증가 및 운영구조 안정화. ",
  },
  {
    period: "2021.11 – 2024.02",
    company: "티엔알 (TNR)",
    role: "1인 창업",
    detail: "브랜드 기획 및 운영, 자사몰 관리, SNS·인플루언서 마케팅, 디자인·콘텐츠 제작, 퍼포먼스 마케팅, 전시 참가. 더뉴리얼 쏘팔메토, 네이처리아 글루타치온 등 브랜드 운영.",
  },
  {
    period: "2020.06 – 2021.10",
    company: "베아트리스넷",
    role: "마케팅 과장 지점장",
    detail: "온라인 마케팅 및 브랜드 전략 기획, SEO/SEM, 콘텐츠 제작, 광고 퍼포먼스 모니터링, 영업 지원 및 KPI 관리.",
  },
  {
    period: "2019.09 – 2020.06",
    company: "시큐아이파킹코리아",
    role: "마케팅 과장 팀장",
    detail: "전시 관련 프로모션, 오프라인 마케팅, 마케팅 제작물, SNS 관리, 홈페이지·이벤트 배너 기획.",
  },
  {
    period: "2014.07 – 2018.12",
    company: "윌슨파킹코리아",
    role: "마케팅 대리 팀원",
    detail: "프로모션, 전시, 오프라인 마케팅, 마케팅 제작물, SNS 관리, 홈페이지·이벤트 배너 기획.",
  },
];

// 사이드 프로젝트
const sideProjects = [
  {
    period: "2025",
    project: "EMFLOW COMPANY 협업",
    detail: "Dreamcomes 브랜드 기획·운영, Atlantis Strength(캐나다) 영문 제안서 작성 기반 국내 사업권 확보 및 런칭 기획, 투자 유치 IR 자료 제작",
  },
];

// Fallback 학력 · 자격
const FALLBACK_EDU_CERTS = [
  { type: "학력", content: "경북대학교 식품영양학과", note: "졸업" },
  { type: "자격증", content: "1종 보통 운전면허", note: "취득" },
  { type: "자격증", content: "컴퓨터활용능력 2급", note: "취득" },
  { type: "자격증", content: "정보처리기능사", note: "취득" },
];

// Fallback 역량 정의 — 이력서 기반
const FALLBACK_CAPABILITIES = [
  { area: "브랜드 전략 및 신사업 기획", level: "핵심", detail: "유럽·미국 브랜드와 라이선스 협의 진행, 신규 브랜드 기획(기능성 식품·스포츠 IP·라이프스타일 등), 시장 분석 → 제품 컨셉화 → 패키지 개발 → 런칭까지 End-to-End" },
  { area: "온라인 커머스 운영", level: "핵심", detail: "전체 커머스 매출 책임자 역할 수행, 전환 데이터 기반 Funnel 최적화(CTR/CVR/AOV/반복구매 관리), 카페24 구조 개선 상품 구조 설계, 성수기·비성수기 매출 분산 설계 및 리포트 체계 구축" },
  { area: "퍼포먼스 마케팅 및 광고 운영", level: "핵심", detail: "네이버·구글·메타 등 3개 전채 전략·세팅·운영·리포팅까지 단독 수행, 소재 테스트·타겟 구조 설계·픽셀/GA4 이벤트 세팅, KPI 기준으로 ROAS·CAC·LTV 광고 효율 관리" },
  { area: "콘텐츠·크리에이티브 디렉팅", level: "핵심", detail: "광고 이미지·영상·기획 및 촬영 매니저 확립, 촬영 가이드·모델 콘텐츠·편집 방향성 제시, 유튜브·틱톡·인스타 릴스 숏폼 콘텐츠 방향 총괄, 인플루언서 활용 기반 캠페인 설계 및 성과 관리" },
  { area: "데이터 분석 및 자동화 시스템 구축", level: "전문", detail: "n8n 기반 자동화 플로우 설계(자동 콘텐츠 자동수집·데이터 수집 등), GA4 기반 유입·전환 구조 세팅 및 CRO 개선, 실시간 매출/광고/고 통합 대시보드 구성, 수기 작업 영역 자동화 및 팀 운영 효율화" },
  { area: "글로벌 파트너십 및 협상", level: "전문", detail: "해외 브랜드(유럽·미국)와의 가격·공급·라이선스 협의 리딩, 국내 OEM/ODM 제조사 소싱 및 생산 가능성 검토, 플로우사·디자인팀·촬영팀 등 관계사와 협업 프로세스 관리, 파트너사와 장기적 성장 기반의 협력 구조 설계" },
];

// 브랜드 철학
const beliefs = [
  { num: "01", statement: "전략이 디자인보다 먼저다.", sub: "아름다운 것은 많다. 하지만 목적이 있는 아름다움만이 브랜드가 된다." },
  { num: "02", statement: "브랜드는 로고가 아니다.", sub: "브랜드는 소비자의 머릿속에 존재하는 인식의 총합이다. 로고는 그 중 하나의 접점일 뿐이다." },
  { num: "03", statement: "실행하지 않은 전략은 없는 것과 같다.", sub: "전략서를 납품하고 끝내는 방식으로 일하지 않는다. 브랜드가 시장에서 작동할 때까지 함께한다." },
];

// Shared table header style
const thStyle: React.CSSProperties = {
  fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
  fontSize: "0.625rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-gray-400)",
  padding: "0.6rem 0.75rem",
  textAlign: "left",
  borderBottom: "1px solid var(--border-color)",
  backgroundColor: "var(--color-gray-50)",
};

// DB career 항목을 About.tsx 표시 형식으로 변환
function mapCareer(dbCareer: Array<{ company: string; role: string; period: string; description: string }>) {
  return dbCareer.map((c) => ({ period: c.period, company: c.company, role: c.role, detail: c.description }));
}

// DB education/certifications를 eduCerts 형식으로 변환
function mapEduCerts(
  education: Array<{ institution: string; degree: string; period: string }>,
  certifications: Array<{ name: string; issuer: string; year: string }>
) {
  const edu = education.map((e) => ({ type: "학력", content: e.institution + (e.degree ? ` ${e.degree}` : ""), note: e.period }));
  const certs = certifications.map((c) => ({ type: "자격증", content: c.name, note: c.year }));
  return [...edu, ...certs];
}

// DB skills를 capabilities 형식으로 변환
function mapCapabilities(skills: Array<{ name: string; level?: string }>) {
  return skills.map((s) => ({ area: s.name, level: s.level ?? "", detail: "" }));
}

export default function About() {
  useReveal();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { data: profile } = trpc.settings.getProfile.useQuery();

  // DB 데이터가 있으면 사용, 없으면 fallback
  const dbCareer = (profile?.career as Array<{ company: string; role: string; period: string; description: string }> | null) ?? null;
  const dbEducation = (profile?.education as Array<{ institution: string; degree: string; period: string }> | null) ?? null;
  const dbCertifications = (profile?.certifications as Array<{ name: string; issuer: string; year: string }> | null) ?? null;
  const dbSkills = (profile?.skills as Array<{ name: string; level?: string }> | null) ?? null;

  const career = dbCareer && dbCareer.length > 0 ? mapCareer(dbCareer) : FALLBACK_CAREER;
  const eduCerts = (dbEducation && dbEducation.length > 0) || (dbCertifications && dbCertifications.length > 0)
    ? mapEduCerts(dbEducation ?? [], dbCertifications ?? [])
    : FALLBACK_EDU_CERTS;
  const capabilities = dbSkills && dbSkills.length > 0 ? mapCapabilities(dbSkills) : FALLBACK_CAPABILITIES;

  const bodyStyle: React.CSSProperties = {
    fontFamily: "'Pretendard Variable','Pretendard',sans-serif",
    fontSize: "var(--text-body-lg)",
    color: "var(--color-gray-500)",
    lineHeight: 1.85,
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-white)" }}>
      <Navigation />

      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="page-header" style={{ paddingBottom: "2.5rem" }}>
        <div className="container">
          <div className="doc-header-bar reveal" style={{ marginBottom: "clamp(1.25rem,3vw,2rem)" }}>
            <span>About</span>
            <span>배승현 · BAE SEUNGHYUN</span>
          </div>
          <p className="doc-label reveal" style={{ marginBottom: "0.75rem" }}>소개</p>
          <h1 className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "var(--text-h1)", fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-0.04em", lineHeight: 1.1, transitionDelay: "60ms" }}>
            랩배
          </h1>
        </div>
      </div>

      {/* ── Profile + Statement ─────────────────────────────── */}
      <section style={{ padding: "clamp(2rem,5vw,4rem) 0", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          {/* Mobile: stacked, Desktop: 2-col */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="md:grid-cols-[260px_1fr]">

            {/* Profile card */}
            <div className="reveal">
              <div style={{ border: "1px solid var(--border-color)" }}>
                <div style={{ backgroundColor: "var(--color-black)", padding: "0.6rem 1.25rem" }}>
                  <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#888" }}>Profile</span>
                </div>
                <div style={{ aspectRatio: "4/5", maxHeight: "300px", overflow: "hidden" }}>
                  <img
                    src="/images/rapbae_01.jpg"
                    alt="배승현"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                  />
                </div>
                <div style={{ padding: "0 1.25rem" }}>
                  {[
                    { label: "이름", value: profile?.name ? `${profile.name}` : "배승현 (Braum Bae)" },
                    { label: "생년", value: profile?.name ? `${profile.name}` : "Born in 1987." },
                    { label: "역할", value: profile?.title || "Brand Builder" },
                    { label: "경력", value: "11년" },
                    { label: "위치", value: "경기 의정부 / 서울" },
                   
                  ].map((row, i, arr) => (
                    <div key={row.label} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: "0.5rem 1rem", padding: "0.75rem 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border-color)" : "none", alignItems: "baseline" }}>
                      <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.625rem", fontWeight: 700, color: "var(--color-gray-400)", letterSpacing: "0.04em" }}>{row.label}</span>
                      <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-ink)" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Statement */}
            <div>
              <p className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "clamp(1.05rem,2.2vw,1.6rem)", fontWeight: 700, color: "var(--color-ink)", letterSpacing: "-0.03em", lineHeight: 1.5, marginBottom: "clamp(1rem,3vw,2rem)", transitionDelay: "60ms" }}>
                브랜드의 전 생애주기를 설계하는<br />
                Full-Stack Marketer입니다.
              </p>
              <p className="reveal" style={{ ...bodyStyle, marginBottom: "1.25rem", transitionDelay: "120ms" }}>
                {profile?.bio
                  ? profile.bio
                  : "저는 브랜드의 기획 / 제조 / 마케팅 / 판매 / 운영까지 A부터 Z까지 직접 설계하고 실행하는 마케터입니다. 감정과 전략을 연결하고, 브랜드가 시장에서 '기억되는 방식'을 디자인하며 실제 매출과 전환으로 증명하는 실행형 브랜드 빌더로 활동해왔습니다."}
              </p>
              <p className="reveal" style={{ ...bodyStyle, marginBottom: "1.25rem", transitionDelay: "160ms" }}>
                브랜드 설계 = 감정 → 메시지 → 행동 → 전환. 저는 이 구조를 기반으로 브랜드를 움직입니다.
                광고만 하는 사람이 아니라 브랜드 전체를 하나의 시스템으로 바라보고 움직여 결과를 만들어내는 사람입니다.
              </p>
              <p className="reveal" style={{ ...bodyStyle, transitionDelay: "200ms" }}>
                고객은 클릭보다 감정으로 움직인다고 생각합니다. 제품 자체보다 '이 브랜드를 믿을 수 있는가'가 우선입니다.
                그렇기에 저는 감정 기반 메시지, 신뢰 구조화, 일관된 경험, 두명한 제품 스토리, 성능으로 증명되는 가치를 가장 중요한 마케팅 가치로 봅니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Career Timeline ─────────────────────────────────── */}
      <section style={{ padding: "clamp(2.5rem,6vw,5rem) 0", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--color-paper)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="md:grid-cols-[200px_1fr]">
            <div>
              <p className="section-num reveal">01</p>
              <p className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-ink)", transitionDelay: "60ms" }}>커리어</p>
            </div>
            {/* Desktop: table */}
            <div className="hidden md:block reveal" style={{ transitionDelay: "120ms", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid var(--border-color)" }}>
                <thead>
                  <tr>
                    {["기간", "회사", "역할", "주요 업무"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {career.map((item, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-gray-50)" }}>
                      <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: "var(--color-gray-400)", padding: "0.85rem 0.75rem", borderBottom: "1px solid var(--border-color)", whiteSpace: "nowrap", verticalAlign: "top" }}>{item.period}</td>
                      <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-ink)", padding: "0.85rem 0.75rem", borderBottom: "1px solid var(--border-color)", whiteSpace: "nowrap", verticalAlign: "top" }}>{item.company}</td>
                      <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-gray-500)", padding: "0.85rem 0.75rem", borderBottom: "1px solid var(--border-color)", whiteSpace: "nowrap", verticalAlign: "top" }}>{item.role}</td>
                      <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-400)", padding: "0.85rem 0.75rem", borderBottom: "1px solid var(--border-color)", lineHeight: 1.6, verticalAlign: "top" }}>{item.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile: vertical cards */}
            <div className="md:hidden flex flex-col reveal" style={{ border: "1px solid var(--border-color)", transitionDelay: "120ms" }}>
              {career.map((item, i) => (
                <div key={i} style={{
                  padding: "1.25rem",
                  borderBottom: i < career.length - 1 ? "1px solid var(--border-color)" : "none",
                  backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-gray-50)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.35rem", gap: "0.5rem" }}>
                    <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-ink)" }}>{item.company}</p>
                    <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", color: "var(--color-gray-400)", whiteSpace: "nowrap" }}>{item.period}</span>
                  </div>
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-gray-500)", marginBottom: "0.5rem" }}>{item.role}</p>
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-400)", lineHeight: 1.65 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Side Projects ────────────────────────────────── */}
      <section style={{ padding: "clamp(2.5rem,6vw,5rem) 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="md:grid-cols-[200px_1fr]">
            <div>
              <p className="section-num reveal">01-B</p>
              <p className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-ink)", transitionDelay: "60ms" }}>프로젝트 협업</p>
            </div>
            {/* Desktop: table */}
            <div className="hidden md:block reveal" style={{ transitionDelay: "120ms", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid var(--border-color)" }}>
                <thead>
                  <tr>
                    {["기간", "프로젝트", "주요 내용"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sideProjects.map((item, i) => (
                    <tr key={i} style={{ backgroundColor: "var(--color-white)" }}>
                      <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: "var(--color-gray-400)", padding: "0.85rem 0.75rem", borderBottom: "1px solid var(--border-color)", whiteSpace: "nowrap", verticalAlign: "top" }}>{item.period}</td>
                      <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-ink)", padding: "0.85rem 0.75rem", borderBottom: "1px solid var(--border-color)", whiteSpace: "nowrap", verticalAlign: "top" }}>{item.project}</td>
                      <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-400)", padding: "0.85rem 0.75rem", borderBottom: "1px solid var(--border-color)", lineHeight: 1.6, verticalAlign: "top" }}>{item.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile: vertical cards */}
            <div className="md:hidden flex flex-col reveal" style={{ border: "1px solid var(--border-color)", transitionDelay: "120ms" }}>
              {sideProjects.map((item, i) => (
                <div key={i} style={{ padding: "1.25rem", borderBottom: i < sideProjects.length - 1 ? "1px solid var(--border-color)" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.35rem", gap: "0.5rem" }}>
                    <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-ink)" }}>{item.project}</p>
                    <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", color: "var(--color-gray-400)", whiteSpace: "nowrap" }}>{item.period}</span>
                  </div>
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-400)", lineHeight: 1.65 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── Capabilities ────────────────────────────────────── */}
      <section style={{ padding: "clamp(2.5rem,6vw,5rem) 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="md:grid-cols-[200px_1fr]">
            <div>
              <p className="section-num reveal">02</p>
              <p className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-ink)", transitionDelay: "60ms" }}>역량</p>
            </div>
            {/* Desktop: table */}
            <div className="hidden md:block reveal" style={{ transitionDelay: "120ms", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid var(--border-color)" }}>
                <thead>
                  <tr>
                    {["역량 영역", "수준", "세부 내용"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {capabilities.map((item, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-gray-50)" }}>
                      <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-ink)", padding: "0.85rem 0.75rem", borderBottom: "1px solid var(--border-color)", whiteSpace: "nowrap", verticalAlign: "top" }}>{item.area}</td>
                      <td style={{ padding: "0.85rem 0.75rem", borderBottom: "1px solid var(--border-color)", verticalAlign: "top" }}>
                        <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em", color: item.level === "핵심" ? "var(--color-ink)" : "var(--color-gray-400)", border: `1px solid ${item.level === "핵심" ? "var(--color-ink)" : "var(--border-color)"}`, padding: "0.15rem 0.5rem", whiteSpace: "nowrap", display: "inline-block", minWidth: "2.5rem", textAlign: "center" }}>
                          {item.level}
                        </span>
                      </td>
                      <td style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-500)", padding: "0.85rem 0.75rem", borderBottom: "1px solid var(--border-color)", lineHeight: 1.6, verticalAlign: "top" }}>{item.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile: vertical cards */}
            <div className="md:hidden flex flex-col reveal" style={{ border: "1px solid var(--border-color)", transitionDelay: "120ms" }}>
              {capabilities.map((item, i) => (
                <div key={i} style={{
                  padding: "1.25rem",
                  borderBottom: i < capabilities.length - 1 ? "1px solid var(--border-color)" : "none",
                  backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-gray-50)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem", gap: "0.75rem" }}>
                    <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-ink)" }}>{item.area}</p>
                    <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em", color: item.level === "핵심" ? "var(--color-ink)" : "var(--color-gray-400)", border: `1px solid ${item.level === "핵심" ? "var(--color-ink)" : "var(--border-color)"}`, padding: "0.15rem 0.5rem", whiteSpace: "nowrap" }}>
                      {item.level}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-500)", lineHeight: 1.65 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand Beliefs — dark ─────────────────────────────── */}
      <section style={{ padding: "clamp(2.5rem,6vw,5rem) 0", borderBottom: "1px solid #1a1a1a", backgroundColor: "var(--color-black)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="md:grid-cols-[200px_1fr]">
            <div>
              <p className="section-num reveal" style={{ color: "#444" }}>03</p>
              <p className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", fontWeight: 700, color: "#666", transitionDelay: "60ms" }}>브랜드 철학</p>
            </div>
            <div>
              {beliefs.map((item, i) => (
                <div key={item.num} className="reveal" style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: "1rem", padding: "clamp(1rem,3vw,1.5rem) 0", borderBottom: "1px solid #1e1e1e", transitionDelay: `${i * 60}ms` }}>
                  <span style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 700, color: "#444", paddingTop: "0.15rem" }}>{item.num}</span>
                  <div>
                    <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "clamp(0.9375rem,1.8vw,1rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>{item.statement}</p>
                    <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "#777", lineHeight: 1.75 }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Working Style ────────────────────────────────────── */}
      <section style={{ padding: "clamp(2.5rem,6vw,5rem) 0", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--color-paper)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="md:grid-cols-[200px_1fr]">
            <div>
              <p className="section-num reveal">04</p>
              <p className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-ink)", transitionDelay: "60ms" }}>일하는 방식</p>
            </div>
            <div>
              <p className="reveal" style={{ ...bodyStyle, marginBottom: "1.25rem", transitionDelay: "60ms" }}>
                저는 결과만 만드는 사람이 아닙니다.
                문제를 정의하고, 방향을 설계하고, 실행하고, 개선하는 전 과정을 함께합니다.
              </p>
              <p className="reveal" style={{ ...bodyStyle, marginBottom: "1.25rem", transitionDelay: "120ms" }}>
                프로젝트의 모든 단계에서 투명하게 소통하며, 
                결과뿐 아니라 과정과 판단의 이유까지 공유합니다.
                
              </p>
              <p className="reveal" style={{ ...bodyStyle, transitionDelay: "180ms" }}>
                 좋은 결과는 좋은 협업에서 시작된다고 믿습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(2.5rem,6vw,5rem) 0" }}>
        <div className="container">
          <h2 className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "clamp(1.4rem,3.5vw,2.8rem)", fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "clamp(1.25rem,3vw,2rem)" }}>
            브랜드를 만들 준비가 되셨나요?
          </h2>
          <Link href="/contact" className="btn-primary reveal" style={{ textDecoration: "none", transitionDelay: "80ms" }}>대화 시작하기 →</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
