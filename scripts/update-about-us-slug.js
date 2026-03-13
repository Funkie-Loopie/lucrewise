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

async function updateAboutUsSlug() {
  console.log('🔄 Updating about-us-2 slug to about-us...\n')
  
  try {
    // Find all about-us-2 pages
    const aboutUs2Pages = await client.fetch(
      `*[_type == "page" && slug.current == "about-us-2"]`
    )
    
    if (aboutUs2Pages.length === 0) {
      console.log('ℹ️  No pages with slug "about-us-2" found.')
      return
    }
    
    console.log(`Found ${aboutUs2Pages.length} page(s) with slug "about-us-2"\n`)
    
    for (const page of aboutUs2Pages) {
      try {
        // Check if about-us already exists for this language
        const existing = await client.fetch(
          `*[_type == "page" && slug.current == "about-us" && language == $language][0]`,
          { language: page.language }
        )
        
        if (existing) {
          console.log(`⚠️  Skipping ${page.language}: "about-us" already exists (will be archived)`)
          continue
        }
        
        // Update slug from about-us-2 to about-us
        const result = await client
          .patch(page._id)
          .set({
            slug: {
              _type: 'slug',
              current: 'about-us'
            }
          })
          .commit()
        
        console.log(`✅ Updated: ${page.title} (${page.language}) -> slug changed from "about-us-2" to "about-us"`)
      } catch (error) {
        console.error(`❌ Error updating ${page._id}:`, error.message)
      }
    }
    
    console.log('\n✨ Update complete!')
    console.log('\n📝 Note: Old "about-us" pages are now archived and can be found in "Archive Pages" section.')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

updateAboutUsSlug().catch(console.error)
