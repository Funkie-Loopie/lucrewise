import { client } from '../sanity/client'

// Fetch a single page by slug
export async function getPageBySlug(slug, language = 'en') {
  try {
    const query = `*[_type == "page" && slug.current == $slug && language == $language][0]`
    const params = { slug, language }
    const page = await client.fetch(query, params)
    return page
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

// Fetch all pages
export async function getAllPages(language = 'en') {
  try {
    const query = `*[_type == "page" && language == $language] | order(title asc)`
    const params = { language }
    const pages = await client.fetch(query, params)
    return pages
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

// Fetch pages by type/category (e.g., blog, services)
export async function getPagesByCategory(category, language = 'en') {
  try {
    const query = `*[_type == "page" && language == $language && slug.current match $category] | order(title asc)`
    const params = { language, category: `${category}*` }
    const pages = await client.fetch(query, params)
    return pages
  } catch (error) {
    console.error('Error fetching pages by category:', error)
    return []
  }
}

