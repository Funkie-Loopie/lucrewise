import PortableTextRenderer from '@/lib/portable-text-renderer'

export default function ContentPage({ content }) {
  return (
    <main className="content-page">
      <header className="page-header">
        <h1 className="page-header__title">{content.title}</h1>
      </header>

      {content.content && content.content.length > 0 ? (
        <PortableTextRenderer content={content.content} />
      ) : (
        content.rawHTML && (
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: content.rawHTML }} />
        )
      )}
    </main>
  )
}
