<script setup lang="ts">
const arms = [
  // Top
  { path: 'M 200 140 L 200 80 L 170 50', endX: 170, endY: 50, delay: '0s' },
  // Top Right
  { path: 'M 240 160 L 280 120 L 330 120 L 360 90', endX: 360, endY: 90, delay: '1s' },
  // Right
  { path: 'M 260 200 L 330 200 L 360 230', endX: 360, endY: 230, delay: '2s' },
  // Bottom Right
  { path: 'M 240 240 L 280 280 L 330 280 L 360 310', endX: 360, endY: 310, delay: '0.5s' },
  // Bottom
  { path: 'M 200 260 L 200 320 L 230 350', endX: 230, endY: 350, delay: '1.5s' },
  // Bottom Left
  { path: 'M 160 240 L 120 280 L 70 280 L 40 310', endX: 40, endY: 310, delay: '2.5s' },
  // Left
  { path: 'M 140 200 L 70 200 L 40 170', endX: 40, endY: 170, delay: '0.8s' },
  // Top Left
  { path: 'M 160 160 L 120 120 L 70 120 L 40 90', endX: 40, endY: 90, delay: '1.8s' },
];
</script>

<template>
  <div class="relative mx-auto aspect-square w-full max-w-md p-4">
    <!-- SVG Circuits -->
    <svg viewBox="0 0 400 400" aria-hidden="true" class="absolute inset-0 h-full w-full">
      <!-- Base Traces -->
      <g
        stroke="currentColor"
        class="text-border"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path v-for="(arm, index) in arms" :key="`base-${index}`" :d="arm.path" />
      </g>

      <!-- Glowing Animated Traces -->
      <g
        stroke="currentColor"
        class="text-primary-500 drop-shadow-[0_0_8px_rgba(179,71,30,0.8)]"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          v-for="(arm, index) in arms"
          :key="`anim-${index}`"
          :d="arm.path"
          class="animate-circuit-flow"
          :style="{ animationDelay: arm.delay }"
        />
      </g>

      <!-- Endpoint Nodes -->
      <g class="fill-surface-raised stroke-border" stroke-width="2">
        <circle
          v-for="(arm, index) in arms"
          :key="`node-${index}`"
          :cx="arm.endX"
          :cy="arm.endY"
          r="6"
        />
      </g>

      <!-- Glowing Nodes (Pulsing) -->
      <g class="fill-primary-500">
        <circle
          v-for="(arm, index) in arms"
          :key="`glow-${index}`"
          :cx="arm.endX"
          :cy="arm.endY"
          r="4"
          class="animate-pulse"
          :style="{ animationDelay: arm.delay }"
        />
      </g>
    </svg>

    <!-- Center Head (Octopy ID) -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div
        class="relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-primary-500/30 bg-surface/80 shadow-[0_0_30px_rgba(179,71,30,0.15)] backdrop-blur-md"
      >
        <!-- Inner ring -->
        <div
          class="absolute inset-1 animate-[spin_20s_linear_infinite] rounded-full border border-dashed border-primary-500/20"
        ></div>

        <Icon name="ph:circuitry-duotone" size="32" class="mb-1 text-primary-500" />
        <span class="text-sm font-black tracking-wider text-text-primary">OCTOPY</span>
        <span class="text-[10px] font-bold tracking-[0.2em] text-primary-500">ID</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Keyframes for data flowing through circuit paths */
@keyframes circuit-flow {
  0% {
    stroke-dasharray: 0 300;
    stroke-dashoffset: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    stroke-dasharray: 40 300;
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    stroke-dasharray: 0 300;
    stroke-dashoffset: -300;
    opacity: 0;
  }
}

.animate-circuit-flow {
  animation: circuit-flow 3s ease-in-out infinite;
  stroke-dasharray: 0 300; /* Initial state hidden */
}
</style>
