<script setup lang="ts">
export type ContainerSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl';

const props = withDefaults(
  defineProps<{
    as?: keyof HTMLElementTagNameMap;
    size?: ContainerSize;
  }>(),
  { as: 'div', size: '7xl' },
);

// NOTE: `max-w-screen-*` was removed in Tailwind v4; viewport widths
// now resolve through the breakpoint theme tokens.
const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-(--breakpoint-sm)',
  md: 'max-w-(--breakpoint-md)',
  lg: 'max-w-(--breakpoint-lg)',
  xl: 'max-w-(--breakpoint-xl)',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

const sizeClass = computed(() => sizeClasses[props.size]);
</script>

<template>
  <component :is="as" class="mx-auto px-4 sm:px-6 lg:px-8" :class="sizeClass">
    <slot />
  </component>
</template>
