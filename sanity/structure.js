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
            .filter('_type == "page" && (slug.current match "tax-consultation*" || slug.current match "insurance-consulting*" || slug.current match "investment-opportunities*" || slug.current match "business-all-in-one*" || slug.current match "philanthropic-service*" || slug.current match "税务咨询*" || slug.current match "保险规划*" || slug.current match "投资机会*" || slug.current match "企业一站式*" || slug.current match "慈善捐赠*")')
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
            .filter('_type == "page" && !(slug.current == "home" || slug.current == "about-us" || slug.current == "about-us-2" || slug.current == "services" || slug.current == "services-2" || slug.current == "blog" || slug.current == "博客" || slug.current == "contact" || slug.current == "contact-2" || slug.current == "联系我们" || slug.current match "blog-*" || slug.current match "tax-consultation*" || slug.current match "insurance-consulting*" || slug.current match "investment-opportunities*" || slug.current match "business-all-in-one*" || slug.current match "philanthropic-service*" || slug.current match "税务咨询*" || slug.current match "保险规划*" || slug.current match "投资机会*" || slug.current match "企业一站式*" || slug.current match "慈善捐赠*")')
            .defaultOrdering([{ field: 'language', direction: 'asc' }, { field: 'title', direction: 'asc' }])
        ),
      
    ])
