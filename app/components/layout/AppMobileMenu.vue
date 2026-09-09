<script setup lang="ts">
import { NAV_LINKS } from '~/constants/navigation';

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

// Lock background scroll while the menu is open.
watch(
  () => props.open,
  (isOpen) => {
    if (import.meta.server) return;
    document.body.style.overflow = isOpen ? 'hidden' : '';
  },
);

// Close on Escape for keyboard users.
onKeyStroke('Escape', () => {
  if (props.open) emit('close');
});

onUnmounted(() => {
  if (import.meta.server) return;
  document.body.style.overflow = '';
});
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-4"
  >
    <div
      v-if="open"
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      class="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-100%)] overflow-y-auto bg-bg/95 backdrop-blur-xl lg:hidden"
    >
      <nav class="flex flex-col gap-6 px-4 py-8 sm:px-6">
        <NuxtLink
          v-for="link in NAV_LINKS"
          :key="link.path"
          :to="link.path"
          class="text-2xl font-bold tracking-tight text-text-primary transition-colors hover:text-primary-500"
          active-class="text-primary-500"
          @click="emit('close')"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>
    </div>
  </transition>
</template>
