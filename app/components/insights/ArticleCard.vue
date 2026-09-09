<script setup lang="ts">
export interface InsightArticle {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  readTime?: number;
  path: string;
}

defineProps<{
  article: InsightArticle;
}>();

const { formatDate, toIsoDate } = useFormatDate();
</script>

<template>
  <NuxtLink :to="article.path" class="group block h-full" v-motion-slide-visible-once-bottom>
    <article
      class="flex h-full flex-col rounded-xl border border-border bg-surface-raised p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:shadow-glow"
    >
      <div class="flex-grow">
        <div
          class="mb-4 flex items-center gap-4 text-xs font-medium tracking-wider text-text-muted uppercase"
        >
          <time :datetime="toIsoDate(article.date)">{{ formatDate(article.date, 'short') }}</time>
          <span
            v-if="article.readTime"
            class="flex items-center gap-1 before:mr-3 before:content-['•']"
          >
            <Icon name="ph:clock-duotone" size="14" aria-hidden="true" />
            {{ article.readTime }} min read
          </span>
        </div>

        <h3
          class="mb-3 line-clamp-2 text-xl font-bold text-text-primary transition-colors group-hover:text-primary-500"
        >
          {{ article.title }}
        </h3>

        <p v-if="article.description" class="mb-6 line-clamp-3 leading-relaxed text-text-secondary">
          {{ article.description }}
        </p>
      </div>

      <div class="mt-auto flex items-center justify-between border-t border-border/50 pt-5">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="rounded-full bg-primary-500/10 px-2.5 py-1 text-xs font-medium text-primary-500 transition-colors group-hover:bg-primary-500/20"
          >
            {{ tag }}
          </span>
        </div>
        <Icon
          name="ph:arrow-right-bold"
          class="text-text-muted transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-primary-500"
          aria-hidden="true"
        />
      </div>
    </article>
  </NuxtLink>
</template>
