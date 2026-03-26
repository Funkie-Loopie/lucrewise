import { getAboutPage } from "@/lib/sanity";
import AboutPage from "@/components/AboutPage";

export default async function Page() {
  const data = await getAboutPage('en');

  if (!data) {
    return (
      <main style={{ padding: "3rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
        <h1>Page not found</h1>
        <p>The About Us page could not be found in Sanity.</p>
      </main>
    );
  }

  return <AboutPage data={data} />;
}
