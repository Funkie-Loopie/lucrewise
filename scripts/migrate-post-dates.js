/**
 * Extracts 发表于：dates from blog post content blocks,
 * saves them to the publishedAt field, and removes the date block from content.
 * Run: node scripts/migrate-post-dates.js
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

function blockText(block) {
  return block?.children?.map((c) => c.text || '').join('').trim() || ''
}

function isDateBlock(block) {
  if (block._type !== 'block') return false
  return /发表于|published|date:/i.test(blockText(block))
}

/** Parse "M/D/YYYY" or "MM/DD/YYYY" → "YYYY-MM-DD" */
function parseDate(raw) {
  // Strip the label prefix (e.g. "发表于: " or "Published: ")
  const dateStr = raw.replace(/^.*?[:：]\s*/, '').trim()
  // Try M/D/YYYY
  const match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (match) {
    const [, m, d, y] = match
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
  }
  // Return as-is if format unknown (Sanity will reject invalid dates)
  return dateStr
}

async function run() {
  const pages = await client.fetch(
    `*[_type == "page" && slug.current match "blog-*" && defined(content)]{ _id, title, content }`
  )
  console.log(`Fetched ${pages.length} blog posts`)

  let patched = 0
  for (const page of pages) {
    const blocks = page.content || []
    const dateIdx = blocks.findIndex((b, i) => i < 6 && isDateBlock(b))
    if (dateIdx < 0) continue

    const rawDate = blockText(blocks[dateIdx])
    const publishedAt = parseDate(rawDate)
    const filtered = blocks.filter((_, i) => i !== dateIdx)

    console.log(`  "${page.title}" → publishedAt: ${publishedAt}`)

    await client
      .patch(page._id)
      .set({ publishedAt, content: filtered })
      .commit()

    patched++
  }

  console.log(`\nDone. Patched ${patched} post(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
