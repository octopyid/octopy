<script setup lang="ts">
const { isDark, currentTheme, setTheme, toggleTheme } = useTheme();

const themes = [
  { value: 'light', label: 'Light', icon: 'ph:sun-bold' },
  { value: 'dark', label: 'Dark', icon: 'ph:moon-bold' },
  { value: 'system', label: 'System', icon: 'ph:monitor-bold' },
] as const;
</script>

<template>
  <ClientOnly>
    <div class="relative" role="group" aria-label="Theme selector">
      <!-- Compact toggle (mobile) -->
      <button
        class="theme-toggle flex lg:hidden"
        :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
        :aria-pressed="isDark"
        @click="toggleTheme"
      >
        <Icon :name="isDark ? 'ph:sun-bold' : 'ph:moon-bold'" size="18" />
      </button>

      <!-- Segmented control (desktop) -->
      <div class="theme-segment hidden lg:flex" role="radiogroup" aria-label="Theme">
        <button
          v-for="t in themes"
          :key="t.value"
          class="theme-segment__btn"
          :class="{ 'theme-segment__btn--active': currentTheme === t.value }"
          :aria-checked="currentTheme === t.value"
          role="radio"
          @click="setTheme(t.value)"
        >
          <Icon :name="t.icon" size="14" />
          <span>{{ t.label }}</span>
        </button>
      </div>
    </div>

    <template #fallback>
      <div class="relative" role="group">
        <div class="theme-toggle flex opacity-50 lg:hidden">
          <Icon name="ph:circle-notch-bold" class="animate-spin" size="18" />
        </div>
        <div class="theme-segment hidden opacity-50 lg:flex">
          <button v-for="t in themes" :key="t.value" class="theme-segment__btn pointer-events-none">
            <Icon :name="t.icon" size="14" />
            <span>{{ t.label }}</span>
          </button>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.theme-toggle {
  @apply h-11 w-11 cursor-pointer items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] transition-all duration-[var(--duration-fast)] ease-[var(--ease-smooth)];
}
.theme-toggle:hover {
  @apply border-[var(--color-interactive)] bg-[var(--color-interactive-muted)] text-[var(--color-interactive)];
}
.theme-segment {
  @apply items-center gap-[2px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-[3px];
}
.theme-segment__btn {
  @apply flex cursor-pointer items-center gap-[5px] rounded-[var(--radius-md)] border-none bg-transparent px-[10px] py-[4px] text-[12px] font-medium text-[var(--color-text-muted)] transition-all duration-[var(--duration-fast)] ease-[var(--ease-smooth)];
}
.theme-segment__btn:hover {
  @apply bg-[var(--color-surface)] text-[var(--color-text-secondary)];
}
.theme-segment__btn--active {
  @apply bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[var(--shadow-sm)];
}
</style>
