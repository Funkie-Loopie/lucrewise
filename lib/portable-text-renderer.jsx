'use client'

import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fhqlqt4e',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}

export default function PortableTextRenderer({ content }) {
  if (!content || !Array.isArray(content)) return null

  return (
    <div className="prose-content">
      <PortableText
        value={content}
        components={{
          types: {
            image: ({ value }) => {
              if (!value?.asset?._ref) return null
              return (
                <figure className="prose-image">
                  <img
                    src={urlFor(value).width(900).fit('max').auto('format').url()}
                    alt={value.alt || ''}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                </figure>
              )
            },
          },
          block: {
            h1:         ({ children }) => <h1>{children}</h1>,
            h2:         ({ children }) => <h2>{children}</h2>,
            h3:         ({ children }) => <h3>{children}</h3>,
            h4:         ({ children }) => <h4>{children}</h4>,
            h5:         ({ children }) => <h5>{children}</h5>,
            h6:         ({ children }) => <h6>{children}</h6>,
            blockquote: ({ children }) => <blockquote>{children}</blockquote>,
            normal:     ({ children }) => <p>{children}</p>,
          },
          marks: {
            strong:          ({ children }) => <strong>{children}</strong>,
            em:              ({ children }) => <em>{children}</em>,
            underline:       ({ children }) => <u>{children}</u>,
            'strike-through':({ children }) => <s>{children}</s>,
            code:            ({ children }) => <code>{children}</code>,
            link: ({ children, value }) => (
              <a
                href={value?.href}
                target={value?.blank ? '_blank' : undefined}
                rel={value?.blank ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
          },
        }}
      />
    </div>
  )
}
