<script setup lang="ts">
const experiences = [
  {
    date: '2019 · Present',
    role: 'Freelance Engineer & Consultant',
    comp: 'Various Independent Projects',
    desc: 'Operating on a 100% remote, transparent workflow alongside my full-time commitments. To guarantee quality and reliability, I always provide clients with realistic, padded timelines—ensuring every project gets the dedicated attention it deserves without missing deadlines.',
    logo: '', // Fallback to icon
  },
  {
    date: 'January 2023 · Present',
    role: 'Full-Stack Engineer',
    comp: 'Government Procurement (UKPBJ Hulu Sungai Selatan)',
    desc: 'Developed and managed a marketplace for transactions between local governments and SMEs, facilitated adoption by other districts, and integrated with Bela Pengadaan to streamline procurement processes.',
    logo: '/images/company/4.webp',
  },
  {
    date: 'August 2022 · December 2023',
    role: 'Back-End Engineer',
    comp: 'Regional Water Utility (PTAM Intan Banjar)',
    desc: 'Building and optimizing systems for clean water payment processing, installation requests, and customer complaint management, ensuring seamless and efficient service delivery.',
    logo: '/images/company/3.webp',
  },
  {
    date: 'February 2020 · December 2022',
    role: 'Full-Stack Engineer',
    comp: 'Dept. of Communication & Informatics (Diskominfo HSS)',
    desc: 'Responsible for developing custom applications for various government departments. Additionally, I managed and secured a large-scale server infrastructure, handling everything from enterprise email stacks to core government servers.',
    logo: '/images/company/2.webp',
  },
  {
    date: 'February 2019 · Feb 2020',
    role: 'Full-Stack Engineer',
    comp: 'Hasnur Jaya International',
    desc: 'Freelance Developer focused on Warehouse Management Systems, streamlining inventory processes with FIFO and LIFO strategies, overseeing fuel and clean water data management, and automating asset maintenance schedules.',
    logo: '/images/company/1.webp',
  },
];
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-12" v-motion-slide-visible-once-bottom>
        <UiSectionEyebrow text="Career Journey" />
      </div>

      <h3
        class="mb-12 text-3xl font-extrabold text-text-primary md:text-4xl"
        v-motion-slide-visible-once-bottom
      >
        Work Experience
      </h3>

      <div
        class="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent md:space-y-0 md:before:mx-auto md:before:translate-x-0"
      >
        <div
          v-for="exp in experiences"
          :key="exp.comp"
          class="group relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse md:[&:not(:first-child)]:-mt-8 lg:[&:not(:first-child)]:-mt-16"
          v-motion-slide-visible-once-bottom
        >
          <!-- Timeline Node -->
          <div
            aria-hidden="true"
            class="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-raised shadow-sm transition-all duration-300 group-hover:border-primary-500 group-hover:shadow-glow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"
          >
            <div class="h-2 w-2 rounded-full bg-primary-500"></div>
          </div>

          <!-- Content Card -->
          <div
            class="w-[calc(100%-4rem)] rounded-2xl border border-border bg-surface-raised p-6 transition-all duration-300 group-hover:bg-surface hover:-translate-y-1 hover:border-primary-500 hover:shadow-glow md:w-[calc(50%-2.5rem)]"
          >
            <div class="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <span class="text-xs font-bold tracking-wider text-primary-500 uppercase">{{
                  exp.date
                }}</span>
                <h4 class="mt-2 text-xl font-bold text-text-primary">{{ exp.role }}</h4>
                <h5 class="mt-1 text-sm font-medium text-text-secondary">{{ exp.comp }}</h5>
              </div>
              <NuxtImg
                v-if="exp.logo"
                :src="exp.logo"
                :alt="`${exp.comp} logo`"
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
                class="h-12 w-12 shrink-0 rounded-xl border border-border/50 bg-white object-contain p-1 shadow-sm"
              />
              <div
                v-else
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-surface shadow-sm"
              >
                <Icon name="ph:briefcase-duotone" size="24" class="text-text-muted" />
              </div>
            </div>
            <p class="text-sm leading-relaxed text-text-secondary">
              {{ exp.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
