import { getSanityPage } from "@/lib/get-sanity-page";
import ContentPage from "@/components/ContentPage";

export default async function Page() {
  const content = await getSanityPage('%e6%96%87%e6%a1%88-%e5%85%88%e6%9c%89%e9%b8%a1%e8%bf%98%e6%98%af%e5%85%88%e6%9c%89%e8%9b%8b%ef%bc%9f', 'zh');
  
  if (!content) {
    return (
      <main style={{ padding: "3rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
        <h1>Page not found</h1>
        <p>The requested page could not be found in Sanity.</p>
      </main>
    );
  }
  
  return <ContentPage content={content} />;
}
