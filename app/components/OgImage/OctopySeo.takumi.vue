<script setup lang="ts">
// First-party OG image template (Satori-compatible: flexbox + inline styles only).
// Used via `defineOgImageComponent('OctopySeo', { title, description })`.
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
  }>(),
  {
    title: 'Octopy ID',
    description: 'Infrastructure & Engineering',
  },
);
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #09090b;
      padding: 64px 72px;
    "
  >
    <div style="display: flex; align-items: center">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background-color: #b3471e;
          color: #ffffff;
          font-size: 30px;
          font-weight: 800;
        "
      >
        O
      </div>
      <div
        style="margin-left: 20px; color: #fafafa; font-size: 30px; font-weight: 800"
      >
        Octopy <span style="color: #e28266">ID</span>
      </div>
    </div>

    <div style="display: flex; flex-direction: column">
      <div
        style="
          width: 64px;
          height: 6px;
          border-radius: 3px;
          background-color: #b3471e;
          margin-bottom: 28px;
        "
      />
      <div
        style="color: #fafafa; font-size: 64px; font-weight: 800; line-height: 1.1"
      >
        {{ title }}
      </div>
      <div style="color: #a1a1aa; font-size: 28px; line-height: 1.4; margin-top: 20px">
        {{ description }}
      </div>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between">
      <div style="color: #71717a; font-size: 24px">octopy.dev</div>
      <div style="color: #71717a; font-size: 24px">Supian M</div>
    </div>
  </div>
</template>
