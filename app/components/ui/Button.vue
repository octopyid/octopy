<script setup lang="ts">
export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'md' | 'lg' | 'xl';

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    to?: string;
    href?: string;
    target?: string;
    rel?: string;
  }>(),
  { variant: 'primary', size: 'lg', type: 'button' },
);

const tag = computed(() => (props.to ? 'NuxtLink' : props.href ? 'a' : 'button'));

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-white shadow-glow hover:-translate-y-1 hover:bg-primary-600',
  secondary:
    'border border-border bg-surface text-text-primary hover:-translate-y-1 hover:border-primary-500 hover:text-primary-500',
};

const sizeClasses: Record<ButtonSize, string> = {
  md: 'h-11 px-8',
  lg: 'h-12 px-8',
  xl: 'h-14 px-8',
};
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="target"
    :rel="rel"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled || loading : undefined"
    :aria-disabled="loading || undefined"
    :aria-busy="loading || undefined"
    class="inline-flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
    :class="[variantClasses[variant], sizeClasses[size]]"
  >
    <Icon
      v-if="loading"
      name="ph:spinner-gap-bold"
      size="20"
      class="animate-spin"
      aria-hidden="true"
    />
    <slot />
  </component>
</template>
