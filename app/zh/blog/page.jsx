import { getSanityPage } from "@/lib/get-sanity-page";
import { getPagesByCategory } from "@/lib/sanity";
import BlogIndex from "@/components/BlogIndex";

export default async function Page() {
  // Blog landing page content (prefer ZH, fallback to EN)
  const contentZh = await getSanityPage("blog", "zh");
  const content = contentZh || (await getSanityPage("blog", "en"));

  // All blog posts (slug starting with blog-)
  let posts = await getPagesByCategory("blog-", "zh");
  if (!posts || posts.length === 0) {
    // If no ZH posts, fallback to EN
    posts = await getPagesByCategory("blog-", "en");
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

  return <BlogIndex pageContent={content} posts={onlyPosts} isChinese={true} />;
}
