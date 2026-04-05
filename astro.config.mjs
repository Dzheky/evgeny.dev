import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import vercel from '@astrojs/vercel/static'

export default defineConfig({
  site: 'https://evgeny.dev',
  output: 'static',
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
    '/posts/my_updated_personal_website': '/blog/my-updated-personal-website',
    '/subscribe': '/',
    '/dashboard': '/',
    '/projects': '/',
    '/obsidian': '/',
    '/language-test': '/',
  },
})
