/**
 * Finds [image + title + "全文"/"Read More"] groups at the end of blog posts,
 * matches titles to other blog posts, saves as relatedPosts references,
 * and removes all related-article blocks from content.
 * Run: node scripts/migrate-related-posts.js
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

function isReadMoreBlock(block) {
  if (block._type !== 'block') return false
  const text = blockText(block)
  return /^(全文|read more)$/i.test(text)
}

/** Find related article groups from the end of the block list */
function findRelatedGroups(blocks) {
  // Walk backwards collecting groups of [image, title, readmore]
  const groups = []
  let i = blocks.length - 1

  while (i >= 2) {
    if (
      isReadMoreBlock(blocks[i]) &&
      blocks[i - 1]._type === 'block' &&
      blocks[i - 2]._type === 'image'
    ) {
      groups.unshift({
        imageKey: blocks[i - 2]._key,
        titleKey: blocks[i - 1]._key,
        readMoreKey: blocks[i]._key,
        title: blockText(blocks[i - 1]),
      })
      i -= 3
    } else {
      break
    }
  }

  return groups
}

function normalize(s) {
  return s.replace(/\s+/g, ' ').trim().toLowerCase()
}

async function run() {
  // Fetch all blog posts (for title matching)
  const allPosts = await client.fetch(
    `*[_type == "page" && slug.current match "blog-*"]{ _id, title, slug }`
  )
  console.log(`Loaded ${allPosts.length} blog posts for matching`)

  // Build a lookup: normalized title → post _id
  const titleIndex = new Map()
  for (const post of allPosts) {
    titleIndex.set(normalize(post.title), post._id)
  }

  let patched = 0
  for (const page of allPosts) {
    const fullPage = await client.fetch(
      `*[_id == $id][0]{ _id, title, content }`,
      { id: page._id }
    )
    const blocks = fullPage?.content || []
    const groups = findRelatedGroups(blocks)
    if (groups.length === 0) continue

    const keysToRemove = new Set()
    const relatedPosts = []

    for (const g of groups) {
      keysToRemove.add(g.imageKey)
      keysToRemove.add(g.titleKey)
      keysToRemove.add(g.readMoreKey)

      const matchId = titleIndex.get(normalize(g.title))
      if (matchId && matchId !== page._id) {
        relatedPosts.push({ _type: 'reference', _ref: matchId, _key: matchId })
        console.log(`  "${page.title}" → related: "${g.title}" ✓`)
      } else {
        console.log(`  "${page.title}" → no match for: "${g.title.slice(0, 60)}"`)
      }
    }

    const newContent = blocks.filter((b) => !keysToRemove.has(b._key))
    const patch = client.patch(page._id).set({ content: newContent })
    if (relatedPosts.length > 0) patch.set({ relatedPosts })
    await patch.commit()
    patched++
  }

  console.log(`\nDone. Patched ${patched} post(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
