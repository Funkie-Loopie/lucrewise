"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const isChinese = pathname.startsWith("/zh");
  const prefix = isChinese ? "/zh" : "";

  const services = [
    {
      title: isChinese ? "投资机会" : "Investment Opportunities",
      description: isChinese 
        ? "我们提供独特的投资机会，包括私募、房地产、高收益固定收益产品、结构化产品等。"
        : "We provide unique investment opportunities, including private placements, real estate, high-yield fixed-income products, structured products, and more.",
      path: `${prefix}/services/investment-opportunities`,
      icon: "📈"
    },
    {
      title: isChinese ? "保险规划" : "Insurance Guidance",
      description: isChinese
        ? "我们为个人和企业提供量身定制的保险规划，包括家庭保障、资产增长、财富传承和商业保障。"
        : "We provide insurance planning tailored to meet diverse needs for individuals and business, including family protection, asset growth, wealth inheritance and business protection.",
      path: `${prefix}/services/insurance-consulting`,
      icon: "🛡️"
    },
    {
      title: isChinese ? "税务规划" : "Tax Planning",
      description: isChinese
        ? "我们提供全面的税务咨询服务，帮助您和您的企业最大化税务节省，适用于美国居民和非美国投资者。"
        : "We offer comprehensive tax consultation services to help you and your business maximize your tax savings, for both US residents and non-US investors.",
      path: `${prefix}/services/tax-consultation`,
      icon: "📊"
    }
  ];

  const stats = [
    {
      label: isChinese ? "专业能力" : "Expertise",
      value: "10+",
      description: isChinese
        ? "我们的认证理财规划师团队拥有多年行业经验，为您提供实现财务目标所需的专业知识。"
        : "Our team of certified financial planners have years of experience in the industry, providing you with the expertise you need to achieve your financial goals."
    },
    {
      label: isChinese ? "经验" : "Experience",
      value: "20+",
      description: isChinese
        ? "凭借数十年的经验，我们已指导无数客户实现财务赋权和成功。"
        : "With decades of experience, we have guided countless clients towards financial empowerment and success."
    },
    {
      label: isChinese ? "新闻与洞察" : "News & Insights",
      value: "100+",
      description: isChinese
        ? "通过我们关于理财规划、投资策略和税务咨询的最新新闻和洞察，随时了解最新信息。"
        : "Stay informed with our latest news and insights on financial planning, investment strategies, and tax consultation."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
        padding: "6rem 1.5rem",
        textAlign: "center",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}>
          <h1 style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700,
            color: "#1f2937",
            marginBottom: "1.5rem",
            lineHeight: 1.2,
          }}>
            {isChinese ? "让每个人更智慧、更富有" : "Make Everyone Wiser & Wealthier"}
          </h1>
          <p style={{
            fontSize: "1.25rem",
            color: "#4b5563",
            maxWidth: 700,
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}>
            {isChinese
              ? "Lucrewise 通过投资策略、税务咨询和保险规划帮助客户实现财务智慧和财富。我们提供独特的投资机会和全面规划。联系我们，开启长期财富建设之旅。"
              : "Lucrewise helps clients achieve financial wisdom and wealth through investment strategies, tax consultation, and insurance planning. We offer unique investment opportunities and overall planning. Contact us for long-term wealth building."}
          </p>
          <Link
            href={`${prefix}/services`}
            style={{
              display: "inline-block",
              padding: "1rem 2.5rem",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "0.5rem",
              fontWeight: 600,
              fontSize: "1.125rem",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(37, 99, 235, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1d4ed8";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(37, 99, 235, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(37, 99, 235, 0.2)";
            }}
          >
            {isChinese ? "立即探索" : "Explore Now"}
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: "4rem 1.5rem",
        backgroundColor: "#ffffff",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "3rem",
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                padding: "2rem",
                borderRadius: "0.75rem",
                backgroundColor: "#f9fafb",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                fontSize: "3rem",
                fontWeight: 700,
                color: "#2563eb",
                marginBottom: "0.5rem",
              }}>
                {stat.value}
              </div>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#1f2937",
                marginBottom: "1rem",
              }}>
                {stat.label}
              </h3>
              <p style={{
                fontSize: "0.9375rem",
                color: "#6b7280",
                lineHeight: 1.6,
              }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section style={{
        padding: "6rem 1.5rem",
        backgroundColor: "#f8fafc",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "4rem",
          }}>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#1f2937",
              marginBottom: "1rem",
            }}>
              {isChinese ? "服务" : "Services"}
            </h2>
            <p style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              maxWidth: 600,
              margin: "0 auto",
            }}>
              {isChinese
                ? "我们为个人和企业主提供一系列金融服务"
                : "We offer a range of financial services to individuals and business owners"}
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}>
            {services.map((service, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "1rem",
                  padding: "2.5rem",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  border: "1px solid #e5e7eb",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
                  e.currentTarget.style.borderColor = "#2563eb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <div style={{
                  fontSize: "3rem",
                  marginBottom: "1.5rem",
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#1f2937",
                  marginBottom: "1rem",
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: "1rem",
                  color: "#6b7280",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}>
                  {service.description}
                </p>
                <Link
                  href={service.path}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#2563eb",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    transition: "gap 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = "0.75rem";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = "0.5rem";
                  }}
                >
                  {isChinese ? "了解更多" : "More Details"}
                  <span style={{ fontSize: "1.25rem" }}>→</span>
                </Link>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: "center",
          }}>
            <Link
              href={`${prefix}/services`}
              style={{
                display: "inline-block",
                padding: "0.875rem 2rem",
                color: "#2563eb",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1rem",
                border: "2px solid #2563eb",
                borderRadius: "0.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2563eb";
              }}
            >
              {isChinese ? "查看所有服务" : "All Services"}
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{
        padding: "6rem 1.5rem",
        backgroundColor: "#ffffff",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "4rem",
          alignItems: "center",
        }}>
          <div>
            <h6 style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#2563eb",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
            }}>
              {isChinese ? "您的财务成功伙伴" : "Your Partner in Financial Success"}
            </h6>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#1f2937",
              marginBottom: "1.5rem",
              lineHeight: 1.2,
            }}>
              {isChinese ? "丰富每个人" : "Enrich Everyone"}
            </h2>
            <p style={{
              fontSize: "1.125rem",
              color: "#4b5563",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}>
              {isChinese
                ? "在 Lucrewise，我们自信地履行使命，帮助个人实现财务智慧和财富。我们在提供独特的投资策略、全面的税务咨询和量身定制的保险规划服务方面表现出色。我们独特的方法确保每位客户都能获得个性化指导，使他们能够做出明智的决策并确保财务未来。相信我们，自信地帮助您实现财务成功。"
                : "At Lucrewise, we confidently fulfill our mission to empower individuals to achieve financial wisdom and wealth. We excel in providing unique investment strategies, comprehensive tax consultation, and tailored insurance planning services. Our unique approach ensures that each client receives personalized guidance, empowering them to make informed decisions and secure their financial future. Trust us to help you achieve financial success with confidence."}
            </p>
            <Link
              href={`${prefix}/about-us`}
              style={{
                display: "inline-block",
                padding: "0.875rem 2rem",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                textDecoration: "none",
                borderRadius: "0.5rem",
                fontWeight: 600,
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1d4ed8";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {isChinese ? "关于我们" : "About Us"}
            </Link>
          </div>
          <div style={{
            backgroundColor: "#f9fafb",
            borderRadius: "1rem",
            padding: "3rem",
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              fontSize: "4rem",
              opacity: 0.3,
            }}>
              💼
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
