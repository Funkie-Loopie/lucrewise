import { getAboutPage } from "@/lib/sanity";
import AboutPage from "@/components/AboutPage";

export default async function Page() {
  const data = await getAboutPage('zh');

  if (!data) {
    return (
      <main style={{ padding: "3rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
        <h1>找不到页面</h1>
        <p>在 Sanity 中找不到关于我们页面。</p>
      </main>
    );
  }

  return <AboutPage data={data} />;
}
