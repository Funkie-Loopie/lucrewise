import { getSanityPage } from "@/lib/get-sanity-page";
import ServicesIndex from "@/components/ServicesIndex";

const SERVICE_SLUGS = [
  { slug: 'tax-consultation',         path: 'tax-consultation' },
  { slug: 'insurance-consulting',     path: 'insurance-consulting' },
  { slug: 'investment-opportunities', path: 'investment-opportunities' },
  { slug: 'business-all-in-one',      path: 'business-all-in-one' },
  { slug: 'philanthropic-service',    path: 'philanthropic-service' },
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
