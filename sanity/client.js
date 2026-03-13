import { createClient } from '@sanity/client'

// 給 Next.js 用的 Sanity client。
// 為了避免在缺少環境變數時拋出 "Configuration must contain `projectId`"，
// 這裡直接加上與 sanity.config.js 一樣的 fallback。
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.VITE_SANITY_PROJECT_ID ||
  'fhqlqt4e' // Sanity project ID

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.VITE_SANITY_DATASET ||
  'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})


