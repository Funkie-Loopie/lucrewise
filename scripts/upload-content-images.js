/**
 * Upload external images from page content to Sanity and patch documents.
 *
 * For each page in Sanity:
 *   1. Re-parse rawHTML → portable text (now including image placeholder blocks)
 *   2. For each placeholder (_externalUrl), download the image and upload to Sanity
 *   3. Replace the placeholder with a real Sanity image reference
 *   4. Patch the document's content field
 *
 * Run with: node scripts/upload-content-images.js
 * Requires SANITY_API_TOKEN with Editor permission.
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { htmlToPortableText } from '../lib/html-to-portable-text.js'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fhqlqt4e',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Cache uploaded images so we don't re-upload the same URL
const uploadCache = new Map()

async function uploadImageUrl(url) {
  if (uploadCache.has(url)) return uploadCache.get(url)

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) })
    if (!res.ok) {
      console.warn(`    ⚠ Could not fetch image (${res.status}): ${url}`)
      return null
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const buffer = Buffer.from(await res.arrayBuffer())

    const asset = await client.assets.upload('image', buffer, {
      contentType,
      filename: url.split('/').pop().split('?')[0] || 'image',
    })

    uploadCache.set(url, asset._id)
    return asset._id
  } catch (err) {
    console.warn(`    ⚠ Failed to upload ${url}: ${err.message}`)
    return null
  }
}

async function processBlocks(blocks) {
  const result = []
  for (const block of blocks) {
    if (block._type === 'image' && block._externalUrl) {
      console.log(`  → Uploading: ${block._externalUrl}`)
      const assetId = await uploadImageUrl(block._externalUrl)
      if (assetId) {
        result.push({
          _type: 'image',
          _key: block._key,
          asset: { _type: 'reference', _ref: assetId },
          ...(block.alt ? { alt: block.alt } : {}),
        })
        console.log(`    ✓ Uploaded → ${assetId}`)
      }
      // If upload failed, skip the block (don't push broken reference)
    } else {
      result.push(block)
    }
  }
  return result
}

async function run() {
  const pages = await client.fetch(
    `*[_type == "page" && rawHTML match "<img"][]{_id, slug, language, rawHTML}`
  )

  console.log(`Found ${pages.length} pages with rawHTML\n`)

  let updated = 0
  let skipped = 0

  for (const page of pages) {
    const slug = page.slug?.current || page._id
    const blocks = htmlToPortableText(page.rawHTML)
    const hasImages = blocks.some((b) => b._type === 'image' && b._externalUrl)

    if (!hasImages) {
      skipped++
      continue
    }

    console.log(`\nProcessing: ${slug} (${page.language}) — ${blocks.filter(b => b._externalUrl).length} image(s)`)
    const processedBlocks = await processBlocks(blocks)

    await client.patch(page._id).set({ content: processedBlocks }).commit()
    console.log(`  ✓ Patched ${slug}`)
    updated++
  }

  console.log(`\nDone. Updated: ${updated}, Skipped (no images): ${skipped}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
