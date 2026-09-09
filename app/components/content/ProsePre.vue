<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const props = defineProps({
  code: { type: String, default: '' },
  language: { type: String, default: null },
  filename: { type: String, default: null },
  highlights: { type: Array as () => number[], default: () => [] },
  meta: { type: String, default: null },
  class: { type: String, default: null },
});

const { copy, copied } = useClipboard({ source: props.code });
</script>

<template>
  <div
    class="group relative my-6 overflow-hidden rounded-xl border border-border bg-surface-raised shadow-sm"
  >
    <!-- Language / Filename Header -->
    <div
      v-if="language || filename"
      class="flex w-full items-center justify-between border-b border-border/50 bg-surface/50 px-4 py-2 font-mono text-xs text-text-muted"
    >
      <span>{{ filename || language }}</span>
    </div>

    <!-- Code Content -->
    <!-- We reset prose margins on pre so it fills the wrapper seamlessly -->
    <pre :class="[$props.class, '!my-0 !rounded-none !border-0 !shadow-none']"><slot /></pre>

    <!-- Copy Button -->
    <button
      @click="copy()"
      class="absolute right-2 z-20 rounded-md bg-surface p-1.5 text-text-muted opacity-0 shadow-sm ring-1 ring-border transition-all duration-200 group-hover:opacity-100 hover:bg-surface-raised hover:text-primary-500 focus:opacity-100"
      :class="{
        '!text-success !opacity-100 !ring-success/50': copied,
        'top-10': language || filename,
        'top-2': !language && !filename,
      }"
      aria-label="Copy code"
    >
      <Icon
        :name="copied ? 'ph:check-bold' : 'ph:copy-duotone'"
        size="16"
        aria-hidden="true"
      />
      <span class="sr-only" aria-live="polite">
        {{ copied ? 'Code copied to clipboard' : '' }}
      </span>
    </button>
  </div>
</template>
