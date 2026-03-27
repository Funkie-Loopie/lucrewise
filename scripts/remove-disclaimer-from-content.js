/**
 * Removes 免责声明 / Disclaimer blocks from the Rich Text content of all blog posts.
 * Run: node scripts/remove-disclaimer-from-content.js
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

function blockText(block) {
  return block?.children?.map((c) => c.text || '').join('') || ''
}

function isDisclaimerBlock(block) {
  if (block._type !== 'block') return false
  const text = blockText(block)
  return /免责申明|免责声明|本文及其中任何文字|disclaimer/i.test(text)
}

async function run() {
  // Fetch all pages with content
  const pages = await client.fetch(
    `*[_type == "page" && defined(content) && length(content) > 0]{ _id, title, content }`
  )

  console.log(`Fetched ${pages.length} pages`)

  let patched = 0
  for (const page of pages) {
    const original = page.content || []
    const filtered = original.filter((block) => !isDisclaimerBlock(block))

    if (filtered.length === original.length) continue // nothing to remove

    const removed = original.length - filtered.length
    console.log(`  Patching "${page.title}" (${page._id}) — removing ${removed} block(s)`)

    await client.patch(page._id).set({ content: filtered }).commit()
    patched++
  }

  console.log(`\nDone. Patched ${patched} page(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
