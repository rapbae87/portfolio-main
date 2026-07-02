import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "/works", label: "Works" },
  { href: "/thinking", label: "Thinking" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="nav-root"
        style={{
          backgroundColor: "rgba(255,255,255,0.97)",
          borderBottomColor: scrolled ? "var(--border-color)" : "transparent",
          transition: "border-color 300ms ease",
        }}
      >
        <div className="nav-inner">
          {/* Brand */}
          <Link href="/" className="nav-brand" style={{ textDecoration: "none" }}>
            RAPBAE
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block" aria-label="주 메뉴">
            <ul style={{ display: "flex", alignItems: "center", gap: "2.5rem", listStyle: "none" }}>
              {navLinks.map((link) => {
                const isActive = location === link.href || location.startsWith(link.href + "/");
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        textDecoration: "none",
                        fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                        fontSize: "0.8125rem",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "var(--color-ink)" : "var(--color-gray-500)",
                        letterSpacing: "0.02em",
                        transition: "color 160ms ease",
                      }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "var(--color-ink)")}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = isActive ? "var(--color-ink)" : "var(--color-gray-500)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "20px",
                  height: "1.5px",
                  backgroundColor: "var(--color-ink)",
                  transition: "transform 220ms ease, opacity 220ms ease",
                  transform: menuOpen
                    ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                    : i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                    : "none"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          backgroundColor: "var(--color-white)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 260ms ease",
          paddingTop: "var(--header-height)",
        }}
      >
        <div
          style={{
            padding: "3rem var(--container-pad)",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: "none",
                display: "block",
                fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                fontSize: "clamp(2rem, 8vw, 3rem)",
                fontWeight: 700,
                color: "var(--color-ink)",
                letterSpacing: "-0.03em",
                lineHeight: 1.25,
                padding: "0.6rem 0",
                borderBottom: i < navLinks.length - 1 ? "1px solid var(--border-color)" : "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <p
            style={{
              marginTop: "2.5rem",
              fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--color-gray-400)",
              letterSpacing: "0.04em",
            }}
          >
            Brand Builder — Seoul
          </p>
        </div>
      </div>
    </>
  );
}
