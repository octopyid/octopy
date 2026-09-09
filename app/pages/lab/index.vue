<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

useSeoMeta({
  title: 'The Lab',
  description: 'Open source experiments and libraries by Supian M.',
});

defineOgImageComponent('OctopySeo', {
  title: 'The Lab',
  description: 'Open source experiments and libraries.',
});

useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage' }),
]);

const { data: projects, pending } = await useAsyncData('lab-projects', () => {
  return queryCollection('lab').order('date', 'DESC').all();
});

const activeTab = ref('All');

const languages = computed(() => {
  if (!projects.value) return ['All'];
  const langs = new Set<string>();
  projects.value.forEach((p) => {
    if (p.language && p.language !== 'Unknown') {
      langs.add(p.language);
    }
  });
  return ['All', ...Array.from(langs).sort()];
});

const filteredProjects = computed(() => {
  if (!projects.value) return [];
  if (activeTab.value === 'All') return projects.value;
  return projects.value.filter((p) => p.language === activeTab.value);
});
</script>

<template>
  <UiContainer size="7xl" class="pt-24 pb-20">
    <UiPageHeader
      v-motion-slide-visible-once-bottom
      eyebrow="Open Source & Libraries"
      title="The Lab"
      description="A collection of open-source libraries and tools I've built to solve real-world engineering problems."
    />

    <!-- Language Tabs -->
    <div
      v-if="!pending && projects && projects.length > 0"
      role="group"
      aria-label="Filter projects by language"
      class="mb-10 inline-flex flex-wrap gap-1.5 rounded-full border border-border/40 bg-tab-bg p-1.5"
      v-motion-slide-visible-once-bottom
    >
      <button
        v-for="lang in languages"
        :key="lang"
        @click="activeTab = lang"
        :aria-pressed="activeTab === lang"
        class="rounded-full px-5 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        :class="
          activeTab === lang
            ? 'bg-tab-active text-text-primary shadow-sm ring-1 ring-border/50'
            : 'text-text-secondary hover:text-text-primary'
        "
      >
        {{ lang }}
      </button>
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <Icon name="ph:spinner-gap-bold" size="32" class="animate-spin text-primary-500" />
    </div>

    <div
      v-else-if="filteredProjects && filteredProjects.length > 0"
      class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <LabProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
    </div>

    <div v-else class="rounded-xl border border-dashed border-border py-20 text-center">
      <Icon name="ph:flask-duotone" size="48" class="mx-auto mb-4 text-text-muted" />
      <p class="text-text-secondary">No projects found.</p>
    </div>
  </UiContainer>
</template>
