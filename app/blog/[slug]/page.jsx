import { getSanityPage } from "@/lib/get-sanity-page";
import { getSiteSettings } from "@/lib/sanity";
import BlogPostPage from "@/components/BlogPostPage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const contentEn = await getSanityPage(slug, "en");
  const content = contentEn || (await getSanityPage(slug, "zh"));
  if (!content) return {};
  return {
    title: content.title,
    description: content.text || undefined,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  // Prefer English for /blog, fallback to Chinese
  const [contentEn, settings] = await Promise.all([
    getSanityPage(slug, "en"),
    getSiteSettings(),
  ]);
  const content = contentEn || (await getSanityPage(slug, "zh"));

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
      isChinese={false}
      disclaimer={settings?.blogDisclaimerEn || null}
    />
  );
}

