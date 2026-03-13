import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const appFolder = path.join(__dirname, '../app')

// Template for pages that use Sanity
const sanityPageTemplate = (slug, language = 'en') => `import { getSanityPage } from "@/lib/get-sanity-page";
import ContentPage from "@/components/ContentPage";

export default async function Page() {
  const content = await getSanityPage('${slug}', '${language}');
  
  if (!content) {
    return (
      <main style={{ padding: "3rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
        <h1>Page not found</h1>
        <p>The requested page could not be found in Sanity.</p>
      </main>
    );
  }
  
  return <ContentPage content={content} />;
}
`

// Slug mapping based on file path
function getSlugFromPath(filePath) {
  const relativePath = path.relative(appFolder, filePath)
  const parts = relativePath.split(path.sep)
  
  // Remove 'page.jsx' and get the directory structure
  const dirs = parts.slice(0, -1)
  
  // Handle root pages
  if (dirs.length === 0 || (dirs.length === 1 && dirs[0] === 'zh')) {
    return 'home'
  }
  
  // Handle Chinese pages
  const isChinese = dirs[0] === 'zh'
  if (isChinese) {
    dirs.shift()
  }
  
  // Get the last directory as slug
  const slug = dirs[dirs.length - 1]
  
  // Special mappings
  const slugMap = {
    'about-us': 'about-us-2',
    'services': 'services-2',
    'contact': 'contact-2',
    'retirement': 'blog-retirement',
    'tax': 'blog-tax',
    'investment': 'blog-investment',
    'insurance': 'blog-insurance',
    'financial-planning': 'blog-financial-planning',
    'tax-consultation': 'tax-consultation',
    'insurance-consulting': 'insurance-consulting-2',
    'investment-opportunities': 'investment-opportunities',
    'business-all-in-one': 'business-all-in-one',
    'philanthropic-service': 'philanthropic-service',
  }
  
  return slugMap[slug] || slug
}

// Find all page.jsx files
function findPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      findPageFiles(filePath, fileList)
    } else if (file === 'page.jsx') {
      fileList.push(filePath)
    }
  })
  
  return fileList
}

// Check if a file already uses Sanity
function usesSanity(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  return content.includes('getSanityPage') || content.includes('@/lib/get-sanity-page')
}

// Skip these special pages (homepage, etc.)
function shouldSkip(filePath) {
  const relativePath = path.relative(appFolder, filePath)
  // Skip homepage and zh homepage (they have custom implementations)
  if (relativePath === 'page.jsx' || relativePath === 'zh/page.jsx') {
    return true
  }
  return false
}

function main() {
  const pageFiles = findPageFiles(appFolder)
  let updated = 0
  let skipped = 0
  
  console.log(`Found ${pageFiles.length} page files\n`)
  
  for (const filePath of pageFiles) {
    if (shouldSkip(filePath)) {
      console.log(`⏭️  Skipping: ${path.relative(appFolder, filePath)} (special page)`)
      skipped++
      continue
    }
    
    if (usesSanity(filePath)) {
      console.log(`✅ Already using Sanity: ${path.relative(appFolder, filePath)}`)
      skipped++
      continue
    }
    
    // Determine language and slug
    const isChinese = filePath.includes('/zh/')
    const language = isChinese ? 'zh' : 'en'
    const slug = getSlugFromPath(filePath)
    
    // Write new content
    const newContent = sanityPageTemplate(slug, language)
    fs.writeFileSync(filePath, newContent)
    
    console.log(`🔄 Updated: ${path.relative(appFolder, filePath)} (slug: ${slug}, lang: ${language})`)
    updated++
  }
  
  console.log(`\n📊 Summary:`)
  console.log(`✅ Updated: ${updated}`)
  console.log(`⏭️  Skipped: ${skipped}`)
  console.log(`\n✨ All pages now use Sanity!`)
}

main()
