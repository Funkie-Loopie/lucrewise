import Image from 'next/image'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

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

export default function AboutPage({ data }) {
  if (!data) return null

  const { pageTitle, intro, founders = [] } = data

  return (
    <main>
      {/* ── Hero / Intro ─────────────────────────────────────── */}
      <section className="about-hero section--navy section--lg">
        <div className="container">
          <p className="about-hero__label">About Us</p>
          <h1 className="about-hero__title">{pageTitle}</h1>
          {intro && <p className="about-hero__intro">{intro}</p>}
        </div>
      </section>

      {/* ── Founders Grid ────────────────────────────────────── */}
      {founders.length > 0 && (
        <section className="about-founders section section--white">
          <div className="container">
            <div className="about-founders__grid">
              {founders.map((founder, i) => (
                <article key={i} className="founder-card">
                  <div className="founder-card__photo-wrap">
                    {founder.photo?.asset?.url ? (
                      <Image
                        src={urlFor(founder.photo).width(400).height(400).fit('crop').url()}
                        alt={founder.photo.alt || founder.name}
                        width={400}
                        height={400}
                        className="founder-card__photo"
                      />
                    ) : (
                      <div className="founder-card__photo-placeholder">
                        <span>{founder.name?.[0] ?? '?'}</span>
                      </div>
                    )}
                  </div>
                  <div className="founder-card__body">
                    <h2 className="founder-card__name">{founder.name}</h2>
                    {founder.title && (
                      <p className="founder-card__title">{founder.title}</p>
                    )}
                    {founder.intro && (
                      <p className="founder-card__intro">{founder.intro}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
