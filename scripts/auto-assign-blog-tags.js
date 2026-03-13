import { createClient } from '@sanity/client'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load env vars (same pattern as other scripts)
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

function chooseTag(doc) {
  const slug = (doc.slug || '').toLowerCase()
  const title = (doc.title || '').toLowerCase()
  const text = (doc.text || '').toLowerCase()

  const haystack = `${slug} ${title} ${text}`

  // Retirement Planning
  if (
    /retirement|退休|pension|401k|ira|年金/.test(haystack)
  ) {
    return 'Retirement Planning'
  }

  // Insurance Guidance
  if (
    /insurance|保險|保险|policy|life-insurance|term|whole life/.test(haystack)
  ) {
    return 'Insurance Guidance'
  }

  // Tax Planning
  if (
    /tax|稅|税|irs|capital-gains|withholding|deduction/.test(haystack)
  ) {
    return 'Tax Planning'
  }

  // Employer Services
  if (
    /employer|employee|公司福利|企业福利|benefits|stock-options|espp|hr/.test(haystack)
  ) {
    return 'Employer Services'
  }

  // Investment Strategy
  if (
    /invest|investment|portfolio|asset allocation|基金|股票|債券|债券|equity|private equity|real estate/.test(
      haystack
    )
  ) {
    return 'Investment Strategy'
  }

  // Fallback
  return 'Overall Planning'
}

async function autoAssignTags() {
  console.log('🔄 Auto-assigning tags for blog posts...\n')

  // Fetch all blog documents (slug starts with blog-)
  const docs = await client.fetch(
    `*[_type == "page" && slug.current match "blog-*"]{
      _id,
      title,
      "slug": slug.current,
      language,
      text,
      tag
    }`
  )

  if (!docs.length) {
    console.log('ℹ️  No blog documents found.')
    return
  }

  let updated = 0
  let skipped = 0

  for (const doc of docs) {
    const currentTag = doc.tag
    const newTag = chooseTag(doc)

    // If tag already set and same, skip
    if (currentTag && currentTag === newTag) {
      skipped++
      continue
    }

    try {
      await client
        .patch(doc._id)
        .set({ tag: newTag })
        .commit()

      console.log(
        `✅ ${doc.title || doc.slug} (${doc.language || 'n/a'}): tag ${
          currentTag || '(none)'
        } → ${newTag}`
      )
      updated++
    } catch (err) {
      console.error(`❌ Error updating ${doc._id}:`, err.message)
      skipped++
    }
  }

  console.log('\n📊 Auto-assign tags complete!')
  console.log(`✅ Updated: ${updated}`)
  console.log(`⏭️  Skipped: ${skipped}`)
}

autoAssignTags().catch((err) => {
  console.error('❌ Unexpected error:', err)
})

