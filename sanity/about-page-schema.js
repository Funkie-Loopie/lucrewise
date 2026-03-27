import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
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

    // ── Page Header ───────────────────────────────────────────────
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'Main heading at the top of the page',
      validation: Rule => Rule.required(),
    }),

    // ── Intro Section ─────────────────────────────────────────────
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 5,
      description: 'Introductory paragraph shown at the top of the About Us page',
    }),

    // ── Founders / Team ───────────────────────────────────────────
    defineField({
      name: 'founders',
      title: 'Founders / Team',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'founder',
          title: 'Person',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title / Role',
              type: 'string',
              description: 'e.g. "Co-Founder & CEO"',
            }),
            defineField({
              name: 'intro',
              title: 'Bio',
              type: 'text',
              rows: 4,
              description: 'Short introduction or biography',
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt text',
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'title',
              media: 'photo',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'language' },
    prepare({ title }) {
      return { title: `About Page (${title})` }
    },
  },
})
