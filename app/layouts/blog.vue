<template>
  <div class="flex min-h-screen flex-col">
    <UiReadingProgress />
    <a href="#main-content" class="skip-link">Skip to content</a>
    <LayoutAppHeader />
    <UiContainer
      as="main"
      id="main-content"
      class="grid flex-grow grid-cols-1 gap-8 py-12 lg:grid-cols-4"
    >
      <article class="lg:col-span-3">
        <slot />
      </article>
      <aside class="hidden lg:col-span-1 lg:block">
        <!-- TOC goes here -->
        <div class="sticky top-24">
          <slot name="sidebar" />
        </div>
      </aside>
    </UiContainer>
    <LayoutAppFooter />
  </div>
</template>
