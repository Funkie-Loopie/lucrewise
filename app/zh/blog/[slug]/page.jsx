import { getSanityPage } from "@/lib/get-sanity-page";
import { getSiteSettings } from "@/lib/sanity";
import BlogPostPage from "@/components/BlogPostPage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const contentZh = await getSanityPage(slug, "zh");
  const content = contentZh || (await getSanityPage(slug, "en"));
  if (!content) return {};
  return {
    title: content.title,
    description: content.text || undefined,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  // 中文頁面優先抓 zh，沒有就 fallback 到 en
  const [contentZh, settings] = await Promise.all([
    getSanityPage(slug, "zh"),
    getSiteSettings(),
  ]);
  const content = contentZh || (await getSanityPage(slug, "en"));

  if (!content) {
    return (
      <main style={{ padding: "3rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
        <h1>Page not found</h1>
        <p>The requested blog post could not be found in Sanity.</p>
      </main>
    );
  }

  return (
    <BlogPostPage
      content={content}
      isChinese={true}
      disclaimer={settings?.blogDisclaimerZh || null}
    />
  );
}

