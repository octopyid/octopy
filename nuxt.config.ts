import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  // Nuxt 4 app dir convention
  future: { compatibilityVersion: 4 },

  devtools: { enabled: true },

  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || '',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
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
      include: [
        '@shikijs/langs/ini',
        '@shikijs/langs/go',
        '@shikijs/langs/html',
        '@shikijs/langs/xml',
        '@shikijs/langs/php',
        '@shikijs/langs/json',
        '@shikijs/langs/jsonc',
        '@shikijs/langs/json5',
        '@shikijs/langs/yml',
        '@shikijs/langs/yaml',
        '@shikijs/langs/bash',
        '@shikijs/langs/shell',
        '@shikijs/langs/zsh',
        '@shikijs/langs/console',
        '@shikijs/langs/ts',
        '@shikijs/langs/typescript',
        '@shikijs/langs/tsx',
        '@shikijs/langs/js',
        '@shikijs/langs/javascript',
        '@shikijs/langs/jsx',
        '@shikijs/langs/vue',
        '@shikijs/langs/css',
        '@shikijs/langs/scss',
        '@shikijs/langs/md',
        '@shikijs/langs/markdown',
        '@shikijs/langs/sql',
        '@shikijs/langs/dockerfile',
        '@shikijs/langs/docker',
        '@shikijs/langs/toml',
        '@shikijs/langs/python',
        '@shikijs/langs/py',
        '@shikijs/langs/rust',
        '@shikijs/langs/diff',
        '@shikijs/langs/dart',
        '@shikijs/langs/nginx',
        '@shikijs/langs/makefile',
        '@shikijs/langs/c',
        '@shikijs/langs/cpp',
        '@unhead/schema-org/vue',
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },

  // Nuxt Fonts configuration
  fonts: {
    families: [{ name: 'Iosevka', provider: 'fontsource' }],
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
      crawlLinks: false,
      routes: [
        '/',
        '/insights',
        '/insights/why-i-built-rune',
        '/insights/hello-world',
        '/insights/laravel-scheduler-without-cron',
        '/lab',
        '/about',
        '/contact',
        '/services',
      ],
      failOnError: false,
    },
    unenv: {
      external: ['node:process'],
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
