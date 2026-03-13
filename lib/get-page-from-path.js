import { getPageBySlug } from './sanity'

/**
 * Get page data from Sanity based on the current pathname
 * Automatically detects language and converts path to slug
 */
export async function getPageFromPath(pathname) {
  // Determine language
  const isChinese = pathname.startsWith('/zh')
  const language = isChinese ? 'zh' : 'en'
  
  // Remove language prefix and leading/trailing slashes
  let slug = pathname
    .replace(/^\/zh/, '')
    .replace(/^\//, '')
    .replace(/\/$/, '')
  
  // Handle root paths
  if (!slug || slug === '') {
    slug = 'home'
  }
  
  // Special slug mappings for common paths
  const slugMap = {
    'about-us': 'about-us-2',
    'services': 'services-2',
    'contact': 'contact-2',
    'blog-retirement': 'blog-retirement',
    'blog-tax': 'blog-tax',
    'blog-investment': 'blog-investment',
    'blog-insurance': 'blog-insurance',
    'blog-financial-planning': 'blog-financial-planning',
    'tax-consultation': 'tax-consultation',
    'insurance-consulting': 'insurance-consulting-2',
    'investment-opportunities': 'investment-opportunities',
    'business-all-in-one': 'business-all-in-one',
    'philanthropic-service': 'philanthropic-service',
  }
  
  // Use mapped slug if available, otherwise use the path as-is
  const finalSlug = slugMap[slug] || slug
  
  return await getPageBySlug(finalSlug, language)
}
