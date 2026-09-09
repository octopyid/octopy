<script setup lang="ts">
defineProps<{
  id?: string;
  name?: string;
  rows?: number;
  placeholder?: string;
  autocomplete?: string;
  required?: boolean;
  error?: string;
}>();

const model = defineModel<string>();
</script>

<template>
  <div>
    <textarea
      v-model="model"
      :id="id"
      :name="name"
      :rows="rows || 3"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      :aria-invalid="!!error"
      :aria-describedby="error && id ? `${id}-error` : undefined"
      class="w-full resize-none rounded-lg border bg-bg px-4 py-3 text-text-primary transition-colors placeholder:text-text-muted focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
      :class="error ? 'border-danger' : 'border-border'"
    />
    <p v-if="error && id" :id="`${id}-error`" role="alert" class="mt-1 text-sm text-danger">
      {{ error }}
    </p>
  </div>
</template>
