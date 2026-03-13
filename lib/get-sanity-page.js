import { getPageBySlug } from './sanity'

/**
 * Get page data from Sanity based on the file path
 * Automatically maps common paths to their Sanity slugs
 */
export async function getSanityPage(slug, language = 'en') {
  // Slug mapping: path -> Sanity slug
  const slugMap = {
    // Root pages
    'home': 'home',
    'about-us': 'about-us', // main about-us page
    'services': 'services', // main services page
    'contact': 'contact', // main contact page
    'contact-us': 'contact',
    
    // Blog pages
    'blog': 'blog',
    'blogs': 'blogs',
    'blog-retirement': 'blog-retirement',
    'blog-tax': 'blog-tax',
    'blog-investment': 'blog-investment',
    'blog-insurance': 'blog-insurance',
    'blog-financial-planning': 'blog-financial-planning',
    'blog-where-to-put-cash-reserve': 'blog-where-to-put-cash-reserve',
    
    // Service pages
    'tax-consultation': 'tax-consultation',
    'insurance-consulting': 'insurance-consulting-2',
    'investment-opportunities': 'investment-opportunities',
    'business-all-in-one': 'business-all-in-one',
    'philanthropic-service': 'philanthropic-service',
    
    // Chinese pages
    '主页': '主页',
    '关于我们': '关于我们',
    '服务': '服务',
    '博客': '博客',
    '联系我们': '联系我们',
  }
  
  // Use mapped slug if available, otherwise use the provided slug
  const finalSlug = slugMap[slug] || slug
  
  return await getPageBySlug(finalSlug, language)
}
