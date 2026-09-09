<script setup lang="ts">
import { ref, computed, watch } from 'vue';

definePageMeta({
  layout: 'default',
});

useSeoMeta({
  title: 'Insights',
  description: 'Technical articles, architectural thoughts, and engineering reflections.',
});

const { data: articles } = await useAsyncData('insights-articles', () => {
  return queryCollection('insights')
    .select('title', 'description', 'date', 'tags', 'readTime', 'path')
    .order('date', 'DESC')
    .all();
});

const activeTag = ref<string>('All');
const currentPage = ref<number>(1);
const itemsPerPage = 6;

const tags = computed(() => {
  if (!articles.value) return ['All'];
  const tagSet = new Set<string>();
  articles.value.forEach((a) => {
    if (a.tags) {
      a.tags.forEach((t) => tagSet.add(t));
    }
  });
  return ['All', ...Array.from(tagSet).sort()];
});

const filteredArticles = computed(() => {
  if (!articles.value) return [];
  if (activeTag.value === 'All') return articles.value;
  return articles.value.filter((a) => a.tags && a.tags.includes(activeTag.value));
});

const totalPages = computed(() => Math.ceil(filteredArticles.value.length / itemsPerPage));

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredArticles.value.slice(start, end);
});

watch(activeTag, () => {
  currentPage.value = 1;
});
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
    <div class="mb-16">
      <div class="mb-4 flex items-center gap-3">
        <div class="h-px w-8 bg-primary-500"></div>
        <h2 class="text-xs font-bold tracking-widest text-primary-500 uppercase">The Blog</h2>
      </div>
      <h1 class="mb-6 text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
        Insights
      </h1>
      <p class="text-xl leading-relaxed text-text-secondary">
        Thoughts on software architecture, server infrastructure, and the daily grind of building
        reliable systems.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <!-- Main Content: Articles -->
      <div class="lg:col-span-2">
        <div
          v-if="paginatedArticles && paginatedArticles.length > 0"
          class="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <InsightsArticleCard
            v-for="article in paginatedArticles"
            :key="article.path"
            :article="article"
          />
        </div>

        <div v-else class="rounded-xl border border-dashed border-border py-20 text-center">
          <Icon name="ph:article-duotone" size="48" class="mx-auto mb-4 text-text-muted" />
          <p class="text-text-secondary">No insights found.</p>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors"
            :class="
              currentPage === page
                ? 'bg-primary-500 text-white shadow-glow'
                : 'border border-border bg-surface hover:bg-surface-raised'
            "
          >
            {{ page }}
          </button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Sidebar: Filters -->
      <div class="lg:col-span-1">
        <div class="sticky top-24 rounded-xl border border-border bg-surface-raised p-6">
          <div class="mb-6 flex items-center gap-2">
            <Icon name="ph:funnel-duotone" size="20" class="text-primary-500" />
            <h3 class="text-lg font-bold text-text-primary">Filter by Topic</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in tags"
              :key="tag"
              @click="activeTag = tag"
              class="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 focus:outline-none"
              :class="
                activeTag === tag
                  ? 'border border-primary-500 bg-primary-500 text-white shadow-glow'
                  : 'border border-transparent bg-surface text-text-secondary hover:bg-primary-500/10 hover:text-primary-500 dark:bg-zinc-800/50 dark:hover:bg-primary-500/10'
              "
            >
              {{ tag === 'All' ? 'All Topics' : tag }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
