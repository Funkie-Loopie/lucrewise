import { getPageFromPath } from '@/lib/get-page-from-path'
import ContentPage from '@/components/ContentPage'
import { headers } from 'next/headers'

/**
 * Universal page component that fetches data from Sanity
 * Use this component in your page.jsx files instead of importing JSON
 */
export default async function SanityPage() {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || headersList.get('referer') || ''
  
  // Get pathname from Next.js
  // For App Router, we need to get it differently
  const content = await getPageFromPath(pathname)
  
  if (!content) {
    return (
      <main style={{ padding: "3rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
        <h1>Page not found</h1>
        <p>The requested page could not be found in Sanity.</p>
      </main>
    )
  }
  
  return <ContentPage content={content} />
}
