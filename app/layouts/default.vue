<template>
  <div class="flex min-h-screen flex-col">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <LayoutAppHeader />
    <main id="main-content" class="flex-grow">
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>
