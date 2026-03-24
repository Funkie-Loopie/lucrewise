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

  const rawNav =
    settings?.headerNavItems?.length > 0 ? settings.headerNavItems : DEFAULT_NAV;

  const navItems = rawNav.map((item) => {
    const isHome = item.href === "/" || item.href === "";
    const path = isHome ? (isChinese ? "/zh" : "/") : `${prefix}${item.href}`;
    return {
      label: isChinese ? (item.labelZh || item.labelEn) : (item.labelEn || item.labelZh),
      path,
      key: item.href || item.labelEn,
    };
  });

  let alternatePath = isChinese
    ? pathname.replace(/^\/zh/, "") || "/"
    : "/zh" + pathname;
  if (pathname === "/" || pathname === "/zh" || pathname === "/zh/") {
    alternatePath = isChinese ? "/" : "/zh";
  }

  const isActive = (href) =>
    pathname === href ||
    (href === "/" && pathname === "/") ||
    (href === "/zh" && (pathname === "/zh" || pathname === "/zh/")) ||
    pathname.startsWith(href + "/");

  const siteName = settings?.siteName || "Golden Blue Family Office";

  return (
    <nav className="nav-wrapper">
      <div className="nav-inner">
        {/* Logo */}
        <Link href={isChinese ? "/zh" : "/"} className="nav-logo">
          {siteName}
        </Link>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop nav */}
        {!isMobile && (
          <div className="nav-links-desktop">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.path}
                className={`nav-link${isActive(item.path) ? " nav-link--active" : ""}`}
              >
                {item.label}
              </Link>
            ))}

            <Link href={alternatePath} className="nav-lang-btn">
              {isChinese ? "English" : "中文"}
            </Link>

            <a
              href="https://calendly.com/pljw-financial/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              {isChinese ? "免費預約" : "Book a Call"}
            </a>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <div className={`nav-mobile${isMobileMenuOpen ? " open" : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.path}
              className={`nav-mobile-link${isActive(item.path) ? " nav-mobile-link--active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="nav-mobile-actions">
            <Link
              href={alternatePath}
              className="nav-lang-btn"
              style={{ textAlign: "center" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {isChinese ? "English" : "中文"}
            </Link>
            <a
              href="https://calendly.com/pljw-financial/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
              style={{ textAlign: "center", display: "block", padding: "0.75rem 1.25rem" }}
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
