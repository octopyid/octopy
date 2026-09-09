<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: '/' });

// Error pages must never be indexed.
useHead({
  meta: [{ name: 'robots', content: 'noindex' }],
});
</script>

<template>
  <div
    role="alert"
    class="relative isolate flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center"
  >
    <!-- Decorative background -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        class="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-primary-500/20 blur-[100px]"
      ></div>
    </div>

    <div class="relative z-10 max-w-lg">
      <h1
        class="mb-4 bg-linear-to-br from-primary-400 to-primary-600 bg-clip-text text-9xl font-extrabold tracking-tighter text-transparent"
      >
        {{ error?.status || '404' }}
      </h1>

      <h2 class="mb-6 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        {{ error?.status === 404 ? 'Lost in the void' : 'Something went wrong' }}
      </h2>

      <p class="mb-10 text-lg leading-relaxed text-text-secondary">
        {{
          error?.statusMessage ||
          "The page you're looking for doesn't exist or has been moved to another universe."
        }}
      </p>

      <UiButton @click="handleError">
        <Icon name="ph:house-line-bold" size="20" aria-hidden="true" />
        Return Home
      </UiButton>
    </div>
  </div>
</template>
