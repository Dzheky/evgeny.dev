import js from '@eslint/js'
import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '.vercel/**',
      'node_modules/**',
      'drizzle/**',
      'coverage/**',
      'test-results/**',
      'playwright-report/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    // Plain Node scripts (e.g. the Playwright dev-server launcher).
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: { process: 'readonly', URL: 'readonly' } },
  },
]
