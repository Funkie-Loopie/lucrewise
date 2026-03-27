/**
 * Generates clean excerpts for all blog posts.
 * Priority: subtitle → first body paragraph → title
 * Run: node scripts/generate-excerpts.js
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
  return block?.children?.map((c) => c.text || '').join('').replace(/\s+/g, ' ').trim() || ''
}

function isJunk(text) {
  return /elementor|\.e-|padding:|margin:|font-size:|webkit/i.test(text)
}

function truncate(text, max = 160) {
  if (text.length <= max) return text
  const cut = text.lastIndexOf('，', max) || text.lastIndexOf('。', max) || text.lastIndexOf(' ', max)
  return (cut > max * 0.6 ? text.slice(0, cut) : text.slice(0, max)) + '…'
}

async function run() {
  const pages = await client.fetch(
    `*[_type == "page" && slug.current match "blog-*" && slug.current != "blog"]{ _id, title, subtitle, content }`
  )
  console.log(`Fetched ${pages.length} blog posts`)

  let patched = 0
  for (const page of pages) {
    // 1. Use subtitle if available
    if (page.subtitle && !isJunk(page.subtitle)) {
      const excerpt = truncate(page.subtitle)
      console.log(`  "${page.title}" → subtitle`)
      await client.patch(page._id).set({ text: excerpt }).commit()
      patched++
      continue
    }

    // 2. Find first non-junk body paragraph
    const blocks = page.content || []
    let excerpt = null
    for (const block of blocks) {
      if (block._type !== 'block') continue
      const text = blockText(block)
      if (!text || text.length < 20) continue
      if (isJunk(text)) continue
      // Skip heading-style blocks (short labels)
      if (text.length < 10) continue
      excerpt = truncate(text)
      break
    }

    if (excerpt) {
      console.log(`  "${page.title}" → body paragraph`)
      await client.patch(page._id).set({ text: excerpt }).commit()
      patched++
    } else {
      console.log(`  "${page.title}" → no suitable excerpt found`)
    }
  }

  console.log(`\nDone. Updated ${patched} post(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
