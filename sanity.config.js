import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import pageSchema from './sanity/schema.js'
import siteSettingsSchema from './sanity/site-settings-schema.js'
import homePageSchema from './sanity/home-page-schema.js'
import aboutPageSchema from './sanity/about-page-schema.js'
import { structure } from './sanity/structure.js'

// Sanity project configuration
// Works with both Next.js (process.env) and Vite (import.meta.env)
const projectId = 
  typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_PROJECT_ID ||
  'fhqlqt4e' // Fallback to your project ID

const dataset = 
  typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SANITY_DATASET ||
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_DATASET ||
  'production'

if (!projectId) {
  throw new Error('Missing Sanity projectId')
}

export default defineConfig({
  name: 'default',
  title: 'Golden Blue Family Office CMS',
  
  projectId,
  dataset,
  
  plugins: [
    structureTool({
      structure,
    }),
  ],
  
  schema: {
    types: [pageSchema, siteSettingsSchema, homePageSchema, aboutPageSchema],
  },
})

