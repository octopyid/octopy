<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

useSeoMeta({
  title: 'About',
  description:
    'Learn about Supian M, the architect and executor behind Octopy ID, and our core engineering philosophy.',
});

const principles = [
  {
    title: 'Domain-Driven Design',
    description:
      'Structuring software around the core business domain for better maintainability and alignment with real-world problems.',
    icon: 'ph:bounding-box-duotone',
  },
  {
    title: 'Pragmatic Reliability',
    description:
      'Designing infrastructure that makes sense for your scale. Preventing single points of failure without introducing unnecessary architectural overhead.',
    icon: 'ph:shield-check-duotone',
  },
  {
    title: 'Clean Code',
    description:
      'Writing code that is readable, testable, and easily understandable by other engineers. Simplicity over cleverness.',
    icon: 'ph:code-simple-duotone',
  },
];
</script>

<template>
  <div>
    <!-- Page Header -->
    <UiContainer size="4xl" class="pt-24 pb-12">
      <UiPageHeader
        align="center"
        title="About"
        description="A brief history of my career and philosophy."
      />
    </UiContainer>

    <!-- Components -->
    <AboutPersonalStory />
    <AboutBrandPhilosophy />
    <AboutWorkExperience />
    <AboutTechStack />

    <!-- Principles Section -->
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <h3 class="mb-12 text-center text-2xl font-bold text-text-primary">Engineering Principles</h3>
      <div class="grid gap-6 md:grid-cols-3">
        <AboutPrincipleCard
          v-for="p in principles"
          :key="p.title"
          :title="p.title"
          :description="p.description"
          :icon="p.icon"
        />
      </div>
    </section>

    <!-- Call to Action -->
    <section class="border-t border-border/50 bg-bg py-16 md:py-24">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 class="mb-4 text-3xl font-extrabold text-text-primary">
          Need a pragmatic engineer for your next project?
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
          I'm currently available for freelance projects and consulting. Let's discuss how I can
          help build or scale your systems.
        </p>
        <NuxtLink
          to="/contact"
          class="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary-500 px-8 text-sm font-bold text-white shadow-glow transition-all hover:-translate-y-1 hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
        >
          <Icon name="ph:envelope-simple-duotone" size="20" />
          Let's Talk
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
