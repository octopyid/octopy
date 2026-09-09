<script setup lang="ts">
const { data: articles } = await useAsyncData('home-latest-insights', () => {
  return queryCollection('insights')
    .where('draft', '=', false)
    .select('title', 'description', 'date', 'tags', 'readTime', 'path')
    .order('date', 'DESC')
    .limit(3)
    .all();
});
</script>

<template>
  <section v-if="articles && articles.length > 0" class="border-t border-border/50 py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-12 flex items-end justify-between" v-motion-slide-visible-once-bottom>
        <div>
          <div class="mb-4 flex items-center gap-3">
            <div class="h-px w-8 bg-primary-500"></div>
            <h2 class="text-xs font-bold tracking-widest text-primary-500 uppercase">
              Latest from the Blog
            </h2>
          </div>
          <h3 class="text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
            Insights & Engineering
          </h3>
        </div>
        <NuxtLink
          to="/insights"
          class="hidden items-center gap-2 font-semibold text-primary-500 transition-colors hover:text-primary-600 sm:flex"
        >
          Read all articles
          <Icon name="ph:arrow-right-bold" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <InsightsArticleCard v-for="article in articles" :key="article.path" :article="article" />
      </div>

      <div class="mt-8 text-center sm:hidden" v-motion-slide-visible-once-bottom>
        <NuxtLink
          to="/insights"
          class="inline-flex items-center gap-2 font-semibold text-primary-500 transition-colors hover:text-primary-600"
        >
          Read all articles
          <Icon name="ph:arrow-right-bold" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
