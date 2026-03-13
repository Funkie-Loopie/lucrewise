import PortableTextRenderer from '@/lib/portable-text-renderer'

export default function ContentPage({ content }) {
  return (
    <main style={{ padding: "3rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>
        {content.title}
      </h1>

      {/* Rich Text Content (Portable Text) */}
      {content.content && content.content.length > 0 ? (
        <PortableTextRenderer content={content.content} />
      ) : (
        /* Fallback to raw HTML if Portable Text is not available */
        content.rawHTML && (
          <div dangerouslySetInnerHTML={{ __html: content.rawHTML }} />
        )
      )}
    </main>
  );
}

