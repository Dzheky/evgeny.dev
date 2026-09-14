import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'https://evgeny.dev',
  // Server output: dashboard, auth, and the post writer are on-demand.
  // Mark public blog pages with `export const prerender = true`.
  output: 'server',
  adapter: vercel(),
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  redirects: {
    // Legacy URLs from the v1 site. Point the old post at the home page until the
    // blog is rebuilt; restore '/blog/my-updated-personal-website' when it exists.
    '/posts/my_updated_personal_website': '/',
    '/subscribe': '/',
    '/projects': '/',
    '/obsidian': '/',
    '/language-test': '/',
  },
})
