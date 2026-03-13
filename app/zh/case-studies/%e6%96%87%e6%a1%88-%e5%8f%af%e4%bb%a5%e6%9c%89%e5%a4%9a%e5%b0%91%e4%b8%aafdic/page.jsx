import { getSanityPage } from "@/lib/get-sanity-page";
import ContentPage from "@/components/ContentPage";

export default async function Page() {
  const content = await getSanityPage('%e6%96%87%e6%a1%88-%e5%8f%af%e4%bb%a5%e6%9c%89%e5%a4%9a%e5%b0%91%e4%b8%aafdic', 'zh');
  
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
