// scripts/reorganize-pages.js
import fs from "fs";
import path from "path";

const appFolder = "./app";

// URL decode function
function decodeSlug(slug) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

// Categorize pages
function categorizePage(slug) {
  const decoded = decodeSlug(slug);
  
  // Blog posts
  if (slug.startsWith("blog-") || decoded.includes("博客") || decoded.includes("博文")) {
    return { category: "blog", newSlug: slug.replace(/^blog-/, "") };
  }
  
  // Case studies (文檔)
  if (slug.includes("文檔") || slug.includes("%e6%96%87%e6%a1%88")) {
    return { category: "case-studies", newSlug: slug };
  }
  
  // Services
  if (
    slug.includes("service") ||
    slug.includes("consulting") ||
    slug.includes("consultation") ||
    decoded.includes("服務") ||
    decoded.includes("服务") ||
    slug === "investment-opportunities" ||
    slug === "insurance-consulting-2" ||
    slug === "tax-consultation" ||
    slug === "philanthropic-service" ||
    slug === "business-all-in-one" ||
    slug === "planning-pricing" ||
    slug === "pricing"
  ) {
    return { category: "services", newSlug: slug };
  }
  
  // Chinese pages (main pages in Chinese)
  if (slug.startsWith("%") || decoded.match(/[\u4e00-\u9fa5]/)) {
    // Skip if already categorized
    if (slug.includes("博客") || slug.includes("文檔") || slug.includes("服務")) {
      return null; // Already handled above
    }
    return { category: "zh", newSlug: slug };
  }
  
  // Main pages (keep at root)
  if (
    slug === "home" ||
    slug === "about-us" ||
    slug === "contact" ||
    slug === "calendly-appointment" ||
    slug === "investment-opportunities" ||
    slug === "financial-planning-blog"
  ) {
    return { category: "root", newSlug: slug };
  }
  
  // Skip special query params
  if (slug.startsWith("?page_id=")) {
    return null;
  }
  
  // Default: keep at root
  return { category: "root", newSlug: slug };
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function movePage(oldPath, newPath) {
  const oldDir = path.dirname(oldPath);
  const newDir = path.dirname(newPath);
  
  ensureDir(newDir);
  
  if (fs.existsSync(oldPath)) {
    fs.copyFileSync(oldPath, newPath);
    console.log(`✅ Moved: ${oldPath} → ${newPath}`);
    return true;
  }
  return false;
}

function main() {
  console.log("🔄 Reorganizing app pages...\n");
  
  const directories = fs.readdirSync(appFolder, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  const moves = [];
  const toDelete = [];
  
  // Process each directory
  for (const dir of directories) {
    const pagePath = path.join(appFolder, dir, "page.jsx");
    
    if (!fs.existsSync(pagePath)) {
      continue;
    }
    
    const category = categorizePage(dir);
    
    if (!category) {
      continue; // Skip if already handled
    }
    
    let newPath;
    
    if (category.category === "root") {
      // Keep at root, but handle special cases
      if (dir === "home") {
        // home should be at app/page.jsx (already there)
        continue;
      }
      newPath = path.join(appFolder, category.newSlug, "page.jsx");
    } else {
      newPath = path.join(appFolder, category.category, category.newSlug, "page.jsx");
    }
    
    const oldPath = pagePath;
    
    // Skip if already in the right place
    if (oldPath === newPath) {
      continue;
    }
    
    moves.push({ oldPath, newPath, dir });
  }
  
  // Execute moves
  console.log(`📦 Found ${moves.length} pages to reorganize\n`);
  
  for (const { oldPath, newPath, dir } of moves) {
    movePage(oldPath, newPath);
    toDelete.push(path.dirname(oldPath));
  }
  
  // Clean up old directories (only if they're empty or only contain page.jsx)
  console.log("\n🧹 Cleaning up old directories...");
  for (const dirPath of toDelete) {
    if (dirPath === appFolder) continue;
    
    try {
      const files = fs.readdirSync(dirPath);
      if (files.length === 0 || (files.length === 1 && files[0] === "page.jsx")) {
        fs.rmSync(dirPath, { recursive: true, force: true });
        console.log(`🗑️  Deleted: ${dirPath}`);
      }
    } catch (err) {
      console.log(`⚠️  Could not delete ${dirPath}: ${err.message}`);
    }
  }
  
  // Handle duplicates (about-us-2, services-2, contact-2)
  console.log("\n🔍 Checking for duplicates...");
  const duplicates = ["about-us-2", "services-2", "contact-2"];
  for (const dup of duplicates) {
    const dupPath = path.join(appFolder, dup);
    if (fs.existsSync(dupPath)) {
      console.log(`⚠️  Found duplicate: ${dup} (consider removing manually if not needed)`);
    }
  }
  
  console.log("\n✨ Reorganization complete!");
  console.log("\n📁 New structure:");
  console.log("  /app/page.jsx (home)");
  console.log("  /app/blog/[slug]/page.jsx");
  console.log("  /app/services/[slug]/page.jsx");
  console.log("  /app/case-studies/[slug]/page.jsx");
  console.log("  /app/zh/[slug]/page.jsx (Chinese pages)");
  console.log("  /app/[main-pages]/page.jsx (about-us, contact, etc.)");
}

main();

