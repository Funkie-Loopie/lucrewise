import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

config({ path: path.resolve(process.cwd(), '.env.local') })
config({ path: path.resolve(process.cwd(), '.env') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fhqlqt4e'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN || ''

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const OLD_SLUGS = [
  'tax-consultation',
  'insurance-consulting',
  'investment-opportunities',
  'business-all-in-one',
  'philanthropic-service',
]

const NEW_SERVICES = [
  {
    slug: 'pre-ipo-opportunities',
    en: {
      title: 'Pre-IPO Opportunities',
      text: 'Access exclusive pre-IPO investment opportunities in high-growth companies before they go public.',
    },
    zh: {
      title: 'Pre-IPO 投资机会',
      text: '在高增长公司上市前，获取独家Pre-IPO投资机会。',
    },
  },
  {
    slug: 'tax-planning',
    en: {
      title: 'Tax Planning',
      text: 'Comprehensive tax planning strategies to minimize your tax liability and maximize savings for individuals and businesses.',
    },
    zh: {
      title: '税务规划',
      text: '全面的税务规划策略，为个人和企业最大限度地减少税务负担，提高储蓄。',
    },
  },
  {
    slug: 'retirement-planning',
    en: {
      title: 'Retirement Planning',
      text: 'Build a secure retirement with personalized strategies covering savings, investments, and income planning.',
    },
    zh: {
      title: '退休规划',
      text: '通过个性化的储蓄、投资和收入规划策略，构建安全的退休生活。',
    },
  },
  {
    slug: 'estate-planning',
    en: {
      title: 'Estate Planning',
      text: 'Protect and transfer your wealth efficiently with comprehensive estate planning, including trusts, wills, and inheritance strategies.',
    },
    zh: {
      title: '遗产规划',
      text: '通过全面的遗产规划（包括信托、遗嘱和继承策略），有效保护和转移您的财富。',
    },
  },
]

function makeBlocks(text) {
  return [
    {
      _type: 'block',
      _key: Math.random().toString(36).slice(2, 10),
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).slice(2, 10),
          text,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ]
}

async function run() {
  // 1. Delete old service pages
  console.log('🗑️  Deleting old service pages...')
  for (const slug of OLD_SLUGS) {
    const docs = await client.fetch(
      `*[_type == "page" && slug.current == $slug]`,
      { slug }
    )
    for (const doc of docs) {
      await client.delete(doc._id)
      console.log(`  ✅ Deleted: ${doc.title} (${doc.language || 'en'})`)
    }
    if (docs.length === 0) {
      console.log(`  ℹ️  Not found: ${slug}`)
    }
  }

  // 2. Create new service pages
  console.log('\n📝 Creating new service pages...')
  for (const service of NEW_SERVICES) {
    for (const lang of ['en', 'zh']) {
      const data = service[lang]

      // Skip if already exists
      const existing = await client.fetch(
        `*[_type == "page" && slug.current == $slug && language == $lang][0]`,
        { slug: service.slug, lang }
      )
      if (existing) {
        console.log(`  ⚠️  Already exists: ${service.slug} (${lang}) — skipping`)
        continue
      }

      await client.create({
        _type: 'page',
        title: data.title,
        slug: { _type: 'slug', current: service.slug },
        language: lang,
        text: data.text,
        content: makeBlocks(data.text),
      })
      console.log(`  ✅ Created: ${data.title} (${lang})`)
    }
  }

  console.log('\n✨ Done!')
}

run().catch(console.error)
