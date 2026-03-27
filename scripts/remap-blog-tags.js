/**
 * Remap inconsistent blog post tags to their canonical values.
 * Run with: node scripts/remap-blog-tags.js
 *
 * Requires SANITY_API_TOKEN with Editor (update) permission.
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

const REMAP = {
  'retirement-planning': 'Retirement Planning',
  'tax-planning':        'Tax Planning',
}

async function run() {
  const posts = await client.fetch(
    `*[_type == "page" && tag in $tags]{_id, slug, tag}`,
    { tags: Object.keys(REMAP) }
  )

  if (posts.length === 0) {
    console.log('No posts need remapping.')
    return
  }

  console.log(`Remapping ${posts.length} post(s)...`)
  for (const p of posts) {
    const newTag = REMAP[p.tag]
    await client.patch(p._id).set({ tag: newTag }).commit()
    console.log(`  ✓ ${p.slug.current}: "${p.tag}" → "${newTag}"`)
  }
  console.log('Done.')
}

run().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
