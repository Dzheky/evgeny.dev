import { expect, test, type APIRequestContext } from '@playwright/test'

import { E2E_BASE_URL } from '../playwright.config'

// better-auth verifies the Origin header on mutating requests.
const ORIGIN = { origin: E2E_BASE_URL }

let counter = 0
/** Unique per test so parallel workers never collide on the unique email index. */
function credentials() {
  counter += 1
  return {
    name: 'E2E User',
    email: `e2e-${process.pid}-${Date.now()}-${counter}@example.com`,
    password: 'a-long-enough-password',
  }
}

async function signUp(request: APIRequestContext, data = credentials()) {
  const response = await request.post('/api/auth/sign-up/email', {
    data,
    headers: ORIGIN,
  })
  expect(response.ok(), await response.text()).toBe(true)
  return data
}

test.describe('auth API', () => {
  test('health check responds', async ({ request }) => {
    const response = await request.get('/api/auth/ok')
    expect(response.status()).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
  })

  test('signs up and returns the new user', async ({ request }) => {
    const data = credentials()
    const response = await request.post('/api/auth/sign-up/email', {
      data,
      headers: ORIGIN,
    })
    expect(response.status()).toBe(200)
    const body = (await response.json()) as { user: { email: string; name: string } }
    expect(body.user).toMatchObject({ email: data.email, name: data.name })
    expect(response.headers()['set-cookie']).toContain('better-auth.session_token=')
  })

  test('rejects a duplicate email', async ({ request }) => {
    const data = await signUp(request)
    const again = await request.post('/api/auth/sign-up/email', { data, headers: ORIGIN })
    expect(again.status()).toBe(422)
  })

  test('signs in with the right password and rejects the wrong one', async ({
    request,
  }) => {
    const { email, password } = await signUp(request)

    const ok = await request.post('/api/auth/sign-in/email', {
      data: { email, password },
      headers: ORIGIN,
    })
    expect(ok.status()).toBe(200)

    const bad = await request.post('/api/auth/sign-in/email', {
      data: { email, password: 'wrong-password' },
      headers: ORIGIN,
    })
    expect(bad.status()).toBe(401)
  })

  test('has no session before signing in', async ({ request }) => {
    const response = await request.get('/api/auth/get-session')
    expect(response.status()).toBe(200)
    expect(await response.json()).toBeNull()
  })

  test('keeps the session cookie inside the browser context', async ({ page }) => {
    // page.request shares the browser context's cookie jar, so a sign-up here
    // authenticates subsequent page navigations and API calls alike.
    const { email } = await signUp(page.request)

    const cookies = await page.context().cookies()
    expect(cookies.some((c) => c.name === 'better-auth.session_token')).toBe(true)

    const session = await page.request.get('/api/auth/get-session')
    const body = (await session.json()) as { user: { email: string } }
    expect(body.user.email).toBe(email)

    const signOut = await page.request.post('/api/auth/sign-out', {
      data: {},
      headers: ORIGIN,
    })
    expect(signOut.ok(), await signOut.text()).toBe(true)
    expect(await (await page.request.get('/api/auth/get-session')).json()).toBeNull()
  })
})
