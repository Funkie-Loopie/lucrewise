import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'
import { htmlToPortableText } from '../lib/html-to-portable-text.js'

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env.local') })
config({ path: path.resolve(process.cwd(), '.env') })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || '', // You'll need to create a token in Sanity Studio
})

// Determine language from filename
function detectLanguage(filename) {
  // Check if filename contains Chinese characters or URL-encoded Chinese
  const chinesePattern = /[\u4e00-\u9fff]|%e[4-9a-f]|%[89a-f][0-9a-f]/
  return chinesePattern.test(filename) ? 'zh' : 'en'
}

// Convert slug to readable format
function normalizeSlug(filename) {
  // Remove .json extension
  let slug = filename.replace('.json', '')
  
  // Decode URL-encoded characters
  try {
    slug = decodeURIComponent(slug)
  } catch (e) {
    // If decoding fails, use as is
  }
  
  // Convert to slug format (lowercase, replace spaces/special chars with hyphens)
  slug = slug
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  
  return slug
}

async function migrateData() {
  const dataDir = path.join(__dirname, '../data')
  const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'))
  
  console.log(`Found ${files.length} JSON files to migrate...\n`)
  
  let successCount = 0
  let errorCount = 0
  
  for (const file of files) {
    try {
      const filePath = path.join(dataDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const data = JSON.parse(fileContent)
      
      const language = detectLanguage(file)
      const slug = data.slug || normalizeSlug(file)
      
      // Check if document already exists
      const existing = await client.fetch(
        `*[_type == "page" && slug.current == $slug && language == $language][0]`,
        { slug, language }
      )
      
      // Convert HTML to Portable Text
      const content = data.rawHTML ? htmlToPortableText(data.rawHTML) : []
      
      // Prepare document data
      const documentData = {
        title: data.title || 'Untitled',
        slug: {
          _type: 'slug',
          current: slug
        },
        text: data.text || '',
        content: content, // Portable Text (rich text)
        rawHTML: data.rawHTML || '', // Keep for reference
        url: data.url || '',
        language: language
      }
      
      if (existing) {
        // Update existing document
        const result = await client
          .patch(existing._id)
          .set(documentData)
          .commit()
        console.log(`🔄 Updated: ${file} (${language}) -> ${result._id}`)
        successCount++
      } else {
        // Create new document
        const document = {
          _type: 'page',
          ...documentData
        }
        const result = await client.create(document)
        console.log(`✅ Created: ${file} (${language}) -> ${result._id}`)
        successCount++
      }
      
    } catch (error) {
      console.error(`❌ Error migrating ${file}:`, error.message)
      errorCount++
    }
  }
  
  console.log(`\n📊 Migration complete!`)
  console.log(`✅ Success: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
}

// Run migration
migrateData().catch(console.error)
