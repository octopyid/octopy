import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';

// Single source of truth for Shiki grammars: shared by Vite optimizeDeps,
// MDC highlighting, and Content highlighting.
const shikiLangs = [
  'ini',
  'go',
  'html',
  'xml',
  'php',
  'json',
  'jsonc',
  'json5',
  'yml',
  'yaml',
  'bash',
  'shell',
  'zsh',
  'console',
  'ts',
  'typescript',
  'tsx',
  'js',
  'javascript',
  'jsx',
  'vue',
  'css',
  'scss',
  'md',
  'markdown',
  'sql',
  'dockerfile',
  'docker',
  'toml',
  'python',
  'py',
  'rust',
  'diff',
  'dart',
  'nginx',
  'makefile',
  'c',
  'cpp',
];

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  // Nuxt 4 app dir convention
  future: { compatibilityVersion: 4 },

  // Devtools only outside production builds
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || '',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    githubToken: process.env.GITHUB_TOKEN || '',
  },

  site: {
    url: 'https://octopy.dev',
    name: 'Octopy ID',
    description:
      'Portfolio and Lab of Supian M - Full-Stack Engineer and Infrastructure Consultant.',
    defaultLocale: 'en',
  },

  // Modules
  modules: [
    '@nuxtjs/mdc', // Markdown Components
    '@nuxt/content', // Blog & Lab data
    '@nuxt/image', // Optimised NuxtImg
    '@nuxt/icon', // Iconify icon system
    '@nuxt/fonts', // Auto-managed fonts
    '@vueuse/nuxt', // VueUse composables
    '@vueuse/motion/nuxt', // Micro-animations
    '@nuxtjs/seo', // Unified SEO (robots, sitemap, OG)
    '@nuxtjs/color-mode', // SSR-safe dark mode
  ],

  // Tailwind CSS v4 setup via Vite
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [...shikiLangs.map((lang) => `@shikijs/langs/${lang}`)],
    },
  },

  // Nuxt Fonts configuration (self-hosted via fontsource, no render-blocking Google requests)
  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'fontsource',
        weights: [400, 500, 600, 700, 800],
      },
      { name: 'Iosevka', provider: 'fontsource' },
    ],
  },

  // Color mode: class-based (body.dark) for Tailwind v4 compat
  colorMode: {
    classSuffix: '', // adds class "dark" not "dark-mode"
    preference: 'system',
    fallback: 'dark',
    storageKey: 'octopy-theme',
  },

  // CSS entry
  css: ['~/assets/css/main.css'],

  // App-level head defaults
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      titleTemplate: '%s | %siteName',
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  // Route rules & static pre-rendering for instant page loads
  routeRules: {
    '/': { prerender: true },
    '/insights': { prerender: true },
    '/insights/**': { prerender: true },
    '/lab': { prerender: true },
    '/lab/**': { swr: 3600 },
    '/about': { prerender: true },
    '/contact': { prerender: true },
    '/services': { prerender: true },
  },

  // Nitro settings
  nitro: {
    prerender: {
      // Discover internal routes (e.g. new insights/lab entries) automatically.
      crawlLinks: true,
      routes: [
        '/',
        '/insights',
        '/insights/introducing-rune',
        '/insights/hello-world',
        '/insights/laravel-scheduler-without-cron',
        '/lab',
        '/about',
        '/contact',
        '/services',
      ],
      failOnError: false,
    },
  },

  // Nuxt Icon configuration (scan only used icons)
  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
    serverBundle: false,
  },

  // Performance optimizations
  linkChecker: {
    enabled: false,
  },
  ogImage: {
    enabled: process.env.NODE_ENV === 'production',
  },

  // MDC settings (for dynamic markdown via <MDC>)
  mdc: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      langs: shikiLangs,
    },
  },

  // Content v3 collections
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
          langs: [
            'ini',
            'go',
            'html',
            'xml',
            'php',
            'json',
            'jsonc',
            'json5',
            'yml',
            'yaml',
            'bash',
            'shell',
            'zsh',
            'console',
            'ts',
            'typescript',
            'tsx',
            'js',
            'javascript',
            'jsx',
            'vue',
            'css',
            'scss',
            'md',
            'markdown',
            'sql',
            'dockerfile',
            'docker',
            'toml',
            'python',
            'py',
            'rust',
            'diff',
            'dart',
            'nginx',
            'makefile',
            'c',
            'cpp',
          ],
        },
      },
    },
  },
});
