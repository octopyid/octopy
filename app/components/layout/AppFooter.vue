<template>
  <footer class="mt-24 border-t border-border bg-surface-raised pt-16 pb-8">
    <UiContainer>
      <div class="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-8">
        <!-- Brand Section -->
        <div class="col-span-2">
          <NuxtLink to="/" class="mb-4 inline-flex items-center gap-2">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white"
            >
              <Icon name="ph:code-bold" size="18" />
            </div>
            <span class="text-xl font-bold tracking-tight text-text-primary">Octopy ID</span>
          </NuxtLink>
          <p class="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
            Backend systems, Linux server infrastructure, and modern web applications. Open
            source maintainer and software engineer.
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/supianidz"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:text-primary-500"
              aria-label="GitHub"
            >
              <Icon name="ph:github-logo-duotone" size="20" />
            </a>
            <a
              href="https://linkedin.com/in/supianidz"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:text-primary-500"
              aria-label="LinkedIn"
            >
              <Icon name="ph:linkedin-logo-duotone" size="20" />
            </a>
            <a
              href="https://wa.me/628159826697?text=Hello%20Supian,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:text-primary-500"
              aria-label="WhatsApp"
            >
              <Icon name="ph:whatsapp-logo-duotone" size="20" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="mb-4 text-sm font-bold tracking-wider text-text-primary uppercase">
            Navigation
          </h3>
          <ul class="flex flex-col gap-3">
            <li>
              <NuxtLink
                to="/about"
                class="text-sm text-text-secondary transition-colors hover:text-primary-500"
                >About Me</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/services"
                class="text-sm text-text-secondary transition-colors hover:text-primary-500"
                >Services</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/lab"
                class="text-sm text-text-secondary transition-colors hover:text-primary-500"
                >The Lab</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/insights"
                class="text-sm text-text-secondary transition-colors hover:text-primary-500"
                >Insights</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="mb-4 text-sm font-bold tracking-wider text-text-primary uppercase">Connect</h3>
          <ul class="flex flex-col gap-3">
            <li>
              <a
                href="mailto:supianidz@octopy.dev"
                class="group inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-primary-500"
              >
                <Icon
                  name="ph:envelope-duotone"
                  size="18"
                  class="text-text-muted transition-colors group-hover:text-primary-500"
                />
                supianidz@octopy.dev
              </a>
            </li>
            <li>
              <span class="inline-flex items-center gap-2 text-sm text-text-secondary">
                <Icon name="ph:map-pin-duotone" size="18" class="text-text-muted" />
                Indonesia
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-16 border-t border-border/50 pt-8 text-center">
        <p class="text-sm text-text-muted">
          &copy; {{ new Date().getFullYear() }} Octopy ID / Supian M. All rights reserved.
        </p>
      </div>
    </UiContainer>
  </footer>
</template>
