'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';

const TAG_LABELS = {
  'Overall Planning': { en: 'Overall Planning', zh: '整體規劃' },
  'Investment Strategy': { en: 'Investment Strategy', zh: '投資策略' },
  'Insurance Guidance': { en: 'Insurance Guidance', zh: '保險規劃' },
  'Retirement Planning': { en: 'Retirement Planning', zh: '退休規劃' },
  'Employer Services': { en: 'Employer Services', zh: '雇主服務' },
  'Tax Planning': { en: 'Tax Planning', zh: '稅務規劃' },
};

function getTagLabel(tag, isChinese) {
  const entry = TAG_LABELS[tag];
  if (!entry) return tag;
  return isChinese ? entry.zh : entry.en;
}

export default function BlogIndex({ pageContent, posts, isChinese = false }) {
  const [activeTag, setActiveTag] = useState('all');

  const tags = useMemo(() => {
    const all = new Set();
    posts.forEach((post) => {
      if (post.tag) {
        all.add(post.tag);
      }
    });
    return Array.from(all);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeTag === 'all') return posts;
    return posts.filter((post) => post.tag === activeTag);
  }, [posts, activeTag]);

  return (
    <main style={{ padding: '3rem 1.5rem', maxWidth: 960, margin: '0 auto' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
          }}
        >
          {pageContent?.title || (isChinese ? '博客' : 'Blog')}
        </h1>
        {pageContent?.text && (
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>{pageContent.text}</p>
        )}

        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setActiveTag('all')}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                border: '1px solid #e5e7eb',
                backgroundColor: activeTag === 'all' ? '#111827' : '#ffffff',
                color: activeTag === 'all' ? '#ffffff' : '#111827',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              {isChinese ? '全部' : 'All'}
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '999px',
                  border: '1px solid #e5e7eb',
                  backgroundColor: activeTag === tag ? '#111827' : '#ffffff',
                  color: activeTag === tag ? '#ffffff' : '#111827',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                {getTagLabel(tag, isChinese)}
              </button>
            ))}
          </div>
        )}
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredPosts.map((post) => {
          const slug = post.slug?.current || '';
          const shortSlug = slug.replace(/^blog-/, '');
          const basePath = isChinese ? '/zh/blog' : '/blog';
          const href = `${basePath}/${shortSlug}`;

          return (
            <article
              key={post._id}
              style={{
                padding: '1.5rem 1.25rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff',
              }}
            >
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                <Link href={href} style={{ color: '#111827', textDecoration: 'none' }}>
                  {post.title || slug}
                </Link>
              </h2>

              {post.tag && (
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: '#4b5563',
                    marginBottom: '0.5rem',
                  }}
                >
                  {getTagLabel(post.tag, isChinese)}
                </div>
              )}

              {post.text && (
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#4b5563',
                    lineHeight: 1.5,
                    marginBottom: '0.5rem',
                  }}
                >
                  {post.text.length > 200 ? `${post.text.slice(0, 200)}…` : post.text}
                </p>
              )}

              <Link
                href={href}
                style={{ fontSize: '0.9rem', color: '#2563eb', fontWeight: 500 }}
              >
                Read more →
              </Link>
            </article>
          );
        })}

        {filteredPosts.length === 0 && (
          <p style={{ color: '#6b7280' }}>No posts found for this tag.</p>
        )}
      </section>
    </main>
  );
}

