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

async function updateServicesSlug() {
  console.log('🔄 Updating services-2 slug to services...\n')
  
  try {
    // Find all services-2 pages
    const services2Pages = await client.fetch(
      `*[_type == "page" && slug.current == "services-2"]`
    )
    
    if (services2Pages.length === 0) {
      console.log('ℹ️  No pages with slug "services-2" found.')
      return
    }
    
    console.log(`Found ${services2Pages.length} page(s) with slug "services-2"\n`)
    
    for (const page of services2Pages) {
      try {
        // Check if services already exists for this language
        const existing = await client.fetch(
          `*[_type == "page" && slug.current == "services" && language == $language][0]`,
          { language: page.language }
        )
        
        if (existing) {
          console.log(`⚠️  Skipping ${page.language}: "services" already exists (will be archived)`)
          continue
        }
        
        // Update slug from services-2 to services
        const result = await client
          .patch(page._id)
          .set({
            slug: {
              _type: 'slug',
              current: 'services'
            }
          })
          .commit()
        
        console.log(`✅ Updated: ${page.title} (${page.language}) -> slug changed from "services-2" to "services"`)
      } catch (error) {
        console.error(`❌ Error updating ${page._id}:`, error.message)
      }
    }
    
    console.log('\n✨ Update complete!')
    console.log('\n📝 Note: Old "services" pages are now archived and can be found in "Archive Pages" section.')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

updateServicesSlug().catch(console.error)
