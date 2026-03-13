import { defineCliConfig } from 'sanity/cli'

// Root-level CLI config used by `sanity` commands (deploy, dataset, etc.)
// Keep this simple and explicit so it never fails because of env vars.
export default defineCliConfig({
  api: {
    projectId: 'fhqlqt4e',   // Sanity project ID
    dataset: 'production',   // Dataset name
  },
})

