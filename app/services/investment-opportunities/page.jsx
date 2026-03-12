import content from "@/data/investment-opportunities.json";

export default function Page() {
  return (
    <main style={{ padding: "3rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>
        {content.title}
      </h1>

      {/* 纯文本版，方便 SEO / 预览 */}
      <p style={{ marginBottom: "2rem", lineHeight: 1.6 }}>{content.text}</p>

      {/* 原始 HTML 版，保留你在 WordPress 里的布局 */}
      <div dangerouslySetInnerHTML={{ __html: content.rawHTML }} />
    </main>
  );
}
