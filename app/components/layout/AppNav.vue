<script setup lang="ts">
import { NAV_LINKS } from '~/constants/navigation';

const route = useRoute();

const isActive = (path: string): boolean =>
  path === '/' ? route.path === '/' : route.path.startsWith(path);
</script>

<template>
  <nav aria-label="Primary" class="text-sm leading-6 font-semibold text-text-secondary">
    <ul class="flex space-x-8">
      <li v-for="link in NAV_LINKS" :key="link.path">
        <NuxtLink
          :to="link.path"
          class="transition-colors hover:text-primary-500"
          :class="isActive(link.path) && 'text-text-primary'"
          :aria-current="isActive(link.path) ? 'page' : undefined"
        >
          {{ link.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
