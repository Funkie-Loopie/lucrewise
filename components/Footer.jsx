"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const DEFAULT_COL2_HEADING = { en: "Services",  zh: "服务" };
const DEFAULT_COL3_HEADING = { en: "About Us",  zh: "关于我们" };

const DEFAULT_COL2_LINKS = [
  { labelEn: "Investment Opportunities", labelZh: "投资机会",  href: "/services/investment-opportunities" },
  { labelEn: "Insurance Consulting",     labelZh: "保险规划",  href: "/services/insurance-consulting" },
  { labelEn: "Tax Guidance",             labelZh: "税务咨询",  href: "/services/tax-consultation" },
  { labelEn: "Business All-in-One",      labelZh: "企业一站式", href: "/services/business-all-in-one" },
  { labelEn: "Philanthropic Service",    labelZh: "慈善捐赠",  href: "/services/philanthropic-service" },
];

const DEFAULT_COL3_LINKS = [
  { labelEn: "Our Leadership", labelZh: "我们的领导", href: "/about-us" },
  { labelEn: "Join Us",        labelZh: "加入我们",   href: "/about-us" },
  { labelEn: "FAQs",           labelZh: "常见问题",   href: "/about-us" },
];

function FooterLinkList({ links, prefix, isChinese }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {links.map((item, i) => (
        <li key={item.href + i}>
          <Link
            href={`${prefix}${item.href}`}
            style={{ textDecoration: "none", color: "#000000", fontSize: "0.9375rem", transition: "color 0.2s" }}
            onMouseEnter={(e) => { e.target.style.color = "#2563eb"; }}
            onMouseLeave={(e) => { e.target.style.color = "#000000"; }}
          >
            {isChinese ? (item.labelZh || item.labelEn) : (item.labelEn || item.labelZh)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer({ settings }) {
  const pathname = usePathname();
  const isChinese = pathname.startsWith("/zh");
  const prefix = isChinese ? "/zh" : "";

  // Column 2
  const col2Heading = isChinese
    ? (settings?.footerCol2HeadingZh || settings?.footerCol2HeadingEn || DEFAULT_COL2_HEADING.zh)
    : (settings?.footerCol2HeadingEn || settings?.footerCol2HeadingZh || DEFAULT_COL2_HEADING.en);
  const col2Links = settings?.footerCol2Links?.length > 0 ? settings.footerCol2Links : DEFAULT_COL2_LINKS;

  // Column 3
  const col3Heading = isChinese
    ? (settings?.footerCol3HeadingZh || settings?.footerCol3HeadingEn || DEFAULT_COL3_HEADING.zh)
    : (settings?.footerCol3HeadingEn || settings?.footerCol3HeadingZh || DEFAULT_COL3_HEADING.en);
  const col3Links = settings?.footerCol3Links?.length > 0 ? settings.footerCol3Links : DEFAULT_COL3_LINKS;

  const email = settings?.email || "Support@lucrewisefin.com";
  const phone = settings?.phone || "+1 (925)968-8388";

  const headingStyle = { fontSize: "1rem", fontWeight: 700, color: "#000000", marginBottom: "1rem" };

  return (
    <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb", marginTop: "4rem" }} className="footer-wrapper">
      <div style={{ maxWidth: 1200, margin: "0 auto" }} className="footer-container">

        {/* Column 1 — Branding + Social */}
        <div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#000000", marginBottom: "1rem", lineHeight: 1.3 }}>
            {settings?.siteName || "Lucrewise Financial"}
          </h3>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <a href={settings?.facebookUrl || "#"} style={{ color: "#6b7280", fontSize: "1.25rem", textDecoration: "none" }} aria-label="Facebook" target="_blank" rel="noopener noreferrer">f</a>
            <a href={settings?.twitterUrl  || "#"} style={{ color: "#6b7280", fontSize: "1.25rem", textDecoration: "none" }} aria-label="Twitter"  target="_blank" rel="noopener noreferrer">🐦</a>
            <a href={settings?.youtubeUrl  || "#"} style={{ color: "#6b7280", fontSize: "1.25rem", textDecoration: "none" }} aria-label="YouTube"  target="_blank" rel="noopener noreferrer">▶</a>
          </div>
        </div>

        {/* Column 2 — Services (editable via Sanity) */}
        <div>
          <h4 style={headingStyle}>{col2Heading}</h4>
          <FooterLinkList links={col2Links} prefix={prefix} isChinese={isChinese} />
        </div>

        {/* Column 3 — About Us (editable via Sanity) */}
        <div>
          <h4 style={headingStyle}>{col3Heading}</h4>
          <FooterLinkList links={col3Links} prefix={prefix} isChinese={isChinese} />
        </div>

        {/* Column 4 — Contact */}
        <div>
          <h4 style={headingStyle}>{isChinese ? "联系我们" : "Contact Us"}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9375rem", color: "#000000" }}>
            <div>
              <a
                href={`mailto:${email}`}
                style={{ textDecoration: "none", color: "#000000", transition: "color 0.2s", wordBreak: "break-word" }}
                onMouseEnter={(e) => { e.target.style.color = "#2563eb"; }}
                onMouseLeave={(e) => { e.target.style.color = "#000000"; }}
              >
                {email}
              </a>
            </div>
            <div>
              {isChinese ? "电话：" : "Call: "}
              <a
                href={`tel:${phone.replace(/\s|\(|\)|-/g, "")}`}
                style={{ textDecoration: "none", color: "#000000", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.target.style.color = "#2563eb"; }}
                onMouseLeave={(e) => { e.target.style.color = "#000000"; }}
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      {(settings?.copyrightEn || settings?.copyrightZh) && (
        <div style={{ borderTop: "1px solid #e5e7eb", padding: "1rem 1.5rem", textAlign: "center", fontSize: "0.8125rem", color: "#9ca3af" }}>
          {isChinese
            ? (settings?.copyrightZh || settings?.copyrightEn)
            : (settings?.copyrightEn || settings?.copyrightZh)}
        </div>
      )}
    </footer>
  );
}
