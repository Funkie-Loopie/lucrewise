/**
 * Extracts subtitle + removes title/category blocks from blog post content.
 * - Removes the block matching the document title
 * - Removes short category label blocks (≤ 8 chars, e.g. "综合理财")
 * - Saves the first remaining descriptive block as `subtitle`
 * - Keeps all other header blocks as content (they become body prefix)
 * Run: node scripts/migrate-post-subtitles.js
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

function normalize(s) {
  return s.replace(/\s+/g, ' ').trim().toLowerCase()
}

function isTitleBlock(text, docTitle) {
  const t = normalize(text)
  const d = normalize(docTitle)
  if (!t || !d) return false
  return t === d || d.startsWith(t) || t.startsWith(d)
}

async function run() {
  const pages = await client.fetch(
    `*[_type == "page" && slug.current match "blog-*" && defined(content)]{ _id, title, content }`
  )
  console.log(`Fetched ${pages.length} blog posts`)

  let patched = 0
  for (const page of pages) {
    const blocks = page.content || []
    const firstImgIdx = blocks.findIndex((b) => b._type === 'image')
    const headerBlocks = firstImgIdx >= 0 ? blocks.slice(0, firstImgIdx) : []

    if (headerBlocks.length === 0) continue

    const keysToRemove = new Set()

    // Mark short category label blocks (e.g. "综合理财", ≤ 8 chars)
    for (const b of headerBlocks) {
      const text = blockText(b)
      if (text.length <= 8) keysToRemove.add(b._key)
    }

    // Mark the title block
    let titleBlock = headerBlocks.find((b) => isTitleBlock(blockText(b), page.title))
    if (titleBlock) keysToRemove.add(titleBlock._key)

    // Find subtitle: first remaining block > 10 chars that isn't already marked
    let subtitle = null
    for (const b of headerBlocks) {
      if (keysToRemove.has(b._key)) continue
      const text = blockText(b)
      if (text.length > 10) {
        subtitle = text
        keysToRemove.add(b._key)
        break
      }
    }

    if (keysToRemove.size === 0) continue

    const newContent = blocks.filter((b) => !keysToRemove.has(b._key))

    console.log(`  "${page.title}"`)
    if (subtitle) console.log(`    subtitle: "${subtitle.slice(0, 80)}"`)
    console.log(`    removing ${keysToRemove.size} block(s) from content`)

    const patch = client.patch(page._id).set({ content: newContent })
    if (subtitle) patch.set({ subtitle })
    await patch.commit()
    patched++
  }

  console.log(`\nDone. Patched ${patched} post(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
