<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const isSubmitting = ref(false);
const isSuccess = ref(false);
const submitError = ref('');

let successTimer: ReturnType<typeof setTimeout> | undefined;

const handleSubmit = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  submitError.value = '';

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value,
    });

    isSuccess.value = true;
    form.value = { name: '', email: '', subject: '', message: '' };

    // Reset success state after a while
    clearTimeout(successTimer);
    successTimer = setTimeout(() => {
      isSuccess.value = false;
    }, 5000);
  } catch {
    submitError.value = 'Failed to send message. Please try again later.';
  } finally {
    isSubmitting.value = false;
  }
};

onUnmounted(() => clearTimeout(successTimer));
</script>

<template>
  <div
    class="relative overflow-hidden rounded-2xl border border-border bg-surface-raised p-6 shadow-sm md:p-10"
  >
    <div
      v-if="isSuccess"
      role="status"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-raised p-8 text-center"
    >
      <div
        class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success"
      >
        <Icon name="ph:check-bold" size="32" aria-hidden="true" />
      </div>
      <h3 class="mb-2 text-2xl font-bold text-text-primary">Message Sent</h3>
      <p class="text-text-secondary">Thank you for reaching out. I'll get back to you shortly.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <label for="name" class="text-sm font-medium text-text-secondary">Name</label>
          <UiInput
            id="name"
            v-model="form.name"
            name="name"
            autocomplete="name"
            required
            placeholder="John Doe"
          />
        </div>
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium text-text-secondary">Email</label>
          <UiInput
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            required
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label for="subject" class="text-sm font-medium text-text-secondary">Subject</label>
        <UiInput
          id="subject"
          v-model="form.subject"
          name="subject"
          autocomplete="off"
          required
          placeholder="Project Inquiry"
        />
      </div>

      <div class="space-y-2">
        <label for="message" class="text-sm font-medium text-text-secondary">Message</label>
        <UiTextarea
          id="message"
          v-model="form.message"
          name="message"
          :rows="5"
          required
          placeholder="Tell me about your project..."
        />
      </div>

      <p v-if="submitError" role="alert" class="text-sm font-medium text-danger">
        {{ submitError }}
      </p>

      <UiButton type="submit" size="xl" class="w-full" :loading="isSubmitting">
        <span class="flex items-center gap-2">
          Send Message <Icon name="ph:paper-plane-right-bold" aria-hidden="true" />
        </span>
      </UiButton>
    </form>
  </div>
</template>
