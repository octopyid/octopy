<script setup lang="ts">
import { useWindowScroll, useDebounceFn } from '@vueuse/core';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const { y } = useWindowScroll();
const docHeight = ref(0);
const winHeight = ref(0);
let observer: MutationObserver | null = null;

const updateMetrics = () => {
  if (import.meta.server) return;
  docHeight.value = document.documentElement.scrollHeight;
  winHeight.value = window.innerHeight;
};

const debouncedUpdateMetrics = useDebounceFn(updateMetrics, 150);

onMounted(() => {
  updateMetrics();
  window.addEventListener('resize', debouncedUpdateMetrics);

  // Debounced observer to prevent layout thrashing on markdown / Shiki render
  observer = new MutationObserver(debouncedUpdateMetrics);
  observer.observe(document.body, { childList: true, subtree: true });
});

onUnmounted(() => {
  window.removeEventListener('resize', debouncedUpdateMetrics);
  if (observer) {
    observer.disconnect();
  }
});

const progress = computed(() => {
  if (import.meta.server || docHeight.value === 0) return 0;
  const scrollable = docHeight.value - winHeight.value;
  if (scrollable <= 0) return 0;
  return Math.min(100, Math.max(0, (y.value / scrollable) * 100));
});
</script>

<template>
  <div
    class="fixed top-0 left-0 z-[100] h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 shadow-[0_0_10px_rgba(179,71,30,0.7)] transition-all duration-150 ease-out"
    :style="{ width: `${progress}%` }"
  ></div>
</template>
