/*
 * Contact.tsx — 문의 페이지
 * 레이아웃: 프로젝트 유형 선택 + 연락처 정보
 * 모바일: 2열 그리드 → 1열, 여백 최적화
 */

import { useEffect, useState } from "react";
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
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// 프로젝트 유형
const projectTypes = [
  { id: "brand-strategy", label: "브랜드 전략", desc: "포지셔닝, 아이덴티티, 브랜드 스토리 설계" },
  { id: "product-planning", label: "상품기획", desc: "SKU 설계, 카테고리 확장, 패키지 개발" },
  { id: "d2c-commerce", label: "D2C 커머스", desc: "자사몰 구축, 커머스 운영, 채널 전략" },
  { id: "performance", label: "퍼포먼스 마케팅", desc: "광고 전략 수립, 채널 운영, ROAS 최적화" },
  { id: "b2b-proposal", label: "B2B 제안서", desc: "라이선싱, 파트너십, IR 문서 작성" },
  { id: "global", label: "글로벌 전략", desc: "해외 브랜드 한국 진입, 로컬라이제이션" },
  { id: "other", label: "기타 / 상담", desc: "위 항목에 해당하지 않는 문의" },
];

// Fallback 연락처 (DB가 비어있을 때 사용)
const FALLBACK_CONTACT = {
  email: "hello@rapbae.com",
  kakao: "https://open.kakao.com/o/saPKibyc",
  kakaoLabel: "일대일채팅",
  linkedin: "https://linkedin.com/in/rapbae",
  instagram: "https://www.instagram.com/rbs_rapbae/",
  };

export default function Contact() {
  useReveal();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { data: contact } = trpc.settings.getContact.useQuery();

  // DB 데이터가 있으면 사용, 없으면 fallback
  // contact가 null이면 아직 로딩 중이거나 DB에 행 없음 → fallback 사용
  // contact가 있고 필드가 빈 문자열이면 → DB에 저장된 빈 값 그대로 사용 (단, 링크/이메일은 유효값 필요)
  const isLoaded = contact !== undefined;
  const email = (isLoaded && contact?.email) ? contact.email : FALLBACK_CONTACT.email;
  const kakaoHref = (isLoaded && contact?.kakao) ? contact.kakao : FALLBACK_CONTACT.kakao;
  const kakaoLabel = (isLoaded && contact?.kakaoLabel) ? contact.kakaoLabel : FALLBACK_CONTACT.kakaoLabel;
  const rawLinkedin = isLoaded ? (contact?.linkedin ?? "") : "";
  const linkedinHref = rawLinkedin
    ? (rawLinkedin.startsWith("http") ? rawLinkedin : `https://${rawLinkedin}`)
    : FALLBACK_CONTACT.linkedin;
  const linkedinValue = rawLinkedin
    ? rawLinkedin.replace(/^https?:\/\//, "")
    : "linkedin.com/in/rapbae";

  const contactLinks = [
    { label: "이메일", value: email, href: `mailto:${email}`, icon: "→", note: "보통 1–2일 내에 답변 드립니다." },
    { label: "Kakaotalk", value: kakaoLabel, href: kakaoHref, icon: "↗", note: null },
    { label: "LinkedIn", value: linkedinValue, href: linkedinHref, icon: "↗", note: null },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-white)" }}>
      <Navigation />

      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="page-header" style={{ paddingBottom: "clamp(1.5rem,4vw,2.5rem)" }}>
        <div className="container">
          <div className="doc-header-bar reveal" style={{ marginBottom: "clamp(1.25rem,3vw,2rem)" }}>
            <span>Contact</span>
            <span>모든 프로젝트는 대화에서 시작합니다</span>
          </div>
          <p className="doc-label reveal" style={{ marginBottom: "0.75rem" }}>연락</p>
          <h1 className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "var(--text-h1)", fontWeight: 800, color: "var(--color-ink)", letterSpacing: "-0.04em", lineHeight: 1.1, transitionDelay: "60ms" }}>
            이야기 나눠요.
          </h1>
        </div>
      </div>

      {/* ── Project Type Selection ───────────────────────────── */}
      <section style={{ padding: "clamp(2rem,5vw,4rem) 0", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          {/* Mobile: stacked, Desktop: 2-col */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(1.5rem,4vw,3rem)" }} className="md:grid-cols-[280px_1fr]">

            {/* Left */}
            <div>
              <p className="doc-label reveal" style={{ marginBottom: "0.75rem" }}>어떤 도움이 필요하신가요?</p>
              <p className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", color: "var(--color-gray-400)", lineHeight: 1.75, transitionDelay: "60ms" }}>
                아래에서 프로젝트 유형을 선택하시면 더 빠르게 답변 드릴 수 있습니다.
              </p>
              <p className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", color: "var(--color-gray-400)", lineHeight: 1.75, marginTop: "1rem", transitionDelay: "120ms" }}>
                어떤 단계에 있든, 어떤 규모든 상관없습니다.
              </p>
            </div>

            {/* Right: Project type grid — 2-col on desktop, 1-col on mobile */}
            <div className="reveal" style={{ transitionDelay: "80ms" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }} className="mobile-single-col">
                {projectTypes.map((type, i) => (
                  <button
                    key={type.id}
                    onClick={() => setSelected(selected === type.id ? null : type.id)}
                    style={{
                      background: selected === type.id ? "var(--color-ink)" : "transparent",
                      border: "1px solid var(--border-color)",
                      marginTop: i > 0 ? "-1px" : "0",
                      marginLeft: i % 2 === 1 ? "-1px" : "0",
                      padding: "clamp(0.875rem,2vw,1.25rem)",
                      cursor: "pointer",
                      textAlign: "left" as const,
                      transition: "background-color 160ms ease",
                      position: "relative" as const,
                      zIndex: selected === type.id ? 1 : 0,
                    }}
                  >
                    <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: selected === type.id ? "#fff" : "var(--color-ink)", marginBottom: "0.3rem", transition: "color 160ms ease" }}>
                      {type.label}
                    </p>
                    <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: selected === type.id ? "rgba(255,255,255,0.6)" : "var(--color-gray-400)", lineHeight: 1.5, transition: "color 160ms ease" }}>
                      {type.desc}
                    </p>
                  </button>
                ))}
              </div>
              {selected && (
                <div style={{ marginTop: "1.5rem", padding: "1.25rem", border: "1px solid var(--color-ink)", backgroundColor: "var(--color-paper)" }}>
                  <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.8125rem", color: "var(--color-gray-500)", lineHeight: 1.7 }}>
                    <strong style={{ color: "var(--color-ink)" }}>{projectTypes.find(t => t.id === selected)?.label}</strong> 관련 문의는 아래 이메일로 연락 주세요.
                    선택하신 프로젝트 유형과 현재 상황을 간략히 적어 보내주시면 빠르게 검토하겠습니다.
                  </p>
                  <a href={`mailto:${email}`} style={{ display: "inline-block", marginTop: "1rem", fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-ink)", textDecoration: "none", borderBottom: "1px solid var(--color-ink)", paddingBottom: "0.1rem" }}>
                    {email} →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Links ────────────────────────────────────── */}
      <section style={{ padding: "clamp(2rem,5vw,4rem) 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(1.5rem,4vw,3rem)" }} className="md:grid-cols-[280px_1fr]">
            <div>
              <p className="doc-label reveal" style={{ marginBottom: "0.75rem" }}>연락처</p>
              <p className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.875rem", color: "var(--color-gray-400)", lineHeight: 1.75, transitionDelay: "60ms" }}>
                브랜드를 처음부터 만들고 싶은 분,<br />
                기존 브랜드를 다시 설계하고 싶은 분,<br />
                브랜드에 대해 이야기 나누고 싶은 분.
              </p>
            </div>
            <div>
              {contactLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="reveal"
                  style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "clamp(1rem,2.5vw,1.5rem) 0", borderBottom: "1px solid var(--border-color)", transitionDelay: `${i * 50}ms`, cursor: "pointer", gap: "1rem" }}
                >
                  <div>
                    <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-gray-300)", letterSpacing: "0.06em", marginBottom: "0.35rem" }}>{link.label}</p>
                    <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "clamp(0.9rem,1.8vw,1.25rem)", fontWeight: 600, color: "var(--color-ink)", letterSpacing: "-0.01em", transition: "color 160ms ease", wordBreak: "break-all" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--color-gray-500)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--color-ink)")}
                    >{link.value}</p>
                    {link.note && <p style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.6875rem", color: "var(--color-gray-300)", marginTop: "0.25rem" }}>{link.note}</p>}
                  </div>
                  <span style={{ color: "var(--color-gray-300)", fontSize: "0.875rem", flexShrink: 0 }}>{link.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing Statement — dark ─────────────────────────── */}
      <section style={{ padding: "clamp(2.5rem,6vw,5rem) 0", backgroundColor: "var(--color-black)" }}>
        <div className="container">
          <div style={{ maxWidth: "640px" }}>
            <p className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "clamp(1.15rem,3vw,2.25rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.55, marginBottom: "1.25rem" }}>
              아무도 몰랐던 브랜드가<br />
              사람들에게 기억되기 시작하는 순간.
            </p>
            <p className="reveal" style={{ fontFamily: "'Pretendard Variable','Pretendard',sans-serif", fontSize: "0.75rem", color: "#555", letterSpacing: "0.04em", transitionDelay: "80ms" }}>
              — 랩배가 가장 좋아하는 순간
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
