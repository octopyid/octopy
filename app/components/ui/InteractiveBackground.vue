<script setup lang="ts">
import { useMouse } from '@vueuse/core';

const { x, y } = useMouse();
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none fixed inset-0 z-[-1] hidden overflow-hidden md:block"
  >
    <div
      class="absolute h-[600px] w-[600px] rounded-full bg-primary-500/10 blur-[100px] transition-transform duration-700 ease-out will-change-transform dark:bg-primary-500/5"
      :style="{
        transform: `translate(${x - 300}px, ${y - 300}px)`,
      }"
    ></div>
  </div>
</template>
