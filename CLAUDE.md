# CLAUDE.md

## Project Overview

This is a Next.js rebuild of a WordPress site, migrated to use **Sanity CMS** as the headless content backend. The site is bilingual (English + Chinese).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Sanity v4 (`@sanity/client`, `next-sanity`)
- **Styling**: Tailwind CSS v4, styled-components
- **Rich Text**: `@portabletext/react`
- **Language**: TypeScript + JSX (mixed)
- **React**: v19

## Project Structure

```
app/                  # Next.js App Router pages
  layout.tsx
  page.jsx            # Home page
  about-us/
  blog/
  services/
  contact/
  calendly-appointment/
  zh/                 # Chinese language routes (mirrors English structure)
components/           # Shared UI components
  Navigation.jsx
  Footer.jsx
  BlogIndex.jsx
  BookingBanner.jsx
  ContentPage.jsx
  SanityPage.jsx
  ServicesIndex.jsx
lib/                  # Utility functions
  sanity.js           # Sanity query helpers (getPageBySlug, getAllPages, etc.)
  get-sanity-page.js
  get-page-from-path.js
  html-to-portable-text.js
  portable-text-renderer.jsx
sanity/               # Sanity Studio configuration
  schema.js
  structure.js
  client.js
data/                 # Legacy JSON content (pre-migration)
scripts/              # Migration and content management scripts
xml/                  # Legacy XML data
```

## Key Conventions

- Pages fetch content from Sanity using helpers in `lib/sanity.js`
- `getPageBySlug(slug, language)` — fetch a single page (`language`: `'en'` or `'zh'`)
- `getAllPages(language)` — fetch all pages
- `getPagesByCategory(category, language)` — fetch by category
- Chinese pages live under `/zh/` route prefix
- Sanity Studio runs at `http://localhost:3333` via `npm run sanity:dev`

## Dev Commands

```bash
npm run dev           # Next.js dev server (http://localhost:3000)
npm run build         # Production build
npm run lint          # ESLint
npm run sanity:dev    # Sanity Studio (http://localhost:3333)
npm run sanity:deploy # Deploy Sanity Studio
npm run sanity:migrate # Migrate JSON data to Sanity
```

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```
