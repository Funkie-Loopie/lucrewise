export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // ── Site Settings (singleton) ─────────────────────────
      S.listItem()
        .title('⚙️ Site Settings')
        .child(
          S.editor()
            .title('Site Settings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.divider(),

      // ── Home Page (singletons per language) ───────────────────
      S.listItem()
        .title('🏠 Home Page (EN)')
        .child(
          S.editor()
            .title('Home Page — English')
            .schemaType('homePage')
            .documentId('homePage-en')
        ),

      S.listItem()
        .title('🏠 Home Page (ZH)')
        .child(
          S.editor()
            .title('Home Page — Chinese')
            .schemaType('homePage')
            .documentId('homePage-zh')
        ),

      S.divider(),

      // ── About Page (singletons per language) ──────────────────────
      S.listItem()
        .title('👤 About Page (EN)')
        .child(
          S.editor()
            .title('About Page — English')
            .schemaType('aboutPage')
            .documentId('aboutPage-en')
        ),

      S.listItem()
        .title('👤 About Page (ZH)')
        .child(
          S.editor()
            .title('About Page — Chinese')
            .schemaType('aboutPage')
            .documentId('aboutPage-zh')
        ),

      S.divider(),

      // Pages Section - Main landing pages grouped under Pages folder
      S.listItem()
        .title('Pages')
        .child(
          S.documentList()
            .title('Pages')
            .filter('_type == "page" && (slug.current == "home" || slug.current == "about-us" || slug.current == "services" || slug.current == "blog" || slug.current == "blogs" || slug.current == "博客" || slug.current == "contact" || slug.current == "联系我们")')
            .defaultOrdering([
              { field: 'slug.current', direction: 'asc' },
              { field: 'language', direction: 'asc' }
            ])
            .canHandleIntent((intentName, params) => {
              // Handle intents for creating new pages
              return intentName === 'create' && params.type === 'page'
            })
        ),
      
      // Services Section - All service pages
      S.listItem()
        .title('Services')
        .child(
          S.documentList()
            .title('All Service Pages')
            .filter('_type == "page" && slug.current in ["pre-ipo-opportunities", "tax-planning", "retirement-planning", "estate-planning"]')
            .defaultOrdering([{ field: 'language', direction: 'asc' }, { field: 'title', direction: 'asc' }])
        ),
      
      // Blogs Section - All blog posts
      S.listItem()
        .title('Blogs')
        .child(
          S.documentList()
            .title('All Blog Posts')
            // 只顯示文章：slug 以 blog- 開頭，且不等於 blog / blogs
            .filter(
              '_type == "page" && slug.current match "blog-*" && slug.current != "blog" && slug.current != "blogs"'
            )
            .defaultOrdering([
              { field: 'language', direction: 'asc' },
              { field: 'title', direction: 'asc' },
            ])
        ),
      
      // All other pages
      S.listItem()
        .title('Other Pages')
        .child(
          S.documentList()
            .title('Other Pages')
            .filter('_type == "page" && !(slug.current in ["home", "about-us", "about-us-2", "services", "services-2", "blog", "博客", "contact", "contact-2", "联系我们", "pre-ipo-opportunities", "tax-planning", "retirement-planning", "estate-planning"] || slug.current match "blog-*")')
            .defaultOrdering([{ field: 'language', direction: 'asc' }, { field: 'title', direction: 'asc' }])
        ),
      
    ])
