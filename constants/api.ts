export const API = {
  MAIN: '/',
  DASHBOARD: '/dashboard',
  GREETINGS: '/greetings',
  BLOG: '/blog',
  PROJECTS: '/projects',
}

export const API_POINT = process.browser
  ? `${window.location.origin}/`
  : 'https://evgeny.dev/'
