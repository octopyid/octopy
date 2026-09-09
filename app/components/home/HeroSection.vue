<script setup lang="ts">
// HeroSection component
</script>

<template>
  <section class="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
    <!-- Rich Gradient Mesh Background -->
    <div aria-hidden="true" class="absolute inset-0 -z-10 overflow-hidden">
      <div
        class="absolute -top-[20%] left-[20%] h-[500px] w-[500px] animate-pulse rounded-full bg-primary-500/20 mix-blend-multiply blur-[120px] dark:mix-blend-screen"
      ></div>
      <div
        class="absolute top-[20%] -right-[10%] h-[400px] w-[400px] animate-pulse rounded-full bg-primary-400/20 mix-blend-multiply blur-[100px] dark:mix-blend-screen"
        style="animation-delay: 2s"
      ></div>
      <div
        class="absolute -bottom-[10%] left-[40%] h-[600px] w-[600px] animate-pulse rounded-full bg-primary-600/10 mix-blend-multiply blur-[150px] dark:mix-blend-screen"
        style="animation-delay: 4s"
      ></div>
    </div>

    <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <!-- Animated Tagline -->
      <div
        class="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-3 py-1 text-sm font-medium text-text-secondary"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
      >
        <span class="flex h-2 w-2 animate-pulse rounded-full bg-primary-500"></span>
        Solid Engineering Foundation
      </div>

      <!-- High-contrast Headline -->
      <h1
        class="mb-6 text-5xl leading-tight font-extrabold tracking-tight text-text-primary sm:text-6xl lg:text-7xl"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
      >
        Building <span class="text-gradient-primary">Reliable</span> <br class="hidden sm:block" />
        Systems & Infrastructure
      </h1>

      <!-- Sub-copy -->
      <p
        class="mx-auto mt-4 mb-10 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
      >
        I am Supian M. I build pragmatic server architectures and web applications that just work.
        No over-engineering, no false promises—just clean code, secure Linux environments, and
        proven technologies.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <UiButton to="/lab" size="md"> View Projects </UiButton>
        <UiButton to="/services" variant="secondary" size="md"> Explore Services </UiButton>
      </div>
    </div>
  </section>
</template>
