import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

config({ path: path.resolve(process.cwd(), '.env.local') })
config({ path: path.resolve(process.cwd(), '.env') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fhqlqt4e'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN || ''

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

function key() {
  return Math.random().toString(36).slice(2, 10)
}

function h2(text) {
  return { _type: 'block', _key: key(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] }
}

function p(text) {
  return { _type: 'block', _key: key(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] }
}

const EN_ID = 'tZJpDsd6WTNNfKMBbttY3P'
const ZH_ID = 'MSCqfg0XjCNqKYxU4b1fm0'

const enContent = [
  h2('Pre-IPO Opportunities'),
  p('Seize the investment edge before enterprise value plateaus. Leveraging deep industry networks and rigorous due diligence, we identify high-growth "unicorns" with clear paths to liquidity. Our service provides exclusive access to scarce private equity allocations, enabling investors to strategically position themselves during the critical pre-listing window. By capturing the valuation bridge between private and public markets, we help you build a resilient Private Equity Portfolio designed for significant capital appreciation.'),
  h2('Tax Planning'),
  p('Move beyond basic filing to proactive tax optimization. We integrate tax strategies into your broader asset allocation and wealth succession plans. Leveraging our CPA/EA expertise and rigorous risk assessment, we provide comprehensive guidance on tax-efficient investing, small business structures, and multi-year deduction strategies. Our goal is to ensure full compliance while minimizing tax liabilities—maximizing your after-tax net returns and ensuring every dollar of your wealth is working at peak efficiency.'),
  h2('Retirement Planning'),
  p('A holistic roadmap from wealth accumulation to sustainable distribution. Retirement planning is more than just saving, it is an engineered guarantee for your future quality of life. Using rigorous risk modeling and actuarial logic, we help you balance current tax advantages, long-term inflation risks, and cross-cycle asset allocation. From optimizing 401(k)/IRA management, Roth conversion and annuity strategies to designing complex withdrawal sequences, our mission is to build a resilient cash flow system that ensures your wealth outlasts your needs while securing a lasting legacy.'),
  h2('Estate Planning'),
  p("Beyond the transfer of wealth, ensuring your family's values and vision endure. Estate planning is more than signing legal documents; it is the ultimate safeguard for those you love. We integrate trust structure optimization, tax planning, and strategic insurance solutions to design multi-dimensional succession plans. Whether it is minimizing estate taxes, avoiding the complexities of probate, or facilitating charitable giving and multi-generational legacy transfers, we bring professional rigor and a deep respect for family values to help you achieve seamless wealth migration and lasting peace of mind."),
]

const zhContent = [
  h2('Pre-IPO投资'),
  p('在企业价值爆发的前夜，抢占全球顶尖独角兽的投资先机。我们凭借深厚的行业资源与严谨的尽职调查能力，为您筛选基本面稳健、上市路径清晰的优质标的。通过独家渠道获取稀缺份额，我们协助投资者在风险可控的前提下，提前布局具有高成长潜力的私募股权组合，捕捉从一级市场向二级市场跨越带来的倍数级资本增值机会。'),
  h2('税务规划'),
  p('超越传统的报税，通过前瞻性策略实现税务优化。我们将税务视角融入您的整体资产配置与财富传承计划中，利用 CPA/EA 专业背景与严谨的风险建模，为您提供全方位的税务合规与节税策略。无论是针对高净值家庭的跨年度抵扣、小型企业的税务架构优化，还是复杂的投资收益穿透，我们都致力于在合法合规的前提下，最大化您的税后净收益，让每一分财富都发挥其应有的效率。'),
  h2('退休规划'),
  p('为您量身打造从财富积累到财富抽取的全周期路线图。退休规划不仅是存款，更是对未来生活品质的工程化保障。依托严谨的风险建模与精算思维，我们为您平衡当前的税务优惠、长期的通胀风险以及跨周期的资产分配。无论是 401(k)/IRA 的优化管理、Roth conversion税优方式，年金策略配置，还是复杂的退休金分配顺序，我们致力于为您构建一个稳健的现金流体系，让您在享受丰盈退修生活的同时，确保财富的可持续性与传承价值。'),
  h2('遗产和传承规划'),
  p('超越财富的传递，确保家族价值观与愿景的长久延续。遗产规划不仅是法律文件的签署，更是对挚爱之人的终极守护。我们结合信托架构优化、税务筹划与保险策略，为您打造多维度的传承方案。无论是优化遗产税负、规避繁琐的认证程序（Probate），还是实现特定目的的慈善捐赠与跨代传承，我们都以专业的严谨性与对家庭价值的深度尊重，协助您在法律框架下实现财富的平稳平移与基业长青。'),
]

async function run() {
  await client.patch(EN_ID).set({ content: enContent }).commit()
  console.log('✅ Updated: Services (en)')

  await client.patch(ZH_ID).set({ content: zhContent }).commit()
  console.log('✅ Updated: 服务 (zh)')

  console.log('\n✨ Done!')
}

run().catch(console.error)
