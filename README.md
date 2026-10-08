# Octopy — octopy.dev

Company profile for **Octopy**, an independent software studio. Concept: *terminal* —
the studio as an interactive shell. Boot sequence, working prompt (`help`, `whoami`,
`products`, `stack`, `contact`), tmux-style status bar.

Built with [Astro](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com),
and [Phosphor Icons](https://phosphoricons.com).

Previous concepts are archived: `archive/deep-sea`, `archive/workbench`,
`archive/annual-report`.

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build   # outputs to dist/
```

The site is fully static — deploy `dist/` anywhere (Cloudflare Pages, Dokploy, plain nginx).
