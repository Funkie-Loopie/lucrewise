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
  const pageContent = await getSanityPage('services', 'en');

  const servicePages = await Promise.all(
    SERVICE_SLUGS.map(async ({ slug, path }) => {
      const data = await getSanityPage(slug, 'en');
      return {
        slug,
        href: `/services/${path}`,
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
      isChinese={false}
    />
  );
}
