import { getSanityPage } from "@/lib/get-sanity-page";
import { getPagesByCategory } from "@/lib/sanity";
import BlogIndex from "@/components/BlogIndex";

export default async function Page() {
  // Blog landing page content (prefer EN, fallback to ZH)
  const contentEn = await getSanityPage("blog", "en");
  const content = contentEn || (await getSanityPage("blog", "zh"));

  // All blog posts (slug starting with blog-)
  let posts = await getPagesByCategory("blog-", "en");
  if (!posts || posts.length === 0) {
    // If no EN posts, fallback to ZH
    posts = await getPagesByCategory("blog-", "zh");
  }
  const onlyPosts = Array.isArray(posts)
    ? posts.filter(
        (p) => p.slug?.current && p.slug.current !== "blog" && p.slug.current !== "blogs"
      )
    : [];

  if (!content && onlyPosts.length === 0) {
    return (
      <main style={{ padding: "3rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
        <h1>Page not found</h1>
        <p>The requested page could not be found in Sanity.</p>
      </main>
    );
  }

  return <BlogIndex pageContent={content} posts={onlyPosts} isChinese={false} />;
}

