import React from "react";
import { Link } from "wouter";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-root">
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
          }}
          className="md:grid-cols-[1fr_auto]"
        >
          {/* Left */}
          <div>
            <p
              style={{
                fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: "var(--color-ink)",
                marginBottom: "0.5rem",
              }}
            >
              RAPBAE
            </p>
            <p
              style={{
                fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                fontSize: "0.8125rem",
                color: "var(--color-gray-400)",
                lineHeight: 1.6,
                marginBottom: "0.25rem",
              }}
            >
              브랜드 전략 · 상품기획 · D2C 커머스 · 퍼포먼스 마케팅 · B2B 제안
            </p>
            <p
              style={{
                fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                fontSize: "0.6875rem",
                color: "var(--color-gray-300)",
                letterSpacing: "0.04em",
                marginTop: "1rem",
              }}
            >
              © {year} Rapbae. All rights reserved.
            </p>
          </div>

          {/* Right — nav */}
          <div>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap" as const,
                gap: "1.25rem 2rem",
              }}
            >
              {[
                { href: "/works", label: "Works" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      textDecoration: "none",
                      fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      color: "var(--color-gray-400)",
                      transition: "color 160ms ease",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "var(--color-ink)")}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "var(--color-gray-400)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
