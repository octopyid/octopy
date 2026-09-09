<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  project: {
    title: string;
    description: string;
    language?: string;
    link?: string;
    tags?: string[];
    isOpenSource?: boolean;
    stem: string;
    repo?: string;
  };
}>();

const stars = ref(0);
const forks = ref(0);

onMounted(async () => {
  if (props.project.isOpenSource !== false && props.project.repo) {
    try {
      const stats = await $fetch<{ stars: number; forks: number }>('/api/github-stats', {
        params: { repo: props.project.repo },
      });
      stars.value = stats.stars;
      forks.value = stats.forks;
    } catch (e) {
      // Handle silently
    }
  }
});
</script>

<template>
  <!-- Open source: links to internal detail page -->
  <NuxtLink
    v-if="project.isOpenSource !== false"
    :to="`/${project.stem}`"
    class="group flex h-full flex-col rounded-xl border border-border bg-surface-raised p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:shadow-glow"
    v-motion-slide-visible-once-bottom
  >
    <div class="flex-grow">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Icon name="ph:flask-duotone" class="text-primary-500" size="24" />
          <h3
            class="line-clamp-1 text-lg font-bold text-text-primary transition-colors group-hover:text-primary-500"
          >
            {{ project.title }}
          </h3>
        </div>
        <Icon
          name="ph:arrow-up-right-bold"
          size="18"
          class="text-text-muted transition-colors group-hover:text-primary-500"
        />
      </div>

      <p class="mb-6 line-clamp-3 text-sm leading-relaxed text-text-secondary">
        {{ project.description }}
      </p>
    </div>

    <div class="mt-auto">
      <div v-if="project.tags && project.tags.length > 0" class="mb-4 flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="rounded-full bg-primary-500/10 px-2.5 py-1 text-xs font-medium text-primary-500"
        >
          {{ tag }}
        </span>
      </div>

      <div
        class="flex items-center justify-between border-t border-border/50 pt-4 font-mono text-xs text-text-muted"
      >
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1.5" v-if="project.language">
            <Icon name="ph:code-duotone" size="16" />
            {{ project.language }}
          </span>
          <span class="flex items-center gap-1.5" v-if="forks > 0">
            <Icon name="ph:git-fork-duotone" size="16" />
            {{ forks }}
          </span>
        </div>

        <div>
          <span v-if="stars > 0" class="flex items-center gap-1.5 font-bold text-primary-500">
            <Icon name="ph:star-duotone" size="16" />
            {{ stars }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>

  <!-- Closed source with link: external link in new tab -->
  <a
    v-else-if="project.link"
    :href="project.link"
    target="_blank"
    rel="noopener noreferrer"
    class="group flex h-full flex-col rounded-xl border border-border bg-surface-raised p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:shadow-glow"
    v-motion-slide-visible-once-bottom
  >
    <div class="flex-grow">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Icon name="ph:flask-duotone" class="text-primary-500" size="24" />
          <h3
            class="line-clamp-1 text-lg font-bold text-text-primary transition-colors group-hover:text-primary-500"
          >
            {{ project.title }}
          </h3>
        </div>
        <Icon
          name="ph:arrow-square-out-bold"
          size="18"
          class="text-text-muted transition-colors group-hover:text-primary-500"
        />
      </div>

      <p class="mb-6 line-clamp-3 text-sm leading-relaxed text-text-secondary">
        {{ project.description }}
      </p>
    </div>

    <div class="mt-auto">
      <div v-if="project.tags && project.tags.length > 0" class="mb-4 flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="rounded-full bg-primary-500/10 px-2.5 py-1 text-xs font-medium text-primary-500"
        >
          {{ tag }}
        </span>
      </div>

      <div
        class="flex items-center justify-between border-t border-border/50 pt-4 font-mono text-xs text-text-muted"
      >
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1.5" v-if="project.language">
            <Icon name="ph:code-duotone" size="16" />
            {{ project.language }}
          </span>
        </div>

        <div>
          <span class="flex items-center gap-1.5 font-bold text-red-500">
            <Icon name="ph:lock-duotone" size="16" />
            Closed Source
          </span>
        </div>
      </div>
    </div>
  </a>

  <!-- Closed source without link: unclickable card -->
  <div
    v-else
    class="flex h-full flex-col rounded-xl border border-border bg-surface-raised p-6 opacity-90"
    v-motion-slide-visible-once-bottom
  >
    <div class="flex-grow">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Icon name="ph:flask-duotone" class="text-primary-500" size="24" />
          <h3 class="line-clamp-1 text-lg font-bold text-text-primary">
            {{ project.title }}
          </h3>
        </div>
        <Icon name="ph:lock-duotone" size="18" class="text-text-muted" />
      </div>

      <p class="mb-6 line-clamp-3 text-sm leading-relaxed text-text-secondary">
        {{ project.description }}
      </p>
    </div>

    <div class="mt-auto">
      <div v-if="project.tags && project.tags.length > 0" class="mb-4 flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="rounded-full bg-primary-500/10 px-2.5 py-1 text-xs font-medium text-primary-500"
        >
          {{ tag }}
        </span>
      </div>

      <div
        class="flex items-center justify-between border-t border-border/50 pt-4 font-mono text-xs text-text-muted"
      >
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1.5" v-if="project.language">
            <Icon name="ph:code-duotone" size="16" />
            {{ project.language }}
          </span>
        </div>

        <div>
          <span class="flex items-center gap-1.5 font-bold text-red-500">
            <Icon name="ph:lock-duotone" size="16" />
            Closed Source
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
