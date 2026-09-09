<script setup lang="ts">
const isMobileMenuOpen = ref(false);
const route = useRoute();

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Close mobile menu on route change
watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false;
  },
);
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full flex-none bg-bg/70 backdrop-blur-md transition-colors duration-500 lg:border-b lg:border-border/50"
  >
    <UiContainer>
      <div class="border-b border-border py-4 lg:border-0">
        <div class="relative flex items-center">
          <NuxtLink to="/" class="mr-3 flex-none overflow-hidden text-lg font-bold md:w-auto">
            Octopy <span class="text-primary-500">ID</span>
          </NuxtLink>

          <!-- Desktop Nav -->
          <div class="relative ml-auto hidden items-center lg:flex">
            <LayoutAppNav />
            <div class="ml-6 flex items-center border-l border-border pl-6">
              <ThemeSwitcher />
            </div>
          </div>

          <!-- Mobile Menu Toggle -->
          <div class="ml-auto flex items-center lg:hidden">
            <ThemeSwitcher class="mr-4" />
            <button
              @click="toggleMobileMenu"
              class="flex h-[36px] w-[36px] items-center justify-center text-text-secondary transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
              aria-label="Toggle mobile menu"
              :aria-expanded="isMobileMenuOpen"
              aria-controls="mobile-menu"
            >
              <Icon :name="isMobileMenuOpen ? 'ph:x-bold' : 'ph:list-bold'" size="24" />
            </button>
          </div>
        </div>
      </div>
    </UiContainer>

    <!-- Mobile Menu Overlay -->
    <LayoutAppMobileMenu :open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />
  </header>
</template>
