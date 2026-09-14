import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

import { eq, getTableName, sql } from 'drizzle-orm'
import { getTableConfig } from 'drizzle-orm/sqlite-core'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { createTestDb } from '../test/db'
import { DEFAULT_DATABASE_URL } from '../lib/env'
import { createDb, db, resolveDatabaseUrl } from './index'
import { MIGRATIONS_FOLDER } from './migrate'
import * as schema from './schema'

const AUTH_TABLES = ['user', 'session', 'account', 'verification'] as const

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('resolveDatabaseUrl', () => {
  it('prefers DATABASE_URL', () => {
    vi.stubEnv('DATABASE_URL', 'libsql://example.turso.io')
    expect(resolveDatabaseUrl()).toBe('libsql://example.turso.io')
  })

  it('falls back to the local SQLite file', () => {
    vi.stubEnv('DATABASE_URL', undefined)
    expect(resolveDatabaseUrl()).toBe(DEFAULT_DATABASE_URL)
  })
})

describe('createDb', () => {
  it('creates a working in-memory database', async () => {
    const database = createDb(':memory:')
    const rows = await database.all<{ answer: number }>(sql`select 42 as answer`)
    expect(rows).toEqual([{ answer: 42 }])
  })

  it('passes an auth token through for remote (Turso) databases', async () => {
    const database = createDb(':memory:', 'not-a-real-token')
    const rows = await database.all<{ ok: number }>(sql`select 1 as ok`)
    expect(rows).toEqual([{ ok: 1 }])
  })

  it('exposes a default instance built from the environment', async () => {
    const rows = await db.all<{ ok: number }>(sql`select 1 as ok`)
    expect(rows).toEqual([{ ok: 1 }])
  })
})

describe('schema', () => {
  it('exports the four better-auth tables', () => {
    for (const name of AUTH_TABLES) {
      expect(schema).toHaveProperty(name)
      expect(getTableName(schema[name])).toBe(name)
    }
  })

  it('links sessions and accounts to users with cascading deletes', () => {
    for (const table of [schema.session, schema.account]) {
      const { foreignKeys } = getTableConfig(table)
      expect(foreignKeys).toHaveLength(1)
      const fk = foreignKeys[0]!.reference()
      expect(getTableName(fk.foreignTable)).toBe('user')
      expect(fk.columns.map((c) => c.name)).toEqual(['user_id'])
      expect(foreignKeys[0]!.onDelete).toBe('cascade')
    }
  })

  it('enforces unique user emails', () => {
    const email = getTableConfig(schema.user).columns.find((c) => c.name === 'email')
    expect(email?.isUnique).toBe(true)
    expect(email?.notNull).toBe(true)
  })
})

describe('migrations', () => {
  it('has a journal entry for every SQL file', () => {
    const journal = JSON.parse(
      readFileSync(join(MIGRATIONS_FOLDER, 'meta', '_journal.json'), 'utf8'),
    ) as { entries: { tag: string }[] }
    const sqlFiles = readdirSync(MIGRATIONS_FOLDER)
      .filter((f) => f.endsWith('.sql'))
      .map((f) => f.replace(/\.sql$/, ''))
      .sort()
    expect(journal.entries.map((e) => e.tag).sort()).toEqual(sqlFiles)
    expect(sqlFiles.length).toBeGreaterThan(0)
  })

  it('create every schema table in a fresh database', async () => {
    const database = await createTestDb()
    const rows = await database.all<{ name: string }>(
      sql`select name from sqlite_master where type = 'table' order by name`,
    )
    const names = rows.map((r) => r.name)
    for (const name of AUTH_TABLES) expect(names).toContain(name)
  })

  it('produce a schema drizzle can read and write through', async () => {
    const database = await createTestDb()
    await database.insert(schema.user).values({
      id: 'u1',
      name: 'Evgeny',
      email: 'e@example.com',
    })
    await database.insert(schema.session).values({
      id: 's1',
      token: 'tok',
      userId: 'u1',
      expiresAt: new Date(Date.now() + 60_000),
      updatedAt: new Date(),
    })

    const [user] = await database.select().from(schema.user)
    expect(user).toMatchObject({ id: 'u1', email: 'e@example.com', emailVerified: false })
    expect(user?.createdAt).toBeInstanceOf(Date)

    // updatedAt is maintained by drizzle's $onUpdate hook, not the database.
    const before = user!.updatedAt.getTime()
    await new Promise((r) => setTimeout(r, 5))
    await database.update(schema.user).set({ name: 'E' }).where(eq(schema.user.id, 'u1'))
    const [updated] = await database.select().from(schema.user)
    expect(updated?.name).toBe('E')
    expect(updated!.updatedAt.getTime()).toBeGreaterThan(before)

    // Foreign keys must be enforced for the cascade to mean anything.
    await database.run(sql`pragma foreign_keys = on`)
    await database.delete(schema.user).where(eq(schema.user.id, 'u1'))
    expect(await database.select().from(schema.session)).toEqual([])
  })

  it('bump updatedAt on every table that has one', async () => {
    const database = await createTestDb()
    const past = new Date(Date.now() - 60_000)
    const future = new Date(Date.now() + 60_000)
    await database.insert(schema.user).values({ id: 'u1', name: 'A', email: 'a@x.io' })
    await database
      .insert(schema.session)
      .values({ id: 's1', token: 't', userId: 'u1', expiresAt: future, updatedAt: past })
    await database.insert(schema.account).values({
      id: 'a1',
      accountId: 'acc',
      providerId: 'credential',
      userId: 'u1',
      updatedAt: past,
    })
    await database.insert(schema.verification).values({
      id: 'v1',
      identifier: 'a@x.io',
      value: 'code',
      expiresAt: future,
      updatedAt: past,
    })

    await database
      .update(schema.session)
      .set({ userAgent: 'ua' })
      .where(eq(schema.session.id, 's1'))
    await database
      .update(schema.account)
      .set({ scope: 's' })
      .where(eq(schema.account.id, 'a1'))
    await database
      .update(schema.verification)
      .set({ value: 'code2' })
      .where(eq(schema.verification.id, 'v1'))

    for (const table of [schema.session, schema.account, schema.verification]) {
      const [row] = await database.select({ updatedAt: table.updatedAt }).from(table)
      expect(row!.updatedAt.getTime()).toBeGreaterThan(past.getTime())
    }
  })
})
