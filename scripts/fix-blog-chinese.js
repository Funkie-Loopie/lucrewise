import { createClient } from '@sanity/client'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables (same as other scripts)
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

// Detect if a string contains Chinese characters
function hasChinese(text) {
  if (!text || typeof text !== 'string') return false
  return /[\u4e00-\u9fff]/.test(text)
}

// Extract a Chinese title from the first content block (if possible)
function extractChineseTitleFromContent(content) {
  if (!Array.isArray(content)) return null
  const firstBlock = content.find(
    (block) => block && block._type === 'block' && Array.isArray(block.children)
  )
  if (!firstBlock) return null

  const text = firstBlock.children
    .filter((child) => child && child._type === 'span' && typeof child.text === 'string')
    .map((child) => child.text)
    .join('')
    .trim()

  if (hasChinese(text)) {
    return text
  }
  return null
}

// Normalize slug: keep blog- prefix and remove Chinese / non-ascii chars
function normalizeBlogSlug(slug) {
  if (!slug || typeof slug !== 'string') return slug
  let s = slug

  // Ensure blog- prefix
  if (!s.startsWith('blog-')) {
    s = `blog-${s.replace(/^blog-/, '')}`
  }

  // Keep only a-z0-9- after blog-
  const prefix = 'blog-'
  let rest = s.slice(prefix.length).toLowerCase()
  rest = rest
    .normalize('NFKD')
    .replace(/[^a-z0-9-]+/g, '-') // replace non-alphanum with -
    .replace(/-+/g, '-') // collapse dashes
    .replace(/^-|-$/g, '') // trim dashes

  if (!rest) {
    // Fallback: return original slug if normalization would empty it
    return slug
  }

  return `${prefix}${rest}`
}

async function fixChineseBlogs() {
  console.log('🔄 Fixing Chinese blog documents...\n')

  // Fetch all blog pages
  const docs = await client.fetch(
    `*[_type == "page" && slug.current match "blog-*"]{
      _id,
      _type,
      title,
      "slug": slug.current,
      language,
      content
    }`
  )

  if (!docs.length) {
    console.log('ℹ️  No blog documents found.')
    return
  }

  let updated = 0
  let skipped = 0

  for (const doc of docs) {
    const { _id, title, slug, language, content } = doc

    const hasZhContent = Array.isArray(content) && hasChinese(JSON.stringify(content))

    if (!hasZhContent && language !== 'zh') {
      skipped++
      continue
    }

    const newTitle = extractChineseTitleFromContent(content) || title
    const newSlug = normalizeBlogSlug(slug)
    const newLanguage = 'zh'

    try {
      await client
        .patch(_id)
        .set({
          title: newTitle,
          slug: {
            _type: 'slug',
            current: newSlug,
          },
          language: newLanguage,
        })
        .commit()

      console.log(
        `✅ Updated blog: ${title} (${language || 'n/a'}) -> slug: "${slug}" → "${newSlug}", language: "${newLanguage}", title: "${newTitle}"`
      )
      updated++
    } catch (err) {
      console.error(`❌ Error updating ${_id}:`, err.message)
      skipped++
    }
  }

  console.log('\n📊 Fix Chinese blogs complete!')
  console.log(`✅ Updated: ${updated}`)
  console.log(`⏭️  Skipped: ${skipped}`)
}

fixChineseBlogs().catch((err) => {
  console.error('❌ Unexpected error:', err)
})

