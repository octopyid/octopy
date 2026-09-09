<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}>();
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto max-w-4xl text-center' : 'mb-16 max-w-3xl'">
    <UiSectionEyebrow :text="eyebrow" :center="align === 'center'" />
    <h1 class="mb-6 text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
      {{ title }}
    </h1>
    <p v-if="description" class="text-xl leading-relaxed text-text-secondary">
      {{ description }}
    </p>
    <slot />
  </div>
</template>
