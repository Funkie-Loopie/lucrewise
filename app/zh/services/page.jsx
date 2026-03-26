import { getSanityPage } from "@/lib/get-sanity-page";
import ServicesIndex from "@/components/ServicesIndex";

const SERVICE_SLUGS = [
  { slug: 'pre-ipo-opportunities', path: 'pre-ipo-opportunities' },
  { slug: 'tax-planning',          path: 'tax-planning' },
  { slug: 'retirement-planning',   path: 'retirement-planning' },
  { slug: 'estate-planning',       path: 'estate-planning' },
];

export default async function Page() {
  // Prefer ZH for the landing page content, fallback to EN
  const contentZh = await getSanityPage('services', 'zh');
  const pageContent = contentZh || (await getSanityPage('services', 'en'));

  const servicePages = await Promise.all(
    SERVICE_SLUGS.map(async ({ slug, path }) => {
      const dataZh = await getSanityPage(slug, 'zh');
      const data = dataZh || (await getSanityPage(slug, 'en'));
      return {
        slug,
        href: `/zh/services/${path}`,
        title: data?.title || slug,
        text: data?.text || null,
        content: data?.content || null,
      };
    })
  );

  return (
    <ServicesIndex
      pageContent={pageContent}
      services={servicePages}
      isChinese={true}
    />
  );
}
