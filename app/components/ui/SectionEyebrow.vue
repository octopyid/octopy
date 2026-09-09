<script setup lang="ts">
defineProps<{
  text: string;
  center?: boolean;
}>();
</script>

<template>
  <p class="flex items-center gap-3" :class="center && 'justify-center'">
    <span aria-hidden="true" class="h-px w-8 bg-primary-500" />
    <span class="text-xs font-bold tracking-widest text-primary-500 uppercase">{{ text }}</span>
  </p>
</template>
