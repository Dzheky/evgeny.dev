import { afterEach, describe, expect, it, vi } from 'vitest'

import { DEFAULT_AUTH_URL, DEFAULT_DATABASE_URL, getEnv, requireEnv } from './env'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('getEnv', () => {
  it('returns the value when set', () => {
    vi.stubEnv('EVGENY_TEST_VAR', 'hello')
    expect(getEnv('EVGENY_TEST_VAR')).toBe('hello')
  })

  it('returns undefined when unset', () => {
    vi.stubEnv('EVGENY_TEST_VAR', undefined)
    expect(getEnv('EVGENY_TEST_VAR')).toBeUndefined()
  })

  it('treats an empty string as unset so `??` defaults apply', () => {
    vi.stubEnv('EVGENY_TEST_VAR', '')
    expect(getEnv('EVGENY_TEST_VAR')).toBeUndefined()
  })
})

describe('requireEnv', () => {
  it('returns the value when set', () => {
    vi.stubEnv('EVGENY_TEST_VAR', 'x')
    expect(requireEnv('EVGENY_TEST_VAR')).toBe('x')
  })

  it('throws a descriptive error when missing', () => {
    vi.stubEnv('EVGENY_TEST_VAR', undefined)
    expect(() => requireEnv('EVGENY_TEST_VAR')).toThrow(
      'Missing required environment variable: EVGENY_TEST_VAR',
    )
  })
})

describe('defaults', () => {
  it('match the values documented in .env.example', () => {
    expect(DEFAULT_DATABASE_URL).toBe('file:./data/local.db')
    expect(DEFAULT_AUTH_URL).toBe('http://localhost:4321')
  })
})
