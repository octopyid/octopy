<script setup lang="ts"></script>

<template>
  <section class="relative overflow-hidden pt-16 pb-20 lg:pt-36 lg:pb-40">
    <div aria-hidden="true" class="absolute inset-0 -z-10 overflow-hidden">
      <div
        class="absolute -top-[20%] left-[20%] h-[500px] w-[500px] rounded-full bg-primary-500/20 blur-[120px] dark:mix-blend-screen"
      ></div>
    </div>

    <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <p
        class="mb-8 text-sm font-semibold tracking-wide text-text-secondary"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
      >
        Solid Engineering Foundation
      </p>

      <h1
        class="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
      >
        Building <span class="text-gradient-primary">Reliable</span> <br class="hidden sm:block" />
        Systems & Infrastructure
      </h1>

      <p
        class="mx-auto mt-4 mb-10 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl"
      >
        I am Supian M. I build pragmatic server architectures and web applications that just work.
        Clean code, secure Linux environments, and proven technologies, without over-engineering.
      </p>

      <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <UiButton to="/lab" size="md"> Browse Lab Projects </UiButton>
        <UiButton to="/services" variant="secondary" size="md"> See Engineering Services </UiButton>
      </div>
    </div>
  </section>
</template>
