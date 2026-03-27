import PortableTextRenderer from '@/lib/portable-text-renderer'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from '@sanity/client'
import Link from 'next/link'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fhqlqt4e',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}


/** Format "YYYY-MM-DD" → locale date string */
function formatDate(dateStr, isChinese) {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T00:00:00')
  if (isNaN(d)) return dateStr
  return isChinese
    ? d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const DEFAULT_DISCLAIMER_ZH = '免责声明：本文内容仅供参考，不构成任何投资、税务、法律或财务建议。投资有风险，过去的表现不代表未来的结果。请在做出任何财务决策之前，咨询持牌专业人士。'
const DEFAULT_DISCLAIMER_EN = 'Disclaimer: The content of this article is for informational purposes only and does not constitute investment, tax, legal, or financial advice. All investments involve risk and past performance is not indicative of future results. Please consult a licensed professional before making any financial decisions.'

export default function BlogPostPage({ content, isChinese = false, disclaimer = null }) {
  const body = content?.content || []
  const coverImage = content?.coverImage
  const date = formatDate(content?.publishedAt, isChinese)

  const backHref = isChinese ? '/zh/blog' : '/blog'
  const backLabel = isChinese ? '← 返回博客' : '← Back to Blog'
  const disclaimerText = disclaimer ?? (isChinese ? DEFAULT_DISCLAIMER_ZH : DEFAULT_DISCLAIMER_EN)

  return (
    <main className="blog-post-page">
      {/* ── Header ── */}
      <header className="blog-post-header">
        <div className="container">
          <Link href={backHref} className="blog-post-back">{backLabel}</Link>

          <h1 className="blog-post-title">{content?.title}</h1>
          {content?.subtitle && <p className="blog-post-subtitle">{content.subtitle}</p>}
          {date && <p className="blog-post-date">{isChinese ? '发表于：' : 'Published: '}{date}</p>}
        </div>
      </header>

      {/* ── Cover Image ── */}
      {coverImage?.asset?._ref && (
        <div className="blog-post-cover">
          <img
            src={urlFor(coverImage).width(1200).fit('max').auto('format').url()}
            alt={coverImage.alt || content?.title || ''}
            className="blog-post-cover__img"
          />
        </div>
      )}

      {/* ── Body ── */}
      <article className="blog-post-body">
        <div className="container">
          <div className="blog-post-body__inner">
            <PortableTextRenderer content={body} />

            <aside className="blog-disclaimer">
              <p>{disclaimerText}</p>
            </aside>
          </div>
        </div>
      </article>

      {/* ── Related Posts ── */}
      {content?.relatedPosts?.length > 0 && (
        <section className="blog-related">
          <div className="container">
            <h2 className="blog-related__heading">{isChinese ? '相关文章' : 'Related Articles'}</h2>
            <div className="blog-related__grid">
              {content.relatedPosts.map((post) => {
                const href = isChinese ? `/zh/blog/${post.slug?.current}` : `/blog/${post.slug?.current}`
                return (
                  <Link key={post._id} href={href} className="blog-related__card">
                    {post.coverImage?.asset?._ref && (
                      <div className="blog-related__thumb">
                        <img
                          src={urlFor(post.coverImage).width(400).height(225).fit('crop').auto('format').url()}
                          alt={post.coverImage.alt || post.title || ''}
                        />
                      </div>
                    )}
                    <div className="blog-related__info">
                      {post.tag && <p className="blog-related__tag">{post.tag}</p>}
                      <p className="blog-related__title">{post.title}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
