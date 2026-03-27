"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const DEFAULT_COL2_HEADING = { en: "Services",  zh: "服务" };
const DEFAULT_COL3_HEADING = { en: "Company",   zh: "关于我们" };

const DEFAULT_COL2_LINKS = [
  { labelEn: "Pre-IPO Opportunities", labelZh: "Pre-IPO投资",  href: "/services/pre-ipo-opportunities" },
  { labelEn: "Tax Planning",          labelZh: "税务规划",      href: "/services/tax-planning" },
  { labelEn: "Retirement Planning",   labelZh: "退休规划",      href: "/services/retirement-planning" },
  { labelEn: "Estate Planning",       labelZh: "遗产和传承规划", href: "/services/estate-planning" },
];

const DEFAULT_COL3_LINKS = [
  { labelEn: "About Us",   labelZh: "关于我们", href: "/about-us" },
  { labelEn: "Blog",       labelZh: "博客",     href: "/blog" },
  { labelEn: "Contact Us", labelZh: "联系我们", href: "/contact" },
];

export default function Footer({ settings }) {
  const pathname = usePathname();
  const isChinese = pathname.startsWith("/zh");
  const prefix = isChinese ? "/zh" : "";

  const col2Heading = isChinese
    ? (settings?.footerCol2HeadingZh || DEFAULT_COL2_HEADING.zh)
    : (settings?.footerCol2HeadingEn || DEFAULT_COL2_HEADING.en);
  const col2Links = settings?.footerCol2Links?.length > 0 ? settings.footerCol2Links : DEFAULT_COL2_LINKS;

  const col3Heading = isChinese
    ? (settings?.footerCol3HeadingZh || DEFAULT_COL3_HEADING.zh)
    : (settings?.footerCol3HeadingEn || DEFAULT_COL3_HEADING.en);
  const col3Links = settings?.footerCol3Links?.length > 0 ? settings.footerCol3Links : DEFAULT_COL3_LINKS;

  const email = settings?.email || "support@goldenbluefo.com";
  const phone = settings?.phone || "+1 (925) 968-8388";
  const siteName = settings?.siteName || "Golden Blue Family Office";

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Column 1 — Brand */}
        <div>
          <div className="footer-brand-name">{siteName}</div>
          <p className="footer-tagline">
            {isChinese
              ? "专业的家族理财规划服务，帮助您实现财务智慧与财富增长。"
              : "Professional family office services to help you achieve financial wisdom and lasting wealth."}
          </p>
          <div className="footer-social">
            <a
              href={settings?.facebookUrl || "#"}
              className="footer-social-link"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              f
            </a>
            <a
              href={settings?.twitterUrl || "#"}
              className="footer-social-link"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              𝕏
            </a>
            <a
              href={settings?.youtubeUrl || "#"}
              className="footer-social-link"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶
            </a>
          </div>
        </div>

        {/* Column 2 — Services */}
        <div>
          <div className="footer-col-heading">{col2Heading}</div>
          <ul className="footer-links">
            {col2Links.map((item, i) => (
              <li key={item.href + i}>
                <Link href={`${prefix}${item.href}`} className="footer-link">
                  {isChinese ? (item.labelZh || item.labelEn) : (item.labelEn || item.labelZh)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Company */}
        <div>
          <div className="footer-col-heading">{col3Heading}</div>
          <ul className="footer-links">
            {col3Links.map((item, i) => (
              <li key={item.href + i}>
                <Link href={`${prefix}${item.href}`} className="footer-link">
                  {isChinese ? (item.labelZh || item.labelEn) : (item.labelEn || item.labelZh)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div>
          <div className="footer-col-heading">{isChinese ? "联系我们" : "Contact"}</div>
          <div>
            <p className="footer-contact-item">
              <a href={`mailto:${email}`} className="footer-contact-link">
                {email}
              </a>
            </p>
            <p className="footer-contact-item">
              <a
                href={`tel:${phone.replace(/\s|\(|\)|-/g, "")}`}
                className="footer-contact-link"
              >
                {phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        {settings?.copyrightEn || settings?.copyrightZh ? (
          isChinese
            ? (settings?.copyrightZh || settings?.copyrightEn)
            : (settings?.copyrightEn || settings?.copyrightZh)
        ) : (
          `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`
        )}
      </div>
    </footer>
  );
}
