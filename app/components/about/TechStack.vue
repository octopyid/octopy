<script setup lang="ts">
const stackGroups = [
  {
    category: 'Frontend & UI',
    items: [
      { label: 'Vue.js', icon: 'simple-icons:vuedotjs', color: '#4FC08D' },
      { label: 'Nuxt', icon: 'simple-icons:nuxtdotjs', color: '#00DC82' },
      { label: 'TypeScript', icon: 'simple-icons:typescript', color: '#3178C6' },
      { label: 'Electron', icon: 'simple-icons:electron', color: '#47848F' },
      { label: 'Flutter', icon: 'simple-icons:flutter', color: '#02569B' },
    ],
  },
  {
    category: 'Backend & Data',
    items: [
      { label: 'Go', icon: 'simple-icons:go', color: '#00ADD8' },
      { label: 'PHP', icon: 'simple-icons:php', color: '#777BB4' },
      { label: 'Laravel', icon: 'simple-icons:laravel', color: '#FF2D20' },
      { label: 'Node.js', icon: 'simple-icons:nodedotjs', color: '#5FA04E' },
      { label: 'MySQL', icon: 'simple-icons:mysql', color: '#4479A1' },
    ],
  },
  {
    category: 'DevOps & Tools',
    items: [
      { label: 'Ubuntu', icon: 'simple-icons:ubuntu', color: '#E95420' },
      { label: 'Docker', icon: 'simple-icons:docker', color: '#2496ED' },
      { label: 'Nginx', icon: 'simple-icons:nginx', color: '#009639' },
      { label: 'Apache', icon: 'simple-icons:apache', color: '#D22128' },
      { label: 'Cloudflare', icon: 'simple-icons:cloudflare', color: '#F38020' },
      { label: 'Git', icon: 'simple-icons:git', color: '#F05032' },
      { label: 'Grafana', icon: 'simple-icons:grafana', color: '#F46800' },
      { label: 'GitHub Actions', icon: 'simple-icons:githubactions', color: '#2088FF' },
    ],
  },
];
</script>

<template>
  <section class="border-t border-border/50 bg-surface-raised py-16 md:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-12" v-motion-slide-visible-once-bottom>
        <div class="mb-4">
          <UiSectionEyebrow text="The Arsenal" />
        </div>
        <h3 class="mb-4 text-3xl font-extrabold text-text-primary md:text-4xl">Tech Stack</h3>
        <p class="max-w-2xl text-lg leading-relaxed text-text-secondary">
          A curated list of tools and technologies I use to build robust and scalable systems.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-3">
        <div
          v-for="group in stackGroups"
          :key="group.category"
          class="flex flex-col"
          v-motion-slide-visible-once-bottom
        >
          <h4
            class="mb-6 border-b border-border/50 pb-2 text-sm font-bold tracking-wider text-text-primary uppercase"
          >
            {{ group.category }}
          </h4>
          <div class="flex flex-wrap gap-2.5">
            <div
              v-for="item in group.items"
              :key="item.label"
              class="group flex cursor-default items-center gap-2 rounded-md px-3 py-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110"
              :style="{ backgroundColor: item.color }"
            >
              <Icon :name="item.icon" size="14" class="text-white" />
              <span class="text-[11px] font-bold tracking-widest text-white uppercase">
                {{ item.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
