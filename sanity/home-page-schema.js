import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Chinese', value: 'zh' },
        ],
      },
      initialValue: 'en',
      validation: Rule => Rule.required(),
    }),

    // ── Hero Section ──────────────────────────────────────────────
    defineField({
      name: 'heroLabel',
      title: 'Hero — Label',
      type: 'string',
      description: 'Small label above the headline (e.g. "Trusted Financial Advisory")',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero — Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubText',
      title: 'Hero — Sub Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroCtaServices',
      title: 'Hero — CTA: Explore Services',
      type: 'string',
    }),
    defineField({
      name: 'heroCtaBook',
      title: 'Hero — CTA: Book a Consultation',
      type: 'string',
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking URL (Calendly)',
      type: 'url',
      description: 'Link for the "Book a Consultation" button',
    }),

    // ── Stats Section ─────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),

    // ── Services Section Header ───────────────────────────────────
    defineField({
      name: 'servicesSectionLabel',
      title: 'Services Section — Label',
      type: 'string',
    }),
    defineField({
      name: 'servicesSectionTitle',
      title: 'Services Section — Title',
      type: 'string',
    }),
    defineField({
      name: 'servicesSectionSubText',
      title: 'Services Section — Sub Text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'servicesViewAllLabel',
      title: 'Services Section — "View All Services" button label',
      type: 'string',
    }),
    defineField({
      name: 'servicesLearnMoreLabel',
      title: 'Services Section — "Learn More" link label',
      type: 'string',
    }),

    // ── About Section ─────────────────────────────────────────────
    defineField({
      name: 'aboutLabel',
      title: 'About Section — Label',
      type: 'string',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Section — Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutBody',
      title: 'About Section — Body',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'aboutCtaLabel',
      title: 'About Section — CTA button label',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'language' },
    prepare({ title }) {
      return { title: `Home Page (${title})` }
    },
  },
})
