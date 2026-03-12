// scripts/generate-pages.js
import fs from "fs";
import path from "path";

const dataFolder = "./data";
const appFolder = "./app";

// 简单的 page 模板函数
function createPageComponent(importPath) {
  return `import content from "${importPath}";

export default function Page() {
  return (
    <main style={{ padding: "3rem 1.5rem", maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>
        {content.title}
      </h1>

      {/* 纯文本版，方便 SEO / 预览 */}
      <p style={{ marginBottom: "2rem", lineHeight: 1.6 }}>{content.text}</p>

      {/* 原始 HTML 版，保留你在 WordPress 里的布局 */}
      <div dangerouslySetInnerHTML={{ __html: content.rawHTML }} />
    </main>
  );
}
`;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// URL decode function
function decodeSlug(slug) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

// Categorize pages (same logic as reorganize-pages.js)
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
    slug === "insurance-consulting-2" ||
    slug === "tax-consultation" ||
    slug === "philanthropic-service" ||
    slug === "business-all-in-one" ||
    slug === "planning-pricing" ||
    slug === "pricing"
  ) {
    // Special case: main services page stays at /services/page.jsx
    if (slug === "services" || slug === "services-2") {
      return { category: "services", newSlug: slug === "services" ? "" : "services-2" };
    }
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

function main() {
  const files = fs.readdirSync(dataFolder).filter((f) => f.endsWith(".json"));

  if (files.length === 0) {
    console.error("❌ data 文件夹里没有任何 *.json，先确认 parse-xml 是否成功。");
    process.exit(1);
  }

  ensureDir(appFolder);

  for (const file of files) {
    const slug = path.basename(file, ".json");
    const importPath = `@/data/${file}`;

    if (slug === "home") {
      // 首页：app/page.jsx
      const target = path.join(appFolder, "page.jsx");
      fs.writeFileSync(target, createPageComponent(importPath));
      console.log(`🏠 Generated: app/page.jsx (from ${file})`);
    } else {
      const category = categorizePage(slug);
      
      if (!category) {
        console.log(`⏭️  Skipped: ${slug} (special page)`);
        continue;
      }
      
      let target;
      
      if (category.category === "root") {
        const pageDir = path.join(appFolder, category.newSlug);
        ensureDir(pageDir);
        target = path.join(pageDir, "page.jsx");
      } else if (category.newSlug === "") {
        // Special case: main services page
        target = path.join(appFolder, category.category, "page.jsx");
      } else {
        const pageDir = path.join(appFolder, category.category, category.newSlug);
        ensureDir(pageDir);
        target = path.join(pageDir, "page.jsx");
      }
      
      fs.writeFileSync(target, createPageComponent(importPath));
      const relativePath = path.relative(appFolder, target);
      console.log(`📄 Generated: app/${relativePath} (from ${file})`);
    }
  }

  console.log("\n✨ All pages generated from data/*.json");
  console.log("\n📁 Organized structure:");
  console.log("  /app/page.jsx (home)");
  console.log("  /app/blog/[slug]/page.jsx");
  console.log("  /app/services/[slug]/page.jsx");
  console.log("  /app/case-studies/[slug]/page.jsx");
  console.log("  /app/zh/[slug]/page.jsx (Chinese pages)");
  console.log("  /app/[main-pages]/page.jsx (about-us, contact, etc.)");
}

main();
