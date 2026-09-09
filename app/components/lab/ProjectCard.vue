<script setup lang="ts">
export interface LabProject {
  title: string;
  description: string;
  language?: string;
  link?: string;
  tags?: string[];
  isOpenSource?: boolean;
  stem: string;
  repo?: string;
  icon?: string;
}

const props = defineProps<{
  project: LabProject;
}>();

const isOpenSource = computed(() => props.project.isOpenSource !== false);
const isClickable = computed(() => isOpenSource.value || !!props.project.link);

// Open source -> internal detail page; closed with link -> external tab; otherwise static.
const wrapper = computed(() => {
  if (isOpenSource.value) return 'NuxtLink';
  if (props.project.link) return 'a';
  return 'div';
});

const stats = useGithubStats(props.project.repo, isOpenSource.value);
const projectIcon = computed(() => props.project.icon || 'ph:flask-duotone');
const trailingIcon = computed(() => {
  if (isOpenSource.value) return 'ph:arrow-up-right-bold';
  if (props.project.link) return 'ph:arrow-square-out-bold';
  return 'ph:lock-duotone';
});
</script>

<template>
  <component
    :is="wrapper"
    :to="isOpenSource ? `/${project.stem}` : undefined"
    :href="!isOpenSource ? project.link : undefined"
    :target="!isOpenSource && project.link ? '_blank' : undefined"
    :rel="!isOpenSource && project.link ? 'noopener noreferrer' : undefined"
    v-motion-slide-visible-once-bottom
    class="group flex h-full flex-col rounded-xl border border-border bg-surface-raised p-6 transition-all duration-300"
    :class="[
      isClickable
        ? 'hover:-translate-y-1 hover:border-primary-500 hover:shadow-glow'
        : 'opacity-90',
    ]"
  >
    <div class="flex-grow">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Icon :name="projectIcon" class="text-primary-500" size="24" aria-hidden="true" />
          <h3
            class="line-clamp-1 text-lg font-bold text-text-primary transition-colors group-hover:text-primary-500"
          >
            {{ project.title }}
          </h3>
        </div>
        <Icon
          :name="trailingIcon"
          size="18"
          class="text-text-muted transition-colors group-hover:text-primary-500"
          aria-hidden="true"
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
          <span v-if="project.language" class="flex items-center gap-1.5">
            <Icon name="ph:code-duotone" size="16" aria-hidden="true" />
            {{ project.language }}
          </span>
          <span v-if="stats.forks > 0" class="flex items-center gap-1.5">
            <Icon name="ph:git-fork-duotone" size="16" aria-hidden="true" />
            {{ stats.forks }}
          </span>
        </div>

        <div>
          <span
            v-if="isOpenSource && stats.stars > 0"
            class="flex items-center gap-1.5 font-bold text-primary-500"
          >
            <Icon name="ph:star-duotone" size="16" aria-hidden="true" />
            {{ stats.stars }}
          </span>
          <span v-else-if="!isOpenSource" class="flex items-center gap-1.5 font-bold text-danger">
            <Icon name="ph:lock-duotone" size="16" aria-hidden="true" />
            Closed Source
          </span>
        </div>
      </div>
    </div>
  </component>
</template>
