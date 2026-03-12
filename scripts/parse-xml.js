import fs from "fs";
import path from "path";
import { parseStringPromise } from "xml2js";
import { JSDOM } from "jsdom";

const xmlFolder = "./xml";
const dataFolder = "./data";

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
}

async function parseXML(filePath) {
  console.log(`📄 Parsing: ${filePath}`);

  const xml = fs.readFileSync(filePath, "utf-8");
  const result = await parseStringPromise(xml);

  const channel = result?.rss?.channel?.[0];

  // 如果 channel 或 item 不存在，跳过文件
  if (!channel || !channel.item) {
    console.log(`⚠️ No <item> found in ${filePath}, skipping.`);
    return {};
  }

  const items = channel.item;
  const pages = {};

  for (const item of items) {
    const postType = item["wp:post_type"]?.[0];
    if (postType !== "page") continue;

    const title = item.title?.[0] ?? "Untitled";
    const link = item.link?.[0] ?? "";

    // slug 清洗
    let slug = link
      .replace("https://lucrewisefin.10web.me/", "")
      .replace(/\//g, "");

    if (!slug || slug.length === 0) slug = "home";

    const rawHTML = item["content:encoded"]?.[0] ?? "";
    const dom = new JSDOM(rawHTML);
    const textContent = dom.window.document.body.textContent
      .replace(/\s+/g, " ")
      .trim();

    pages[slug] = {
      title,
      slug,
      rawHTML,
      text: textContent,
      url: link,
    };
  }

  return pages;
}

async function main() {
  const files = fs.readdirSync(xmlFolder);
  let allPages = {};

  for (const file of files) {
    const filePath = path.join(xmlFolder, file);
    try {
      const parsed = await parseXML(filePath);
      allPages = { ...allPages, ...parsed };
    } catch (err) {
      console.error(`❌ Error parsing ${file}:`, err.message);
    }
  }

  // 输出 JSON
  for (const slug in allPages) {
    fs.writeFileSync(
      `${dataFolder}/${slug}.json`,
      JSON.stringify(allPages[slug], null, 2)
    );
  }

  console.log("🎉 DONE! Pages exported to /data/");
  console.log("📁 Pages found:", Object.keys(allPages));
}

main();
