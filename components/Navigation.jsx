"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

const DEFAULT_NAV = [
  { labelEn: "Home",       labelZh: "主页",    href: "/" },
  { labelEn: "About Us",   labelZh: "关于我们", href: "/about-us" },
  { labelEn: "Services",   labelZh: "服务",    href: "/services" },
  { labelEn: "Blog",       labelZh: "博客",    href: "/blog" },
  { labelEn: "Contact Us", labelZh: "联系我们", href: "/contact" },
];

export default function Navigation({ settings }) {
  const pathname = usePathname();
  const isChinese = pathname.startsWith("/zh");
  const prefix = isChinese ? "/zh" : "";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use Sanity nav items if available, otherwise fall back to defaults
  const rawNav =
    settings?.headerNavItems?.length > 0 ? settings.headerNavItems : DEFAULT_NAV;

  // Resolve full paths and pick the right language label
  const navItems = rawNav.map((item) => {
    const isHome = item.href === "/" || item.href === "";
    const path = isHome ? (isChinese ? "/zh" : "/") : `${prefix}${item.href}`;
    return {
      label: isChinese ? (item.labelZh || item.labelEn) : (item.labelEn || item.labelZh),
      path,
      key: item.href || item.labelEn,
    };
  });

  // Language switcher alternate path
  let alternatePath = isChinese
    ? pathname.replace(/^\/zh/, "") || "/"
    : "/zh" + pathname;
  if (pathname === "/" || pathname === "/zh" || pathname === "/zh/") {
    alternatePath = isChinese ? "/" : "/zh";
  }

  const linkStyle = (isActive) => ({
    textDecoration: "none",
    color: isActive ? "#2563eb" : "#4b5563",
    fontWeight: isActive ? 600 : 400,
    fontSize: "0.9375rem",
    transition: "color 0.2s",
    whiteSpace: "nowrap",
  });

  const isActive = (href) =>
    pathname === href ||
    (href === "/" && pathname === "/") ||
    (href === "/zh" && (pathname === "/zh" || pathname === "/zh/")) ||
    pathname.startsWith(href + "/");

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e5e7eb",
        padding: "1rem 1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }} className="nav-container">
        {/* Logo */}
        <Link
          href={isChinese ? "/zh" : "/"}
          style={{ fontSize: "1.25rem", fontWeight: 700, textDecoration: "none", color: "#1f2937" }}
        >
          {settings?.siteName || "Lucrewise"}
        </Link>

        {/* Hamburger */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop nav */}
        {!isMobile && (
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.path}
                style={linkStyle(isActive(item.path))}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) e.target.style.color = "#2563eb";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) e.target.style.color = "#4b5563";
                }}
              >
                {item.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <Link
              href={alternatePath}
              style={{
                textDecoration: "none",
                color: "#4b5563",
                fontWeight: 400,
                fontSize: "0.875rem",
                padding: "0.5rem 1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#2563eb";
                e.target.style.borderColor = "#2563eb";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#4b5563";
                e.target.style.borderColor = "#e5e7eb";
              }}
            >
              {isChinese ? "English" : "中文"}
            </Link>

            {/* Book a Call CTA */}
            <a
              href="https://calendly.com/pljw-financial/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "#ffffff",
                backgroundColor: "#2563eb",
                fontWeight: 600,
                fontSize: "0.875rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                transition: "background-color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = "#1d4ed8"; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = "#2563eb"; }}
            >
              {isChinese ? "免費預約" : "Book a Call"}
            </a>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isMobileMenuOpen && (
        <div className="mobile-menu open">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.path}
              style={{
                textDecoration: "none",
                color: isActive(item.path) ? "#2563eb" : "#4b5563",
                fontWeight: isActive(item.path) ? 600 : 400,
                fontSize: "1rem",
                padding: "1rem 0",
                borderBottom: "1px solid #e5e7eb",
                display: "block",
                width: "100%",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e5e7eb" }}>
            <Link
              href={alternatePath}
              style={{
                textDecoration: "none",
                color: "#4b5563",
                fontWeight: 400,
                fontSize: "0.875rem",
                padding: "0.75rem 1.5rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                display: "inline-block",
                transition: "all 0.2s",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
              onMouseEnter={(e) => {
                e.target.style.color = "#2563eb";
                e.target.style.borderColor = "#2563eb";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#4b5563";
                e.target.style.borderColor = "#e5e7eb";
              }}
            >
              {isChinese ? "English" : "中文"}
            </Link>

            {/* Book a Call — mobile */}
            <a
              href="https://calendly.com/pljw-financial/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                marginTop: "0.75rem",
                textDecoration: "none",
                color: "#ffffff",
                backgroundColor: "#2563eb",
                fontWeight: 600,
                fontSize: "1rem",
                padding: "0.85rem 1.5rem",
                borderRadius: "0.5rem",
                textAlign: "center",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {isChinese ? "免費預約咨詢" : "Book a Free Call"}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
