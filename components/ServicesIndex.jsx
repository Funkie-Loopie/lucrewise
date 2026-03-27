"use client";

import Link from 'next/link';
import PortableTextRenderer from '@/lib/portable-text-renderer';

/**
 * Extract a clean excerpt from portable text blocks.
 * Prefers complete sentences, falls back to word boundary truncation.
 */
function portableTextExcerpt(blocks, maxLen = 130) {
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

  if (!plain || plain.length <= maxLen) return plain;

  // Try to cut at sentence end within limit
  const sentenceEnd = plain.slice(0, maxLen).search(/[.!?][^.!?]*$/);
  if (sentenceEnd > maxLen * 0.5) return plain.slice(0, sentenceEnd + 1);

  // Fall back to word boundary
  const wordEnd = plain.slice(0, maxLen).lastIndexOf(' ');
  return plain.slice(0, wordEnd > 0 ? wordEnd : maxLen) + '…';
}

const SERVICE_ICONS = {
  'pre-ipo-opportunities': '🚀',
  'tax-planning':          '🧾',
  'retirement-planning':   '🏦',
  'estate-planning':       '🏛️',
};

export default function ServicesIndex({ pageContent, services, isChinese = false }) {
  const title = pageContent?.title || (isChinese ? '服务' : 'Services');
  const richContent = pageContent?.content?.length > 0 ? pageContent.content : null;

  return (
    <main>
      <section className="about-hero section--light">
        <div className="container">
          <p className="about-hero__label">Our Services</p>
          <h1 className="about-hero__title">{title}</h1>
          {pageContent?.text && (
            <p className="about-hero__intro">{pageContent.text}</p>
          )}
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => {
              const excerpt = service.text || portableTextExcerpt(service.content);
              return (
                <Link key={service.slug} href={service.href} className="service-card">
                  <div className="service-card__inner">
                    <div className="service-card__icon">
                      {SERVICE_ICONS[service.slug] || '📋'}
                    </div>
                    <h2 className="service-card__title">{service.title}</h2>
                    {excerpt && <p className="service-card__desc">{excerpt}</p>}
                    <span className="service-card__cta">
                      {isChinese ? '了解更多' : 'Learn more'} →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {richContent && (
        <section className="section section--white" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="services-rich-content">
              <PortableTextRenderer content={richContent} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
