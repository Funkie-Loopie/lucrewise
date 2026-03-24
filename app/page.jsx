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
      abbr: "INV",
    },
    {
      title: isChinese ? "保险规划" : "Insurance Guidance",
      description: isChinese
        ? "我们为个人和企业提供量身定制的保险规划，包括家庭保障、资产增长、财富传承和商业保障。"
        : "We provide insurance planning tailored to meet diverse needs for individuals and business, including family protection, asset growth, wealth inheritance and business protection.",
      path: `${prefix}/services/insurance-consulting`,
      abbr: "INS",
    },
    {
      title: isChinese ? "税务规划" : "Tax Planning",
      description: isChinese
        ? "我们提供全面的税务咨询服务，帮助您和您的企业最大化税务节省，适用于美国居民和非美国投资者。"
        : "We offer comprehensive tax consultation services to help you and your business maximize your tax savings, for both US residents and non-US investors.",
      path: `${prefix}/services/tax-consultation`,
      abbr: "TAX",
    },
  ];

  const stats = [
    {
      label: isChinese ? "专业能力" : "Expertise",
      value: "10+",
      description: isChinese
        ? "我们的认证理财规划师团队拥有多年行业经验，为您提供实现财务目标所需的专业知识。"
        : "Years of combined expertise from our certified financial planning team.",
    },
    {
      label: isChinese ? "服务年限" : "Years of Service",
      value: "20+",
      description: isChinese
        ? "凭借数十年的经验，我们已指导无数客户实现财务赋权和成功。"
        : "Decades of guiding clients toward financial empowerment and lasting success.",
    },
    {
      label: isChinese ? "发布洞察" : "Published Insights",
      value: "100+",
      description: isChinese
        ? "通过我们关于理财规划、投资策略和税务咨询的最新洞察，随时了解最新信息。"
        : "In-depth articles covering financial planning, investment strategies, and tax consultation.",
    },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="home-hero">
        <div className="container">
          <p className="section-label section-label--light">
            {isChinese ? "专业财富管理" : "Trusted Financial Advisory"}
          </p>
          <h1 className="home-hero__headline">
            {isChinese ? "让每个人更智慧、更富有" : "Make Everyone Wiser\u00a0& Wealthier"}
          </h1>
          <p className="home-hero__sub">
            {isChinese
              ? "通过投资策略、税务咨询和保险规划，帮助您实现长期财务目标。"
              : "Empowering individuals and families through investment strategies, tax consultation, and tailored insurance planning."}
          </p>
          <div className="home-hero__actions">
            <Link href={`${prefix}/services`} className="btn btn--lg btn-white">
              {isChinese ? "探索服务" : "Explore Services"}
            </Link>
            <a
              href="https://calendly.com/pljw-financial/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--lg btn-outline-white"
            >
              {isChinese ? "预约咨询" : "Book a Consultation"}
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section section--white">
        <div className="container">
          <div className="home-stats">
            {stats.map((stat, i) => (
              <div key={i} className="home-stat-card">
                <div className="home-stat-card__value">{stat.value}</div>
                <div className="home-stat-card__label">{stat.label}</div>
                <p className="home-stat-card__desc">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section section--light">
        <div className="container">
          <div className="home-section-header">
            <span className="section-label">{isChinese ? "我们的专业" : "What We Offer"}</span>
            <h2 className="home-section-header__title">
              {isChinese ? "服务" : "Our Services"}
            </h2>
            <p className="home-section-header__sub">
              {isChinese
                ? "为个人和企业主提供一系列金融服务"
                : "A full suite of financial services for individuals and business owners"}
            </p>
          </div>

          <div className="home-services-grid">
            {services.map((service, i) => (
              <div key={i} className="home-service-card card card--elevated">
                <div className="home-service-card__icon">{service.abbr}</div>
                <h3 className="home-service-card__title">{service.title}</h3>
                <p className="home-service-card__desc">{service.description}</p>
                <Link href={service.path} className="link-arrow">
                  {isChinese ? "了解更多" : "Learn More"} →
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href={`${prefix}/services`} className="btn btn-outline">
              {isChinese ? "查看所有服务" : "View All Services"}
            </Link>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="section section--white">
        <div className="container">
          <div className="home-about">
            <div>
              <span className="section-label">
                {isChinese ? "您的财务成功伙伴" : "Your Partner in Financial Success"}
              </span>
              <h2 className="home-about__title">
                {isChinese ? "丰富每个人" : "Enrich Everyone"}
              </h2>
              <p className="home-about__body">
                {isChinese
                  ? "在 Lucrewise，我们自信地履行使命，帮助个人实现财务智慧和财富。我们在提供独特的投资策略、全面的税务咨询和量身定制的保险规划服务方面表现出色。我们独特的方法确保每位客户都能获得个性化指导，使他们能够做出明智的决策并确保财务未来。"
                  : "At Lucrewise, we fulfill our mission to empower individuals to achieve financial wisdom and wealth. We excel in providing unique investment strategies, comprehensive tax consultation, and tailored insurance planning. Our approach ensures that each client receives personalized guidance to make informed decisions and secure their financial future."}
              </p>
              <Link href={`${prefix}/about-us`} className="btn btn-primary">
                {isChinese ? "了解我们" : "About Us"}
              </Link>
            </div>

            <div className="home-about__panel">
              <div className="home-about__panel-stat">
                <span className="home-about__panel-num">10+</span>
                <span className="home-about__panel-text">
                  {isChinese ? "年专业经验" : "Years of Expertise"}
                </span>
              </div>
              <div className="home-about__panel-divider" />
              <div className="home-about__panel-stat">
                <span className="home-about__panel-num">20+</span>
                <span className="home-about__panel-text">
                  {isChinese ? "年服务历史" : "Years of Service"}
                </span>
              </div>
              <div className="home-about__panel-divider" />
              <div className="home-about__panel-stat">
                <span className="home-about__panel-num">100+</span>
                <span className="home-about__panel-text">
                  {isChinese ? "份发布洞察" : "Published Insights"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
