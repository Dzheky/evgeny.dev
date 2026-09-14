import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'

import Index, { prerender } from './index.astro'

describe('index page', () => {
  it('is prerendered as a static page', () => {
    expect(prerender).toBe(true)
  })

  it('renders the site title and heading', async () => {
    const container = await AstroContainer.create()
    const html = await container.renderToString(Index)

    expect(html).toContain('<html lang="en">')
    expect(html).toContain('<meta charset="utf-8">')
    expect(html).toContain('<title>evgeny.dev</title>')
    expect(html).toContain('<h1>evgeny.dev</h1>')
  })
})
