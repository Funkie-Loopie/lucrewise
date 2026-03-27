'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';

const TAG_LABELS = {
  'Pre-IPO Opportunities': { en: 'Pre-IPO Opportunities', zh: 'Pre-IPO投资' },
  'Tax Planning':          { en: 'Tax Planning',          zh: '税务规划' },
  'Retirement Planning':   { en: 'Retirement Planning',   zh: '退休规划' },
  'Estate Planning':       { en: 'Estate Planning',       zh: '遗产和传承规划' },
  'Overall Planning':      { en: 'Overall Planning',      zh: '整体规划' },
  'Insurance Guidance':    { en: 'Insurance Guidance',    zh: '保险指南' },
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
    posts.forEach((post) => { if (post.tag) all.add(post.tag); });
    return Array.from(all);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeTag === 'all') return posts;
    return posts.filter((post) => post.tag === activeTag);
  }, [posts, activeTag]);

  return (
    <main>
      <section className="about-hero section--light">
        <div className="container">
          <p className="about-hero__label">Blog</p>
          <h1 className="about-hero__title">
            {pageContent?.title || (isChinese ? '最新文章' : 'Insights & Articles')}
          </h1>
          {pageContent?.text && (
            <p className="about-hero__intro">{pageContent.text}</p>
          )}
        </div>
      </section>

      {tags.length > 0 && (
        <div className="blog-filters-bar">
          <div className="container">
            <div className="blog-filters">
              <button
                type="button"
                onClick={() => setActiveTag('all')}
                className={`blog-tag-pill${activeTag === 'all' ? ' blog-tag-pill--active' : ''}`}
              >
                {isChinese ? '全部' : 'All'}
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`blog-tag-pill${activeTag === tag ? ' blog-tag-pill--active' : ''}`}
                >
                  {getTagLabel(tag, isChinese)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="section section--white">
        <div className="container">
        <div className="blog-posts">
        {filteredPosts.map((post) => {
          const slug = post.slug?.current || '';
          const shortSlug = slug.replace(/^blog-/, '');
          const href = `${isChinese ? '/zh/blog' : '/blog'}/${shortSlug}`;

          return (
            <article key={post._id} className="blog-article">
              {post.tag && (
                <span className="blog-post-tag">{getTagLabel(post.tag, isChinese)}</span>
              )}
              <h2>
                <Link href={href} className="blog-post-title">
                  {post.title || slug}
                </Link>
              </h2>
              {post.text && (
                <p className="blog-post-excerpt">
                  {post.text.length > 200 ? `${post.text.slice(0, 200)}…` : post.text}
                </p>
              )}
              <Link href={href} className="blog-post-read-more">
                {isChinese ? '阅读更多' : 'Read more'} →
              </Link>
            </article>
          );
        })}

        {filteredPosts.length === 0 && (
          <p className="page-header__desc">
            {isChinese ? '暂无文章。' : 'No posts found for this tag.'}
          </p>
        )}
        </div>
        </div>
      </section>
    </main>
  );
}
