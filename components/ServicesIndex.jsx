"use client";

import Link from 'next/link';

function portableTextPreview(blocks, maxLen = 120) {
  if (!Array.isArray(blocks)) return '';
  const plain = blocks
    .filter((b) => b._type === 'block' && Array.isArray(b.children))
    .map((b) =>
      b.children
        .filter((c) => c._type === 'span' && typeof c.text === 'string')
        .map((c) => c.text)
        .join('')
    )
    .join(' ')
    .trim();
  return plain.length > maxLen ? `${plain.slice(0, maxLen)}…` : plain;
}

const SERVICE_ICONS = {
  'pre-ipo-opportunities': '🚀',
  'tax-planning':          '🧾',
  'retirement-planning':   '🏦',
  'estate-planning':       '🏛️',
};

export default function ServicesIndex({ pageContent, services, isChinese = false }) {
  const title = pageContent?.title || (isChinese ? '服务' : 'Services');
  const desc = pageContent?.text || null;

  return (
    <main className="inner-page">
      <header className="page-header">
        <h1 className="page-header__title">{title}</h1>
        {desc && <p className="page-header__desc">{desc}</p>}
      </header>

      <section className="services-grid">
        {services.map((service) => (
          <Link key={service.slug} href={service.href} className="service-card">
            <div className="service-card__icon">
              {SERVICE_ICONS[service.slug] || '📋'}
            </div>
            <h2 className="service-card__title">{service.title}</h2>
            {(() => {
              const desc = portableTextPreview(service.content);
              return desc ? <p className="service-card__desc">{desc}</p> : null;
            })()}
            <span className="service-card__cta">
              {isChinese ? '了解更多' : 'Learn more'} →
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
