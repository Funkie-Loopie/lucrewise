// Example: How to use Sanity data in your pages
// Replace the import statement in your page components with this pattern

import { getPageBySlug } from "@/lib/sanity";
import ContentPage from "@/components/ContentPage";

export default async function Page() {
  // Fetch data from Sanity instead of JSON file
  const content = await getPageBySlug('services', 'en');
  
  // Handle case where page doesn't exist
  if (!content) {
    return (
      <main style={{ padding: "3rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
        <h1>Page not found</h1>
        <p>The requested page could not be found.</p>
      </main>
    );
  }
  
  // Use the same ContentPage component - it works with Sanity data!
  return <ContentPage content={content} />;
}

// For Chinese pages, use:
// const content = await getPageBySlug('services', 'zh');

