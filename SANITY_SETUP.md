# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for your Next.js project.

## Step 1: Create a Sanity Account and Project

1. Go to [https://www.sanity.io](https://www.sanity.io) and sign up for a free account
2. Create a new project (or use an existing one)
3. Note your **Project ID** and **Dataset name** (usually "production")

## Step 2: Install Sanity Studio (Optional but Recommended)

Sanity Studio is a visual editor for your content. You can run it locally or deploy it.

```bash
# Install Sanity CLI globally (if not already installed)
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Initialize Sanity in your project (if not already done)
# This will create the sanity folder structure
```

## Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Sanity credentials:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-api-token-here
   ```

3. Get your API token:
   - Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
   - Select your project
   - Go to "API" → "Tokens"
   - Create a new token with "Editor" permissions
   - Copy the token to your `.env.local` file

## Step 4: Run Sanity Studio Locally

```bash
npm run sanity:dev
```

This will start Sanity Studio at `http://localhost:3333` where you can:
- View and edit your content
- Add new pages
- Manage your content structure

## Step 5: Migrate Existing JSON Data

Once your Sanity project is set up, migrate your existing JSON files:

```bash
npm run sanity:migrate
```

This script will:
- Read all JSON files from the `data/` directory
- Detect language (English/Chinese) from filenames
- Create corresponding documents in Sanity
- Skip files that already exist

## Step 6: Deploy Sanity Studio (Optional)

Deploy your Sanity Studio to make it accessible online:

```bash
npm run sanity:deploy
```

This will give you a URL like `https://your-project.sanity.studio`

## Step 7: Update Your Components

Your components are already set up to work with Sanity! The `lib/sanity.js` file provides helper functions:

- `getPageBySlug(slug, language)` - Get a single page
- `getAllPages(language)` - Get all pages
- `getPagesByCategory(category, language)` - Get pages by category

## Example: Updating a Page Component

Instead of:
```jsx
import content from "@/data/home.json"
```

Use:
```jsx
import { getPageBySlug } from "@/lib/sanity"

export default async function Page() {
  const content = await getPageBySlug('home', 'en')
  if (!content) return <div>Page not found</div>
  
  return (
    <main>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.rawHTML }} />
    </main>
  )
}
```

## Troubleshooting

### "Project ID not found"
- Make sure `NEXT_PUBLIC_SANITY_PROJECT_ID` is set in `.env.local`
- Restart your Next.js dev server after adding env variables

### "Unauthorized" errors
- Check that your `SANITY_API_TOKEN` is correct
- Ensure the token has "Editor" permissions

### Migration script fails
- Make sure all environment variables are set
- Check that your Sanity project exists and is accessible
- Verify the dataset name matches (usually "production")

## Next Steps

1. ✅ Set up your Sanity project
2. ✅ Configure environment variables
3. ✅ Run the migration script
4. ✅ Test Sanity Studio locally
5. ✅ Update your page components to use Sanity data
6. ✅ Deploy Sanity Studio (optional)

## Support

- Sanity Documentation: [https://www.sanity.io/docs](https://www.sanity.io/docs)
- Sanity Community: [https://slack.sanity.io](https://slack.sanity.io)

