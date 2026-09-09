<script setup lang="ts">
definePageMeta({
  layout: false,
});

const route = useRoute();

const { data: article } = await useAsyncData(`insights-${route.path}`, () => {
  return queryCollection('insights').path(route.path).first();
});

if (!article.value || article.value.draft) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true });
}

const { formatDate, toIsoDate } = useFormatDate();

useSeoMeta({
  title: () => `${article.value?.title || 'Article'} | Insights`,
  description: () => article.value?.description || 'Read more on Octopy ID',
  articlePublishedTime: () => toIsoDate(article.value?.date),
});

defineOgImageComponent('OctopySeo', {
  title: () => article.value?.title || 'Article',
  description: () => article.value?.description || 'Read more on Octopy ID',
});

useSchemaOrg([
  defineArticle({
    headline: article.value?.title,
    description: article.value?.description,
    datePublished: toIsoDate(article.value?.date),
    author: [{ name: 'Supian M', url: 'https://octopy.dev/about' }],
  }),
]);
</script>

<template>
  <NuxtLayout name="blog">
    <article v-if="article" class="mx-auto max-w-3xl py-12 md:py-20">
      <header class="mb-12">
        <div
          class="mb-6 flex items-center gap-4 text-sm font-medium tracking-wider text-text-muted uppercase"
        >
          <time :datetime="toIsoDate(article.date)">{{ formatDate(article.date) }}</time>
          <span
            v-if="article.readTime"
            class="flex items-center gap-1 before:mr-3 before:content-['•']"
          >
            <Icon name="ph:clock-duotone" size="16" /> {{ article.readTime }} min read
          </span>
        </div>

        <h1
          class="mb-6 text-3xl leading-tight font-extrabold tracking-tight text-text-primary md:text-5xl"
        >
          {{ article.title }}
        </h1>

        <div class="mb-8 flex flex-wrap gap-2">
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="rounded-full bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-500"
          >
            {{ tag }}
          </span>
        </div>
      </header>

      <ContentProse>
        <ContentRenderer :value="article" />
      </ContentProse>
    </article>

    <!-- Table of Contents for the Sidebar -->
    <template #sidebar>
      <div
        v-if="article?.body?.toc?.links?.length"
        class="rounded-xl border border-border bg-surface-raised p-6 shadow-sm"
      >
        <h3 class="mb-4 text-sm font-bold tracking-wider text-text-primary uppercase">
          On this page
        </h3>
        <ul class="space-y-3 text-sm text-text-secondary">
          <li v-for="link in article.body.toc.links" :key="link.id">
            <a :href="`#${link.id}`" class="block transition-colors hover:text-primary-500">
              {{ link.text }}
            </a>
            <ul
              v-if="link.children?.length"
              class="mt-3 ml-4 space-y-2 border-l border-border pl-4"
            >
              <li v-for="child in link.children" :key="child.id">
                <a :href="`#${child.id}`" class="block transition-colors hover:text-primary-500">
                  {{ child.text }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </template>
  </NuxtLayout>
</template>
