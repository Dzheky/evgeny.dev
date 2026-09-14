import { afterEach, describe, expect, it, vi } from 'vitest'

import * as schema from '../db/schema'
import { createTestDb } from '../test/db'
import { auth, createAuth } from './auth'
import { DEFAULT_AUTH_URL } from './env'

afterEach(() => {
  vi.unstubAllEnvs()
})

const BASE_URL = 'http://localhost:4321'
const SECRET = 'test-secret-test-secret-test-secret-test'
const CREDENTIALS = {
  name: 'Evgeny',
  email: 'evgeny@example.com',
  password: 'correct horse',
}

async function setup() {
  const database = await createTestDb()
  return { database, auth: createAuth(database, { secret: SECRET, baseURL: BASE_URL }) }
}

function post(path: string, body: unknown, headers: Record<string, string> = {}) {
  return new Request(`${BASE_URL}/api/auth${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: BASE_URL, ...headers },
    body: JSON.stringify(body),
  })
}

describe('createAuth', () => {
  it('signs a user up with email and password and persists them', async () => {
    const { auth, database } = await setup()
    const result = await auth.api.signUpEmail({ body: CREDENTIALS })

    expect(result.user).toMatchObject({ name: 'Evgeny', email: 'evgeny@example.com' })
    expect(result.token).toEqual(expect.any(String))

    const users = await database.select().from(schema.user)
    expect(users).toHaveLength(1)
    const accounts = await database.select().from(schema.account)
    expect(accounts[0]?.providerId).toBe('credential')
    // Passwords are never stored in clear text.
    expect(accounts[0]?.password).not.toBe(CREDENTIALS.password)
  })

  it('rejects a duplicate email', async () => {
    const { auth } = await setup()
    await auth.api.signUpEmail({ body: CREDENTIALS })
    await expect(auth.api.signUpEmail({ body: CREDENTIALS })).rejects.toMatchObject({
      status: 'UNPROCESSABLE_ENTITY',
    })
  })

  it('signs in with the right password and rejects the wrong one', async () => {
    const { auth } = await setup()
    await auth.api.signUpEmail({ body: CREDENTIALS })

    const ok = await auth.api.signInEmail({
      body: { email: CREDENTIALS.email, password: CREDENTIALS.password },
    })
    expect(ok.user.email).toBe(CREDENTIALS.email)

    await expect(
      auth.api.signInEmail({ body: { email: CREDENTIALS.email, password: 'nope' } }),
    ).rejects.toMatchObject({ status: 'UNAUTHORIZED' })
  })

  it('serves the HTTP API under /api/auth and issues a session cookie', async () => {
    const { auth } = await setup()

    const signUp = await auth.handler(post('/sign-up/email', CREDENTIALS))
    expect(signUp.status).toBe(200)
    const cookie = signUp.headers.get('set-cookie')
    expect(cookie).toContain('better-auth.session_token=')

    const session = await auth.handler(
      new Request(`${BASE_URL}/api/auth/get-session`, { headers: { cookie: cookie! } }),
    )
    expect(session.status).toBe(200)
    const body = (await session.json()) as { user: { email: string } }
    expect(body.user.email).toBe(CREDENTIALS.email)
  })

  it('returns no session without a cookie', async () => {
    const { auth } = await setup()
    const res = await auth.handler(new Request(`${BASE_URL}/api/auth/get-session`))
    expect(res.status).toBe(200)
    expect(await res.json()).toBeNull()
  })

  it('falls back to the local dev URL when BETTER_AUTH_URL is unset', async () => {
    vi.stubEnv('BETTER_AUTH_URL', '')
    const instance = createAuth(await createTestDb(), { secret: SECRET })
    expect(instance.options.baseURL).toBe(DEFAULT_AUTH_URL)
  })

  it('exposes a default instance configured from the environment', () => {
    expect(auth.options.baseURL).toBe(BASE_URL)
    expect(auth.options.emailAndPassword?.enabled).toBe(true)
  })
})
