<script setup lang="ts">
defineProps<{
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
}>();
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="alt || ''"
    :width="width"
    :height="height"
    loading="lazy"
    decoding="async"
    class="inline-block h-auto max-w-full rounded-xl"
  />
</template>
