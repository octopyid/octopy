<script setup lang="ts">
function resolveMarkdownAssets(content: string, docsUrl: string, repo?: string): string {
  if (!content) return '';
  const rawBase = docsUrl.substring(0, docsUrl.lastIndexOf('/') + 1);
  const repoBase = repo ? `https://github.com/${repo}/blob/main/` : rawBase;

  const toAbsoluteRaw = (url: string) => {
    if (!url) return url;
    const trimmed = url.trim();
    if (/^(https?:|\/\/|data:|#|mailto:)/i.test(trimmed)) {
      return trimmed;
    }
    const cleanUrl = trimmed.startsWith('./')
      ? trimmed.slice(2)
      : trimmed.startsWith('/')
        ? trimmed.slice(1)
        : trimmed;
    return `${rawBase}${cleanUrl}`;
  };

  const toAbsoluteLink = (url: string) => {
    if (!url) return url;
    const trimmed = url.trim();
    if (/^(https?:|\/\/|#|mailto:)/i.test(trimmed)) {
      return trimmed;
    }
    const cleanUrl = trimmed.startsWith('./')
      ? trimmed.slice(2)
      : trimmed.startsWith('/')
        ? trimmed.slice(1)
        : trimmed;
    return `${repoBase}${cleanUrl}`;
  };

  let resolved = content;

  // 1. HTML <img> tags: src="..." or src='...'
  resolved = resolved.replace(
    /<img\b([^>]*?)(\bsrc=["'])([^"']+)(["'])([^>]*?)>/gi,
    (_match, before, srcOpen, srcVal, srcClose, after) => {
      return `<img${before}${srcOpen}${toAbsoluteRaw(srcVal)}${srcClose}${after}>`;
    },
  );

  // 2. Markdown images: ![alt](url "title") or ![alt](url)
  resolved = resolved.replace(
    /!\[(.*?)\]\((\S+?)(?:\s+["'](.*?)["'])?\)/g,
    (_match, alt, url, title) => {
      const absUrl = toAbsoluteRaw(url);
      return title ? `![${alt}](${absUrl} "${title}")` : `![${alt}](${absUrl})`;
    },
  );

  // 3. Markdown relative links: [text](url) where url is relative and not an anchor
  resolved = resolved.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const trimmedUrl = url.trim();
    if (/^(https?:|\/\/|#|mailto:)/i.test(trimmedUrl)) {
      return match;
    }
    return `[${text}](${toAbsoluteLink(trimmedUrl)})`;
  });

  return resolved;
}

const route = useRoute();

const { data, error, pending } = await useAsyncData(`lab-detail-${route.params.slug}`, async () => {
  const project = await queryCollection('lab')
    .where('stem', '=', `lab/${route.params.slug}`)
    .first();

  if (!project || project.isOpenSource === false) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true });
  }

  let markdown = '';
  if (project.docs) {
    try {
      const raw = await $fetch<string>(project.docs);
      markdown = resolveMarkdownAssets(raw, project.docs, project.repo);
    } catch (e) {
      markdown = '> Failed to load documentation from repository.';
    }
  } else {
    markdown = '> No documentation provided.';
  }

  return {
    project,
    markdown,
  };
});

if (error.value) {
  throw createError(error.value);
}

useSeoMeta({
  title: () => `${data.value?.project?.title || 'Project'} | Lab`,
  description: () => data.value?.project?.description || 'Open source project by Supian M.',
});

const stats = ref({ stars: 0, forks: 0 });

onMounted(async () => {
  if (data.value?.project?.isOpenSource !== false && data.value?.project?.repo) {
    try {
      const res = await $fetch<{ stars: number; forks: number }>('/api/github-stats', {
        params: { repo: data.value.project.repo },
      });
      stats.value = res;
    } catch (e) {
      // Handle silently
    }
  }
});
</script>

<template>
  <UiContainer size="7xl" class="pt-24 pb-20">
    <div v-if="pending" class="flex justify-center py-20">
      <Icon name="ph:spinner-gap-bold" size="32" class="animate-spin text-primary-500" />
    </div>

    <article v-else-if="data" class="w-full">
      <header class="mb-12" v-if="data.project">
        <NuxtLink
          to="/lab"
          class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
        >
          <Icon name="ph:arrow-left-bold" /> Back to Lab
        </NuxtLink>

        <div
          class="mb-6 flex items-center gap-4 text-sm font-medium tracking-wider text-text-muted uppercase"
        >
          <span v-if="data.project.language" class="flex items-center gap-1">
            <Icon name="ph:code-duotone" size="16" /> {{ data.project.language }}
          </span>
          <span
            v-if="data.project.isOpenSource === false"
            class="flex items-center gap-1 text-red-500"
          >
            <Icon name="ph:lock-duotone" size="16" /> Closed Source
          </span>
          <span v-else-if="stats.stars > 0" class="flex items-center gap-1 text-primary-500">
            <Icon name="ph:star-duotone" size="16" /> {{ stats.stars }}
          </span>
          <span v-if="stats.forks > 0" class="flex items-center gap-1">
            <Icon name="ph:git-fork-duotone" size="16" /> {{ stats.forks }}
          </span>
        </div>

        <h1
          class="mb-6 text-3xl leading-tight font-extrabold tracking-tight text-text-primary md:text-5xl"
        >
          {{ data.project.title }}
        </h1>

        <p class="mb-8 text-xl leading-relaxed text-text-secondary">
          {{ data.project.description }}
        </p>

        <div class="flex gap-4">
          <a
            v-if="data.project.link"
            :href="data.project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg bg-text-primary px-6 py-3 font-semibold text-bg shadow-sm transition-colors hover:bg-primary-500"
          >
            <Icon name="mdi:github" size="20" /> View Repository
          </a>
        </div>
      </header>

      <div class="border-t border-border pt-12">
        <div
          class="prose max-w-none dark:prose-invert prose-p:leading-relaxed prose-a:text-primary-500 hover:prose-a:text-primary-600 dark:hover:prose-a:text-primary-400 prose-pre:border prose-pre:border-border prose-pre:!bg-surface-raised prose-pre:!text-text-primary prose-pre:shadow-sm prose-img:rounded-xl"
        >
          <MDC :value="data.markdown" />
        </div>
      </div>
    </article>
  </UiContainer>
</template>
