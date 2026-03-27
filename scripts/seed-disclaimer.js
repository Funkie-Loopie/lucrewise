/**
 * Patches the siteSettings document to add default blog disclaimer text.
 * Run once: node scripts/seed-disclaimer.js
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fhqlqt4e',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const ZH = '免责声明：本文内容仅供参考，不构成任何投资、税务、法律或财务建议。投资有风险，过去的表现不代表未来的结果。请在做出任何财务决策之前，咨询持牌专业人士。'
const EN = 'Disclaimer: The content of this article is for informational purposes only and does not constitute investment, tax, legal, or financial advice. All investments involve risk and past performance is not indicative of future results. Please consult a licensed professional before making any financial decisions.'

async function run() {
  // Ensure the siteSettings document exists, then patch disclaimer fields
  const existing = await client.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]`)

  if (!existing) {
    await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      blogDisclaimerZh: ZH,
      blogDisclaimerEn: EN,
    })
    console.log('Created siteSettings with disclaimers.')
  } else {
    await client
      .patch('siteSettings')
      .setIfMissing({ blogDisclaimerZh: ZH, blogDisclaimerEn: EN })
      .commit()
    console.log('Patched existing siteSettings with disclaimers.')
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
