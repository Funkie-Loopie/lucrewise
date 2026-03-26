import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        // Allow the same slug to be reused for different languages
        // e.g. "home" with language = "en" and "home" with language = "zh"
        isUnique: (slug, context) => {
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2024-01-01' })
          const language = document?.language || 'en'
          const id = document?._id.replace(/^drafts\./, '')

          // Only enforce uniqueness within the same language
          const params = { slug, language, id }
          const query = `!defined(*[
            _type == "page" &&
            slug.current == $slug &&
            language == $language &&
            !(_id in [$id, "drafts." + $id])
          ][0]._id)`

          return client.fetch(query, params)
        },
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'text',
      title: 'Plain Text (for SEO)',
      type: 'text',
      description: 'Plain text version of the content for SEO and preview purposes'
    }),
    defineField({
      name: 'content',
      title: 'Content (Rich Text)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'H6', value: 'h6' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text'
            }
          ]
        }
      ],
      description: 'Rich text content converted from HTML'
    }),
    defineField({
      name: 'rawHTML',
      title: 'Raw HTML Content (Legacy)',
      type: 'text',
      description: 'Original HTML content from WordPress. Kept for reference or fallback.',
      hidden: true // Hide from Studio UI but keep in schema
    }),
    defineField({
      name: 'url',
      title: 'Original URL',
      type: 'url',
      description: 'Original WordPress URL (for reference)'
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Chinese', value: 'zh' }
        ]
      },
      initialValue: 'en'
    }),
    // Single tag selected from a dropdown of 6 fixed options
    // Only shown for blog posts (slug starting with "blog-")
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      options: {
        list: [
          { title: 'Pre-IPO Opportunities', value: 'Pre-IPO Opportunities' },
          { title: 'Tax Planning', value: 'Tax Planning' },
          { title: 'Retirement Planning', value: 'Retirement Planning' },
          { title: 'Estate Planning', value: 'Estate Planning' },
        ],
        layout: 'dropdown',
      },
      hidden: ({document}) => {
        const slug = document?.slug?.current || ''
        return !slug.startsWith('blog-')
      },
      description: 'Select one tag for this blog post or page'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current'
    }
  }
})

