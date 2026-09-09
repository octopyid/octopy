<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

useSeoMeta({
  title: 'Infrastructure & Engineering',
  description:
    'Supian M / Octopy ID. Architecting scalable Linux servers, enterprise mail, and full-stack web applications.',
});

defineOgImageComponent('OctopySeo', {
  title: 'Infrastructure & Engineering',
  description:
    'Architecting scalable Linux servers, enterprise mail, and full-stack web applications.',
});

useSchemaOrg([
  defineWebSite({ name: 'Octopy ID' }),
  definePerson({
    name: 'Supian M',
    url: 'https://octopy.dev/about',
    jobTitle: 'Full-Stack Engineer and Infrastructure Consultant',
    sameAs: [
      'https://github.com/supianidz',
      'https://linkedin.com/in/supianidz',
    ],
  }),
]);
</script>

<template>
  <div>
    <HomeHeroSection />
    <HomeTechStack />
    <HomeServicesTeaser />
    <HomeFeaturedProjects />
    <HomeLatestInsights />
  </div>
</template>
