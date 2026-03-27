import { defineType, defineField } from 'sanity'

// Reusable nav link object used in both header and footer arrays
const navLinkFields = [
  defineField({ name: 'labelEn', title: 'Label (English)', type: 'string' }),
  defineField({ name: 'labelZh', title: 'Label (Chinese)', type: 'string' }),
  defineField({
    name: 'href',
    title: 'Path',
    type: 'string',
    description: 'Relative path WITHOUT language prefix, e.g. /about-us or /services/tax-consultation',
  }),
]

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // ─── Header ───────────────────────────────────────────
    defineField({
      name: 'siteName',
      title: 'Site Name (Logo Text)',
      type: 'string',
      description: 'Brand name shown in the navigation bar.',
      initialValue: 'Lucrewise',
    }),
    defineField({
      name: 'headerNavItems',
      title: 'Header Navigation',
      type: 'array',
      description: 'Links shown in the top navigation bar. Leave empty to use defaults.',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Nav Item',
          fields: navLinkFields,
          preview: {
            select: { title: 'labelEn', subtitle: 'href' },
          },
        },
      ],
      initialValue: [
        { _type: 'navItem', labelEn: 'Home',       labelZh: '主页',   href: '/' },
        { _type: 'navItem', labelEn: 'About Us',   labelZh: '关于我们', href: '/about-us' },
        { _type: 'navItem', labelEn: 'Services',   labelZh: '服务',   href: '/services' },
        { _type: 'navItem', labelEn: 'Blog',       labelZh: '博客',   href: '/blog' },
        { _type: 'navItem', labelEn: 'Contact Us', labelZh: '联系我们', href: '/contact' },
      ],
    }),

    // ─── Footer — Column 2 ────────────────────────────────
    defineField({
      name: 'footerCol2HeadingEn',
      title: 'Footer Column 2 — Heading (English)',
      type: 'string',
      initialValue: 'Services',
    }),
    defineField({
      name: 'footerCol2HeadingZh',
      title: 'Footer Column 2 — Heading (Chinese)',
      type: 'string',
      initialValue: '服务',
    }),
    defineField({
      name: 'footerCol2Links',
      title: 'Footer Column 2 — Links',
      type: 'array',
      description: 'Links shown in the second footer column (e.g. Services).',
      of: [
        {
          type: 'object',
          name: 'footerLink',
          title: 'Link',
          fields: navLinkFields,
          preview: {
            select: { title: 'labelEn', subtitle: 'href' },
          },
        },
      ],
      initialValue: [
        { _type: 'footerLink', labelEn: 'Investment Opportunities', labelZh: '投资机会', href: '/services/investment-opportunities' },
        { _type: 'footerLink', labelEn: 'Insurance Consulting',     labelZh: '保险规划', href: '/services/insurance-consulting' },
        { _type: 'footerLink', labelEn: 'Tax Guidance',             labelZh: '税务咨询', href: '/services/tax-consultation' },
        { _type: 'footerLink', labelEn: 'Business All-in-One',      labelZh: '企业一站式', href: '/services/business-all-in-one' },
        { _type: 'footerLink', labelEn: 'Philanthropic Service',    labelZh: '慈善捐赠', href: '/services/philanthropic-service' },
      ],
    }),

    // ─── Footer — Column 3 ────────────────────────────────
    defineField({
      name: 'footerCol3HeadingEn',
      title: 'Footer Column 3 — Heading (English)',
      type: 'string',
      initialValue: 'About Us',
    }),
    defineField({
      name: 'footerCol3HeadingZh',
      title: 'Footer Column 3 — Heading (Chinese)',
      type: 'string',
      initialValue: '关于我们',
    }),
    defineField({
      name: 'footerCol3Links',
      title: 'Footer Column 3 — Links',
      type: 'array',
      description: 'Links shown in the third footer column (e.g. About Us).',
      of: [
        {
          type: 'object',
          name: 'footerLink3',
          title: 'Link',
          fields: navLinkFields,
          preview: {
            select: { title: 'labelEn', subtitle: 'href' },
          },
        },
      ],
      initialValue: [
        { _type: 'footerLink3', labelEn: 'Our Leadership', labelZh: '我们的领导', href: '/about-us' },
        { _type: 'footerLink3', labelEn: 'Join Us',        labelZh: '加入我们',   href: '/about-us' },
        { _type: 'footerLink3', labelEn: 'FAQs',           labelZh: '常见问题',   href: '/about-us' },
      ],
    }),

    // ─── Footer — Contact ──────────────────────────────────
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Shown in the footer and contact section.',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
      description: 'Shown in the footer (e.g. +1 (925)968-8388).',
    }),

    // ─── Footer — Social Media ─────────────────────────────
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'twitterUrl',  title: 'X / Twitter URL', type: 'url' }),
    defineField({ name: 'youtubeUrl',  title: 'YouTube URL', type: 'url' }),

    // ─── Blog Disclaimer ──────────────────────────────────
    defineField({
      name: 'blogDisclaimerZh',
      title: 'Blog Disclaimer (Chinese)',
      type: 'text',
      rows: 4,
      description: 'Shown at the bottom of every blog post.',
      initialValue: '免责声明：本文内容仅供参考，不构成任何投资、税务、法律或财务建议。投资有风险，过去的表现不代表未来的结果。请在做出任何财务决策之前，咨询持牌专业人士。',
    }),
    defineField({
      name: 'blogDisclaimerEn',
      title: 'Blog Disclaimer (English)',
      type: 'text',
      rows: 4,
      description: 'Shown at the bottom of every blog post.',
      initialValue: 'Disclaimer: The content of this article is for informational purposes only and does not constitute investment, tax, legal, or financial advice. All investments involve risk and past performance is not indicative of future results. Please consult a licensed professional before making any financial decisions.',
    }),

    // ─── Footer — Copyright ────────────────────────────────
    defineField({
      name: 'copyrightEn',
      title: 'Copyright Text (English)',
      type: 'string',
      description: 'e.g. © 2025 Lucrewise Financial. All rights reserved.',
    }),
    defineField({
      name: 'copyrightZh',
      title: 'Copyright Text (Chinese)',
      type: 'string',
      description: 'e.g. © 2025 Lucrewise Financial. 版权所有。',
    }),
  ],
  preview: {
    select: { title: 'siteName' },
    prepare({ title }) {
      return { title: title || 'Site Settings' }
    },
  },
})
