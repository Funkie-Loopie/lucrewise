"use client";

import Link from 'next/link';
import PortableTextRenderer from '@/lib/portable-text-renderer';

// Extract a plain-text preview from Portable Text blocks
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
  'tax-consultation':          '🧾',
  'insurance-consulting':      '🛡️',
  'investment-opportunities':  '📈',
  'business-all-in-one':       '💼',
  'philanthropic-service':     '🤝',
};

export default function ServicesIndex({ pageContent, services, isChinese = false }) {
  return (
    <main style={{ padding: '3rem 1.5rem', maxWidth: 960, margin: '0 auto' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          {pageContent?.title || (isChinese ? '服务' : 'Services')}
        </h1>
        {pageContent?.content && pageContent.content.length > 0 && (
          <div style={{ color: '#4b5563', maxWidth: 640 }}>
            <PortableTextRenderer content={pageContent.content} />
          </div>
        )}
      </header>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {services.map((service) => (
          <Link
            key={service.slug}
            href={service.href}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <article
              style={{
                height: '100%',
                padding: '1.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff',
                transition: 'box-shadow 0.2s, border-color 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.12)';
                e.currentTarget.style.borderColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                {SERVICE_ICONS[service.slug] || '📋'}
              </div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: '#111827' }}>
                {service.title}
              </h2>
              {(() => {
                const desc = portableTextPreview(service.content);
                return desc ? (
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.6 }}>
                    {desc}
                  </p>
                ) : null;
              })()}
              <div style={{ marginTop: '1.25rem', fontSize: '0.875rem', color: '#2563eb', fontWeight: 500 }}>
                {isChinese ? '了解更多 →' : 'Learn more →'}
              </div>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}
