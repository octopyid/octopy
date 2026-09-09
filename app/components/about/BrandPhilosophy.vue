<template>
  <section class="border-y border-border bg-surface-raised py-16 md:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 md:grid-cols-2">
        <div>
          <div class="mb-6">
            <UiSectionEyebrow text="The Brand" />
          </div>

          <h3 class="mb-6 text-3xl font-extrabold text-text-primary md:text-5xl">
            Octopy ID <br />
            <span
              class="mt-2 block text-xl font-bold tracking-tight text-text-secondary md:text-2xl"
              >The Manifesto</span
            >
          </h3>

          <p class="mb-6 text-lg leading-relaxed text-text-secondary">
            The octopus is a creature of high intelligence, adaptability, and decentralized control.
            It thrives in high-pressure environments by coordinating multiple complex systems
            seamlessly.
          </p>
          <p class="text-lg leading-relaxed text-text-secondary">
            This is the exact philosophy behind Octopy ID. Whether it is provisioning secure
            bare-metal Linux infrastructure, mitigating threats via Web Application Firewalls, or
            writing highly concurrent backend APIs, the objective is the same: to deliver resilient
            systems that adapt to scale.
          </p>
          <p class="mt-6 text-lg leading-relaxed text-text-secondary">
            We do not believe in hype-driven development. Our engineering decisions are guided by
            three uncompromising pillars:<br />
            <strong class="text-text-primary"
              >Pragmatic Architecture, Maintainable Code, and Flawless Execution.</strong
            >
          </p>
        </div>

        <div class="relative flex items-center justify-center p-4 sm:p-8">
          <AboutOctopusCircuit />
        </div>
      </div>
    </div>
  </section>
</template>
