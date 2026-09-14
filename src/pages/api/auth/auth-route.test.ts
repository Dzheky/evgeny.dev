import type { APIContext } from 'astro'
import { describe, expect, it, vi } from 'vitest'

import { createTestDb } from '../../../test/db'

vi.mock('../../../lib/auth', async () => {
  const { createAuth } =
    await vi.importActual<typeof import('../../../lib/auth')>('../../../lib/auth')
  const database = await createTestDb()
  return {
    auth: createAuth(database, {
      secret: 'route-secret-route-secret-route-secret',
      baseURL: 'http://localhost:4321',
    }),
  }
})

const { ALL, prerender } = await import('./[...all]')

function call(request: Request) {
  return ALL({ request } as APIContext)
}

describe('/api/auth/[...all]', () => {
  it('is rendered on demand, never prerendered', () => {
    expect(prerender).toBe(false)
  })

  it('answers the better-auth health check', async () => {
    const res = await call(new Request('http://localhost:4321/api/auth/ok'))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
  })

  it('forwards sign-up requests to better-auth', async () => {
    const res = await call(
      new Request('http://localhost:4321/api/auth/sign-up/email', {
        method: 'POST',
        headers: { 'content-type': 'application/json', origin: 'http://localhost:4321' },
        body: JSON.stringify({
          name: 'R',
          email: 'route@example.com',
          password: 'longenough',
        }),
      }),
    )
    expect(res.status).toBe(200)
    expect(res.headers.get('set-cookie')).toContain('better-auth.session_token=')
  })

  it('404s for unknown auth endpoints', async () => {
    const res = await call(new Request('http://localhost:4321/api/auth/does-not-exist'))
    expect(res.status).toBe(404)
  })
})
