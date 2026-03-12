"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const isChinese = pathname.startsWith("/zh");
  const prefix = isChinese ? "/zh" : "";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navItems = [
    { en: "Home", zh: "主页", path: isChinese ? "/zh" : "/" },
    { en: "About Us", zh: "关于我们", path: `${prefix}/about-us` },
    { en: "Services", zh: "服务", path: `${prefix}/services` },
    { en: "Blog", zh: "博客", path: `${prefix}/blog` },
    { en: "Contact Us", zh: "联系我们", path: `${prefix}/contact` },
  ];

  // Get the path without language prefix
  let alternatePath = "";
  if (isChinese) {
    alternatePath = pathname.replace(/^\/zh/, "") || "/";
  } else {
    alternatePath = "/zh" + pathname;
  }
  
  // Handle special cases
  if (pathname === "/" || pathname === "/zh" || pathname === "/zh/") {
    alternatePath = isChinese ? "/" : "/zh";
  }

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid #e5e7eb",
      padding: "1rem 1.5rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
        }} className="nav-container">
          <Link
            href={isChinese ? "/zh" : "/"}
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              textDecoration: "none",
              color: "#1f2937",
            }}
          >
            Lucrewise
          </Link>
          
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
          
          {!isMobile && (
            <div className="nav-links">
              {navItems.map((item) => {
                const href = item.path;
                // Check if current path matches this nav item
                const isActive = 
                  pathname === href ||
                  (href === "/" && pathname === "/") ||
                  (href === "/zh" && (pathname === "/zh" || pathname === "/zh/")) ||
                  (pathname.startsWith(href + "/") || pathname === href);
                
                return (
                  <Link
                    key={item.path}
                    href={href}
                    style={{
                      textDecoration: "none",
                      color: isActive ? "#2563eb" : "#4b5563",
                      fontWeight: isActive ? 600 : 400,
                      fontSize: "0.9375rem",
                      transition: "color 0.2s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.target.style.color = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.target.style.color = "#4b5563";
                    }}
                  >
                    {isChinese ? item.zh : item.en}
                  </Link>
                );
              })}
              
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
            </div>
          )}
        </div>
        
        {isMobile && isMobileMenuOpen && (
          <div className="mobile-menu open">
            {navItems.map((item) => {
              const href = item.path;
              const isActive = 
                pathname === href ||
                (href === "/" && pathname === "/") ||
                (href === "/zh" && (pathname === "/zh" || pathname === "/zh/")) ||
                (pathname.startsWith(href + "/") || pathname === href);
              
              return (
                <Link
                  key={item.path}
                  href={href}
                  style={{
                    textDecoration: "none",
                    color: isActive ? "#2563eb" : "#4b5563",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: "1rem",
                    padding: "1rem 0",
                    borderBottom: "1px solid #e5e7eb",
                    display: "block",
                    width: "100%",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {isChinese ? item.zh : item.en}
                </Link>
              );
            })}
            <div style={{
              marginTop: "1rem",
              paddingTop: "1rem",
              borderTop: "1px solid #e5e7eb",
            }}>
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
            </div>
          </div>
        )}
      </nav>
  );
}
