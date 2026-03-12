"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();
  const isChinese = pathname.startsWith("/zh");
  const prefix = isChinese ? "/zh" : "";

  const services = [
    { en: "Investment Opportunities", zh: "投资机会", path: `${prefix}/services/investment-opportunities` },
    { en: "Insurance Consulting", zh: "保险规划", path: `${prefix}/services/insurance-consulting` },
    { en: "Tax Guidance", zh: "税务咨询", path: `${prefix}/services/tax-consultation` },
    { en: "Business All-in-One", zh: "企业一站式", path: `${prefix}/services/business-all-in-one` },
    { en: "Philanthropic Service", zh: "慈善捐赠", path: `${prefix}/services/philanthropic-service` },
  ];

  const aboutUs = [
    { en: "Our Leadership", zh: "我们的领导", path: `${prefix}/about-us`, key: "leadership" },
    { en: "Join Us", zh: "加入我们", path: `${prefix}/about-us`, key: "join-us" },
    { en: "FAQs", zh: "常见问题", path: `${prefix}/about-us`, key: "faqs" },
  ];

  return (
    <footer style={{
      backgroundColor: "#ffffff",
      borderTop: "1px solid #e5e7eb",
      marginTop: "4rem",
    }} className="footer-wrapper">
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
        }} className="footer-container">
          {/* Company Branding and Social Media */}
          <div>
            <h3 style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#000000",
              marginBottom: "1rem",
              lineHeight: 1.3,
            }}>
              Lucrewise Financial
            </h3>
            <div style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1.5rem",
            }}>
              <a
                href="#"
                style={{
                  color: "#6b7280",
                  fontSize: "1.25rem",
                  textDecoration: "none",
                }}
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="#"
                style={{
                  color: "#6b7280",
                  fontSize: "1.25rem",
                  textDecoration: "none",
                }}
                aria-label="Twitter"
              >
                🐦
              </a>
              <a
                href="#"
                style={{
                  color: "#6b7280",
                  fontSize: "1.25rem",
                  textDecoration: "none",
                }}
                aria-label="YouTube"
              >
                ▶
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#000000",
              marginBottom: "1rem",
            }}>
              {isChinese ? "服务" : "Services"}
            </h4>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}>
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    href={service.path}
                    style={{
                      textDecoration: "none",
                      color: "#000000",
                      fontSize: "0.9375rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#000000";
                    }}
                  >
                    {isChinese ? service.zh : service.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#000000",
              marginBottom: "1rem",
            }}>
              {isChinese ? "关于我们" : "About Us"}
            </h4>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}>
              {aboutUs.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.path}
                    style={{
                      textDecoration: "none",
                      color: "#000000",
                      fontSize: "0.9375rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#000000";
                    }}
                  >
                    {isChinese ? item.zh : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#000000",
              marginBottom: "1rem",
            }}>
              {isChinese ? "联系我们" : "Contact Us"}
            </h4>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              fontSize: "0.9375rem",
              color: "#000000",
            }}>
              <div>
                <a
                  href="mailto:Support@lucrewisefin.com"
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                    transition: "color 0.2s",
                    wordBreak: "break-word",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#2563eb";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#000000";
                  }}
                >
                  Support@lucrewisefin.com
                </a>
              </div>
              <div>
                {isChinese ? "电话：" : "Call: "}
                <a
                  href="tel:+19259688388"
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#2563eb";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#000000";
                  }}
                >
                  +1 (925)968-8388
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}
