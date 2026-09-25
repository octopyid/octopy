<script setup lang="ts">
const techList = [
  { name: 'Linux', icon: 'simple-icons:linux' },
  { name: 'Go', icon: 'simple-icons:go' },
  { name: 'Laravel', icon: 'simple-icons:laravel' },
  { name: 'Vue.js', icon: 'simple-icons:vuedotjs' },
];

// Four copies keep the track wider than ultrawide viewports now that the
// list is short; only the first copy is exposed to assistive tech.
const copies = 4;
</script>

<template>
  <section class="overflow-hidden border-y border-border bg-bg-subtle py-10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p class="mb-8 text-center text-xs font-semibold tracking-widest text-text-muted uppercase">
        Core Engineering Stack
      </p>

      <!-- CSS Marquee: pauses on hover or keyboard focus, disabled for reduced motion -->
      <div class="group relative flex overflow-x-hidden">
        <div
          class="animate-marquee flex items-center space-x-12 whitespace-nowrap motion-reduce:animate-none sm:space-x-24 group-focus-within:[animation-play-state:paused]"
        >
          <template v-for="copy in copies" :key="copy">
            <div
              v-for="tech in techList"
              :key="`${copy}-${tech.name}`"
              :aria-hidden="copy > 1 || undefined"
              class="flex items-center gap-3 text-text-secondary transition-colors hover:text-primary-500"
            >
              <Icon :name="tech.icon" size="32" aria-hidden="true" />
              <span class="hidden text-lg font-medium sm:block">{{ tech.name }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-marquee {
  animation: marquee 25s linear infinite;
}
.group:hover .animate-marquee {
  animation-play-state: paused;
}
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
