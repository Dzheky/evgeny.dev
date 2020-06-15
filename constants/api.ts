export const API = {
  MAIN: '/',
  DASHBOARD: '/dashboard',
  BLOG: '/blog',
  PROJECTS: '/projects',
}

export const API_POINT =
  process.env.NODE_ENV === 'production' ? 'https://evgeny.dev' : 'http://localhost:3000'
