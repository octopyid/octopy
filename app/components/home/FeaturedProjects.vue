<script setup lang="ts">
const { data: allProjects, pending } = await useAsyncData('featured-projects', () => {
  return queryCollection('lab').order('date', 'DESC').limit(3).all();
});
const projects = computed(() => allProjects.value || []);
</script>

<template>
  <section class="bg-bg py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-12 flex items-end justify-between">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-text-primary">From The Lab</h2>
          <p class="mt-2 text-text-muted">Open source contributions and engineering experiments.</p>
        </div>
        <NuxtLink
          to="/lab"
          class="hidden items-center gap-2 text-sm font-medium text-primary-500 transition-colors hover:text-primary-400 sm:inline-flex"
        >
          View all projects <Icon name="ph:arrow-right-bold" />
        </NuxtLink>
      </div>

      <div v-if="pending" class="flex justify-center py-20">
        <Icon name="ph:spinner-gap-bold" size="32" class="animate-spin text-primary-500" />
      </div>
      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <LabProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </div>

      <div class="mt-8 text-center sm:hidden">
        <NuxtLink
          to="/lab"
          class="inline-flex items-center gap-2 text-sm font-medium text-primary-500 transition-colors hover:text-primary-400"
        >
          View all projects <Icon name="ph:arrow-right-bold" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
