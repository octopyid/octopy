<template>
  <section class="py-16 md:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 md:grid-cols-12">
        <!-- Text -->
        <div class="md:col-span-7">
          <div class="mb-6 flex items-center gap-3">
            <div class="h-px w-12 bg-primary-500"></div>
            <h2 class="text-xs font-bold tracking-widest text-primary-500 uppercase">The Person</h2>
          </div>

          <h3 class="mb-8 text-3xl leading-tight font-extrabold text-text-primary md:text-5xl">
            Supian M. <br />
            <span
              class="mt-2 block text-xl font-bold tracking-tight text-text-secondary md:text-2xl"
              >Software & Linux Systems Engineer.</span
            >
          </h3>

          <div class="max-w-none text-lg leading-relaxed text-text-secondary">
            <p class="mb-6">
              I build and scale web applications and server environments. Over the past decade, I
              have operated at the intersection of software development and Linux server
              administration, delivering solutions for government sectors and private clients.
            </p>

            <p class="mb-4">My work is defined by three core principles:</p>
            <ul class="mb-6 space-y-2">
              <li>
                <strong class="text-text-primary">Full-Lifecycle Ownership:</strong> I architect
                systems from bare-metal Linux provisioning, Web Application Firewalls (WAF), and
                mail servers down to backend APIs and reactive frontends.
              </li>
              <li>
                <strong class="text-text-primary">Pragmatic Architecture:</strong> I avoid
                over-engineering. I advise stakeholders on cost-effective, maintainable tech stacks
                that execute flawlessly in production.
              </li>
              <li>
                <strong class="text-text-primary">Open Source Scale:</strong> The software libraries
                I author and maintain are actively utilized by over 125,000 developers worldwide.
              </li>
            </ul>

            <p>I don't just write code; I deliver reliable, production-ready software systems.</p>
            <div class="mt-10">
              <a
                href="/Supian_M_Resume.pdf"
                target="_blank"
                class="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-500 px-6 text-sm font-medium text-white shadow-glow transition-colors hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-interactive focus-visible:outline-none"
              >
                <Icon name="ph:file-pdf-duotone" size="20" />
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>

        <!-- Image -->
        <div class="relative mt-8 md:col-span-5 md:mt-0">
          <div
            class="absolute inset-0 translate-x-4 translate-y-4 transform rounded-2xl border border-primary-500/20 bg-primary-500/10"
          ></div>
          <NuxtImg
            src="/images/me.png"
            alt="Supian M Portrait"
            class="relative aspect-[4/5] w-full rounded-2xl border border-border bg-surface object-cover shadow-lg"
            width="400"
            height="500"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>
