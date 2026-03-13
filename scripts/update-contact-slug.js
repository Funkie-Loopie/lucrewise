import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
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
  token: token,
})

async function updateContactSlug() {
  console.log('🔄 Updating contact-2 slug to contact...\n')
  
  try {
    // Find all contact-2 pages
    const contact2Pages = await client.fetch(
      `*[_type == "page" && slug.current == "contact-2"]`
    )
    
    if (contact2Pages.length === 0) {
      console.log('ℹ️  No pages with slug "contact-2" found.')
      return
    }
    
    console.log(`Found ${contact2Pages.length} page(s) with slug "contact-2"\n`)
    
    for (const page of contact2Pages) {
      try {
        // Check if contact already exists for this language
        const existing = await client.fetch(
          `*[_type == "page" && slug.current == "contact" && language == $language][0]`,
          { language: page.language }
        )
        
        if (existing) {
          console.log(`⚠️  Skipping ${page.language}: "contact" already exists (will be archived)`)
          continue
        }
        
        // Update slug from contact-2 to contact
        const result = await client
          .patch(page._id)
          .set({
            slug: {
              _type: 'slug',
              current: 'contact'
            }
          })
          .commit()
        
        console.log(`✅ Updated: ${page.title} (${page.language}) -> slug changed from "contact-2" to "contact"`)
      } catch (error) {
        console.error(`❌ Error updating ${page._id}:`, error.message)
      }
    }
    
    console.log('\n✨ Update complete!')
    console.log('\n📝 Note: Old "contact" pages are now archived and can be found in "Archive Pages" section.')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

updateContactSlug().catch(console.error)
