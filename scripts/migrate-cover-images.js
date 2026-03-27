/**
 * Moves the first image block in blog post content to the dedicated coverImage field.
 * Run: node scripts/migrate-cover-images.js
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

async function run() {
  const pages = await client.fetch(
    `*[_type == "page" && slug.current match "blog-*" && defined(content)]{ _id, title, content }`
  )
  console.log(`Fetched ${pages.length} blog posts`)

  let patched = 0
  for (const page of pages) {
    const blocks = page.content || []

    // Cover = first image block within the first 3 blocks
    const coverIdx = blocks.findIndex((b, i) => b._type === 'image' && i <= 2)
    if (coverIdx < 0) {
      console.log(`  Skipping "${page.title}" — no cover image in first 3 blocks`)
      continue
    }

    const coverBlock = blocks[coverIdx]
    // Build a clean coverImage object from the image block
    const coverImage = {
      _type: 'image',
      asset: coverBlock.asset,
      ...(coverBlock.alt ? { alt: coverBlock.alt } : {}),
      ...(coverBlock.hotspot ? { hotspot: coverBlock.hotspot } : {}),
      ...(coverBlock.crop ? { crop: coverBlock.crop } : {}),
    }

    const newContent = blocks.filter((_, i) => i !== coverIdx)

    console.log(`  "${page.title}" — extracting cover image`)
    await client.patch(page._id).set({ coverImage, content: newContent }).commit()
    patched++
  }

  console.log(`\nDone. Patched ${patched} post(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
