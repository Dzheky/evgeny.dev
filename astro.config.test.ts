import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import config from './astro.config.mjs'

/** True when a file-based route exists for `path` under src/pages. */
function routeExists(path: string): boolean {
  const base = join('src', 'pages', path === '/' ? '' : path)
  return ['index.astro', 'index.md', 'index.mdx'].some((f) => existsSync(join(base, f)))
}

describe('astro config', () => {
  it('targets the production site on the Vercel server adapter', () => {
    expect(config.site).toBe('https://evgeny.dev')
    expect(config.output).toBe('server')
    expect(config.adapter?.name).toBe('@astrojs/vercel')
  })

  it('enables MDX with light and dark Shiki themes', () => {
    const names = (config.integrations ?? [])
      .flat()
      .flatMap((i) => (i && typeof i === 'object' ? [i.name] : []))
    expect(names).toContain('@astrojs/mdx')
    expect(config.markdown?.shikiConfig?.themes).toEqual({
      light: 'github-light',
      dark: 'github-dark',
    })
  })

  it('only redirects legacy URLs to routes that exist', () => {
    const redirects = config.redirects ?? {}
    expect(Object.keys(redirects).length).toBeGreaterThan(0)
    for (const [from, to] of Object.entries(redirects)) {
      const target = typeof to === 'string' ? to : to.destination
      expect(routeExists(target), `${from} -> ${target}`).toBe(true)
    }
  })
})
