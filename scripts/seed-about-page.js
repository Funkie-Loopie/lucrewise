/**
 * Seed the aboutPage documents (EN + ZH) into Sanity.
 * Run with: node scripts/seed-about-page.js
 *
 * Data source: xml/lucrewisefinancial.WordPress.2025-12-10 (1).xml
 * (about-us-2 = EN, 关于我们 = ZH)
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
dotenv.config({ path: '.env' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fhqlqt4e',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ── English ────────────────────────────────────────────────────────────────
const aboutPageEn = {
  _id: 'aboutPage-en',
  _type: 'aboutPage',
  language: 'en',

  pageTitle: 'Fostering financial wisdom for you',

  intro:
    'With over 10 years of experience, our team has an exceptional track record of helping our clients achieve their financial goals. We take a personalized approach to create tailored solutions that align with your unique objectives.',

  founders: [
    {
      _key: 'founder-shannon-en',
      name: 'Shannon Wang',
      title: 'Founder & CEO',
      intro:
        'With a strong foundation in financial risk analysis honed over seven years at Berkshire Hathaway, Shannon Wang brings a wealth of expertise and a proven track record of excellence to her role as Founder and CEO of Lucrewise Financial. Her academic journey began at the University of California, Berkeley, where she earned both a master\'s and Ph.D. in Engineering, cultivating a rigorous analytical mindset that she seamlessly transitioned into the financial services industry. Over the past seven years, Shannon has further expanded her skill set, earning licenses in securities, tax, and insurance, and demonstrating her commitment to continuous growth and adaptability.\n\nAs a respected thought leader, Shannon is frequently invited as a guest speaker at top-tier institutions, including UC Berkeley and Stanford University, where she shares her insights on financial strategy, risk management, and innovation. Her entrepreneurial vision and multidisciplinary expertise led her to establish Lucrewise Financial, a firm dedicated to providing tailored, forward-thinking financial solutions that empower clients to achieve their goals.',
      // No photo asset yet — upload manually in Studio or extend this script
      // photo: { ... }
    },
    {
      _key: 'founder-roy-en',
      name: 'Roy Xu',
      title: 'Co-Founder',
      intro:
        'Roy Xu is the co-founder of Lucrewise Financial and holds a Ph.D. in City Economics from UC Berkeley, where his research focused on the real estate economies of major cities in China and the United States. Prior to co-founding Lucrewise, Roy built a strong foundation as a seasoned data scientist in the high-tech industry. His analytical expertise and technological acumen have been pivotal in shaping Lucrewise\'s innovative approach to financial services.\n\nDriven by a passion for real estate, Roy obtained his real estate license, enabling him to explore investment opportunities with a deeper perspective. His unique combination of data science expertise and real estate knowledge allows Lucrewise to deliver data-driven insights and tailored strategies, empowering clients to build and grow their wealth effectively.',
    },
  ],
}

// ── Chinese ────────────────────────────────────────────────────────────────
const aboutPageZh = {
  _id: 'aboutPage-zh',
  _type: 'aboutPage',
  language: 'zh',

  pageTitle: '关于我们',

  intro:
    '我们拥有超过十年的经验，在帮助客户实现财务目标方面有着出色的业绩。我们会采用个性化的方法，为您量身定制符合独特目标的解决方案。',

  founders: [
    {
      _key: 'founder-shannon-zh',
      name: 'Shannon Wang',
      title: '创始人兼首席执行官',
      intro:
        'Shannon Wang 是 Lucrewise Financial 的创始人兼首席执行官，拥有在伯克希尔·哈撒韦公司七年多的金融风险分析经验。她毕业于加州大学伯克利分校，获得工程学硕士和博士学位，培养了严谨的分析思维，并将其成功应用于金融领域。此外，她还持有证券、税务和保险领域的专业执照，进一步夯实了她在金融行业的专业实力。\n\n作为一名备受尊敬的行业专家，她经常作为特邀讲师，在包括加州大学伯克利分校和斯坦福大学在内的顶尖学府授课，为学生分享行业的前瞻洞察与实战经验。在 Lucrewise Financial，Shannon 以客户为中心，提供创新的定制化金融解决方案，帮助客户实现他们的目标。',
    },
    {
      _key: 'founder-roy-zh',
      name: 'Roy Xu',
      title: '联合创始人',
      intro:
        'Roy Xu 是 Lucrewise Financial 的联合创始人，拥有加州大学伯克利分校城市经济学博士学位，专注于研究中美主要城市的房地产经济。在共同创立 Lucrewise 之前，Roy 曾在高科技行业担任资深数据科学家，精通数据建模、机器学习与商业分析，擅长为复杂问题提供创新解决方案。他的深厚技术背景与敏锐洞察力为 Lucrewise 的金融服务创新奠定了坚实基础。\n\n出于对房地产的浓厚兴趣，Roy 考取了房地产执照，进一步深化了他对投资领域的理解。凭借数据科学与房地产的双重专业背景，他为 Lucrewise 的客户提供了独特的、以数据为驱动的洞察与定制化策略，助力客户实现财富的稳健增长。',
    },
  ],
}

async function run() {
  console.log('Seeding aboutPage documents...')

  await client.createOrReplace(aboutPageEn)
  console.log('✓ aboutPage-en created/updated')

  await client.createOrReplace(aboutPageZh)
  console.log('✓ aboutPage-zh created/updated')

  console.log('\nDone. Open Sanity Studio → About Page (EN/ZH) to upload founder photos.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
