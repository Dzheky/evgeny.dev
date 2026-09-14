// Foreground dev server for Playwright.
//
// The `astro dev` CLI writes a lock file and, in agent/CI-like terminals, forks
// itself into the background, which makes Playwright think it exited early.
// Astro's programmatic API does neither, and it runs entirely offline.
import { dev } from 'astro'

const host = '127.0.0.1'
const port = Number(process.env.E2E_PORT ?? 4399)

const server = await dev({
  root: new URL('..', import.meta.url).pathname,
  logLevel: 'warn',
  server: { host, port },
  vite: { server: { strictPort: true } },
})

const stop = () => server.stop().then(() => process.exit(0))
process.on('SIGTERM', stop)
process.on('SIGINT', stop)
