import { getSanityPage } from "@/lib/get-sanity-page";
import ContentPage from "@/components/ContentPage";

export default async function Page() {
  const content = await getSanityPage('%e6%96%87%e6%a1%88-%e9%ab%98%e5%88%a9%e7%8e%87%e5%a6%82%e4%bd%95%e5%bd%b1%e5%93%8d%e6%88%91%e4%bb%ac', 'zh');
  
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
