import { getSanityPage } from "@/lib/get-sanity-page";
import { getHomePage } from "@/lib/sanity";
import HomePageContent from "@/components/HomePageContent";

const SERVICE_SLUGS = [
  'pre-ipo-opportunities',
  'tax-planning',
  'retirement-planning',
  'estate-planning',
];

export default async function Page() {
  const [homeData, services] = await Promise.all([
    getHomePage('en'),
    Promise.all(
      SERVICE_SLUGS.map(async (slug) => {
        const data = await getSanityPage(slug, 'en');
        return {
          slug,
          title: data?.title || slug,
          text: data?.text || null,
          content: data?.content || null,
        };
      })
    ),
  ]);

  return <HomePageContent services={services} isChinese={false} homeData={homeData} />;
}
