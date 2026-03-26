import React from "react";
import Link from "next/link";

const SERVICE_ABBRS = {
  'pre-ipo-opportunities': 'IPO',
  'tax-planning':          'TAX',
  'retirement-planning':   'RET',
  'estate-planning':       'EST',
};

function truncate(text, max = 140) {
  if (!text || text.length <= max) return text;
  return text.slice(0, max).trimEnd() + '…';
}

function plainText(content) {
  if (!Array.isArray(content)) return '';
  return content
    .filter((b) => b._type === 'block' && Array.isArray(b.children))
    .map((b) => b.children.map((c) => c.text || '').join(''))
    .join(' ')
    .trim();
}

export default function HomePageContent({ services, isChinese, homeData: d }) {
  const prefix = isChinese ? "/zh" : "";
  const stats = d?.stats || [];

  return (
    <>
      {/* ── Hero ── */}
      <section className="home-hero">
        <div className="container">
          {d?.heroLabel && <p className="section-label section-label--light">{d.heroLabel}</p>}
          {d?.heroHeadline && <h1 className="home-hero__headline">{d.heroHeadline}</h1>}
          {d?.heroSubText && <p className="home-hero__sub">{d.heroSubText}</p>}
          <div className="home-hero__actions">
            {d?.heroCtaServices && (
              <Link href={`${prefix}/services`} className="btn btn--lg btn-white">
                {d.heroCtaServices}
              </Link>
            )}
            {d?.heroCtaBook && d?.bookingUrl && (
              <a
                href={d.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--lg btn-outline-white"
              >
                {d.heroCtaBook}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      {stats.length > 0 && (
        <section className="section section--white">
          <div className="container">
            <div className="home-stats">
              {stats.map((stat, i) => (
                <div key={stat._key || i} className="home-stat-card">
                  <div className="home-stat-card__value">{stat.value}</div>
                  <div className="home-stat-card__label">{stat.label}</div>
                  <p className="home-stat-card__desc">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Services ── */}
      <section className="section section--light">
        <div className="container">
          <div className="home-section-header">
            {d?.servicesSectionLabel && <span className="section-label">{d.servicesSectionLabel}</span>}
            {d?.servicesSectionTitle && <h2 className="home-section-header__title">{d.servicesSectionTitle}</h2>}
            {d?.servicesSectionSubText && <p className="home-section-header__sub">{d.servicesSectionSubText}</p>}
          </div>

          <div className="home-services-grid">
            {services.map((service) => {
              const desc = service.text || truncate(plainText(service.content));
              return (
                <div key={service.slug} className="home-service-card card card--elevated">
                  <div className="home-service-card__icon">
                    {SERVICE_ABBRS[service.slug] || '◆'}
                  </div>
                  <h3 className="home-service-card__title">{service.title}</h3>
                  {desc && <p className="home-service-card__desc">{desc}</p>}
                  <Link href={`${prefix}/services/${service.slug}`} className="link-arrow">
                    {d?.servicesLearnMoreLabel || 'Learn More'} →
                  </Link>
                </div>
              );
            })}
          </div>

          {d?.servicesViewAllLabel && (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href={`${prefix}/services`} className="btn btn-outline">
                {d.servicesViewAllLabel}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── About ── */}
      <section className="section section--white">
        <div className="container">
          <div className="home-about">
            <div>
              {d?.aboutLabel && <span className="section-label">{d.aboutLabel}</span>}
              {d?.aboutTitle && <h2 className="home-about__title">{d.aboutTitle}</h2>}
              {d?.aboutBody && <p className="home-about__body">{d.aboutBody}</p>}
              {d?.aboutCtaLabel && (
                <Link href={`${prefix}/about-us`} className="btn btn-primary">
                  {d.aboutCtaLabel}
                </Link>
              )}
            </div>

            {stats.length > 0 && (
              <div className="home-about__panel">
                {stats.map((stat, i) => (
                  <React.Fragment key={stat._key || i}>
                    {i > 0 && <div className="home-about__panel-divider" />}
                    <div className="home-about__panel-stat">
                      <span className="home-about__panel-num">{stat.value}</span>
                      <span className="home-about__panel-text">{stat.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
