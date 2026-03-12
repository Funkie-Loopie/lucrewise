'use client'

import { PortableText } from '@portabletext/react'

/**
 * Component to render Sanity Portable Text content
 */
export default function PortableTextRenderer({ content }) {
  if (!content || !Array.isArray(content)) {
    return null
  }

  return (
    <div className="prose prose-lg max-w-none">
      <PortableText
        value={content}
        components={{
          block: {
            h1: ({ children }) => <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1rem', marginTop: '2rem' }}>{children}</h1>,
            h2: ({ children }) => <h2 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '0.875rem', marginTop: '1.5rem' }}>{children}</h2>,
            h3: ({ children }) => <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem', marginTop: '1.25rem' }}>{children}</h3>,
            h4: ({ children }) => <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', marginTop: '1rem' }}>{children}</h4>,
            h5: ({ children }) => <h5 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', marginTop: '0.875rem' }}>{children}</h5>,
            h6: ({ children }) => <h6 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', marginTop: '0.75rem' }}>{children}</h6>,
            blockquote: ({ children }) => (
              <blockquote style={{ borderLeft: '4px solid #e5e7eb', paddingLeft: '1rem', marginLeft: 0, fontStyle: 'italic', color: '#6b7280' }}>
                {children}
              </blockquote>
            ),
            normal: ({ children }) => <p style={{ marginBottom: '1rem', lineHeight: 1.7 }}>{children}</p>,
          },
          marks: {
            strong: ({ children }) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
            em: ({ children }) => <em style={{ fontStyle: 'italic' }}>{children}</em>,
            code: ({ children }) => (
              <code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.875em' }}>
                {children}
              </code>
            ),
            underline: ({ children }) => <span style={{ textDecoration: 'underline' }}>{children}</span>,
            'strike-through': ({ children }) => <span style={{ textDecoration: 'line-through' }}>{children}</span>,
            link: ({ children, value }) => (
              <a
                href={value?.href}
                target={value?.blank ? '_blank' : undefined}
                rel={value?.blank ? 'noopener noreferrer' : undefined}
                style={{ color: '#2563eb', textDecoration: 'underline' }}
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

