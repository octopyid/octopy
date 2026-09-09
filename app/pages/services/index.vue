<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

useSeoMeta({
  title: 'Services',
  description:
    'Holistic infrastructure and application engineering services. Linux, Mail, and App Development.',
});

const services = [
  {
    id: 'vue-electron',
    title: 'Vue & Electron Development',
    description:
      'Developing practical single-page applications and desktop tools that prioritize user experience without unnecessary complexity.',
    icon: 'simple-icons:vuedotjs',
  },
  {
    id: 'laravel',
    title: 'Laravel Development',
    description:
      "Building maintainable web applications and REST APIs using Laravel's proven ecosystem. Code that your future developers can actually read.",
    icon: 'simple-icons:laravel',
  },
  {
    id: 'golang',
    title: 'Golang Development',
    description:
      'Writing efficient backend services and CLI tools in Go for tasks where raw performance and concurrency actually matter.',
    icon: 'simple-icons:go',
  },
  {
    id: 'linux',
    title: 'Linux Server Administration',
    description:
      'Practical server management, security hardening, and straightforward deployments designed to keep your services online without the headache.',
    icon: 'simple-icons:linux',
  },
  {
    id: 'mail',
    title: 'Enterprise Mail Servers',
    description:
      'Deploying and managing robust self-hosted mail stacks (Mailcow, Poste.io) with strict SPF, DKIM, and DMARC configurations for ultimate deliverability.',
    icon: 'simple-icons:maildotru',
  },
  {
    id: 'docker',
    title: 'Docker & Containerization',
    description:
      "Containerizing applications to ensure they run the exact same way in production as they do on the developer's machine.",
    icon: 'simple-icons:docker',
  },
];
</script>

<template>
  <UiContainer size="7xl" class="pt-24 pb-20">
    <UiPageHeader
      eyebrow="What I Do"
      title="Services & Expertise"
      description="I deliver end-to-end engineering solutions focused on maintainability and real-world results. Whether it's configuring a mail server or building a web app, I prioritize pragmatic choices over hype."
    />

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="service in services"
        :key="service.id"
        class="group relative flex h-full flex-col rounded-2xl border border-border bg-surface-raised p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:shadow-glow"
      >
        <div
          class="mb-8 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-bg text-primary-500 transition-transform group-hover:scale-110"
        >
          <Icon :name="service.icon" size="28" />
        </div>
        <h3 class="mb-4 text-xl font-bold text-text-primary">{{ service.title }}</h3>
        <p class="leading-relaxed text-text-secondary">{{ service.description }}</p>
      </div>
    </div>

    <!-- CTA Section -->
    <div
      class="mt-24 rounded-3xl border border-primary-500/20 bg-primary-500/5 px-6 py-12 text-center sm:px-12 lg:px-16"
    >
      <h2 class="mb-4 text-3xl font-extrabold text-text-primary">
        Need a Custom Engineering Solution?
      </h2>
      <p class="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
        I believe in honesty first. Let's discuss your project—I often advise clients on
        cost-effective, practical solutions they can try before committing to custom development.
      </p>
      <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="https://wa.me/628159826697?text=Hello%20Supian,%20I%20would%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:outline-none"
        >
          <Icon name="simple-icons:whatsapp" size="20" />
          Chat on WhatsApp
        </a>
        <UiButton to="/contact" variant="secondary">
          <Icon name="simple-icons:maildotru" size="20" aria-hidden="true" />
          Send an Email
        </UiButton>
      </div>
    </div>
  </UiContainer>
</template>
