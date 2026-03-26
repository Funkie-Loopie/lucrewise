/**
 * Seed the homePage documents (EN + ZH) into Sanity.
 * Run with: node scripts/seed-homepage.js
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fhqlqt4e',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const homePageEn = {
  _id: 'homePage-en',
  _type: 'homePage',
  language: 'en',

  heroLabel: 'Trusted Financial Advisory',
  heroHeadline: 'Make Everyone Wiser & Wealthier',
  heroSubText:
    'Empowering individuals and families through investment strategies, tax consultation, and tailored insurance planning.',
  heroCtaServices: 'Explore Services',
  heroCtaBook: 'Book a Consultation',
  bookingUrl: 'https://calendly.com/pljw-financial/30min',

  stats: [
    {
      _key: 'stat-expertise',
      value: '10+',
      label: 'Expertise',
      description:
        'Years of combined expertise from our certified financial planning team.',
    },
    {
      _key: 'stat-service',
      value: '20+',
      label: 'Years of Service',
      description:
        'Decades of guiding clients toward financial empowerment and lasting success.',
    },
    {
      _key: 'stat-insights',
      value: '100+',
      label: 'Published Insights',
      description:
        'In-depth articles covering financial planning, investment strategies, and tax consultation.',
    },
  ],

  servicesSectionLabel: 'What We Offer',
  servicesSectionTitle: 'Our Services',
  servicesSectionSubText:
    'A full suite of financial services for individuals and business owners',
  servicesViewAllLabel: 'View All Services',
  servicesLearnMoreLabel: 'Learn More',

  aboutLabel: 'Your Partner in Financial Success',
  aboutTitle: 'Enrich Everyone',
  aboutBody:
    'At Golden Blue Family Office, we fulfill our mission to empower individuals to achieve financial wisdom and wealth. We excel in providing Pre-IPO opportunities, comprehensive tax planning, and tailored retirement and estate planning. Our approach ensures that each client receives personalized guidance to make informed decisions and secure their financial future.',
  aboutCtaLabel: 'About Us',
}

const homePageZh = {
  _id: 'homePage-zh',
  _type: 'homePage',
  language: 'zh',

  heroLabel: '专业财富管理',
  heroHeadline: '让每个人更智慧、更富有',
  heroSubText: '通过投资策略、税务咨询和保险规划，帮助您实现长期财务目标。',
  heroCtaServices: '探索服务',
  heroCtaBook: '预约咨询',
  bookingUrl: 'https://calendly.com/pljw-financial/30min',

  stats: [
    {
      _key: 'stat-expertise',
      value: '10+',
      label: '专业能力',
      description:
        '我们的认证理财规划师团队拥有多年行业经验，为您提供实现财务目标所需的专业知识。',
    },
    {
      _key: 'stat-service',
      value: '20+',
      label: '服务年限',
      description: '凭借数十年的经验，我们已指导无数客户实现财务赋权和成功。',
    },
    {
      _key: 'stat-insights',
      value: '100+',
      label: '发布洞察',
      description:
        '通过我们关于理财规划、投资策略和税务咨询的最新洞察，随时了解最新信息。',
    },
  ],

  servicesSectionLabel: '我们的专业',
  servicesSectionTitle: '服务',
  servicesSectionSubText: '为个人和企业主提供一系列金融服务',
  servicesViewAllLabel: '查看所有服务',
  servicesLearnMoreLabel: '了解更多',

  aboutLabel: '您的财务成功伙伴',
  aboutTitle: '丰富每个人',
  aboutBody:
    '在 Golden Blue，我们自信地履行使命，帮助个人实现财务智慧和财富。我们在提供独特的投资策略、全面的税务规划和量身定制的退休及遗产规划服务方面表现出色。我们独特的方法确保每位客户都能获得个性化指导，使他们能够做出明智的决策并确保财务未来。',
  aboutCtaLabel: '了解我们',
}

async function seed() {
  console.log('Seeding homePage-en…')
  await client.createOrReplace(homePageEn)
  console.log('✓ homePage-en')

  console.log('Seeding homePage-zh…')
  await client.createOrReplace(homePageZh)
  console.log('✓ homePage-zh')

  console.log('Done.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
