<script setup lang="ts">
interface Props {
  control: string;
  error?: string;
}

defineProps<Props>();

const uid = `form-control-${useUniqueId()}`;
</script>

<template>
  <label
    :for="uid"
    class="mt-3 md:mt-6 block text-sm font-medium text-zinc-400"
  >
    <slot />
  </label>
  <component
    :is="control"
    :id="uid"
    :class="{ 'outline outline-red-500': error }"
    v-bind="$attrs"
  />
  <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
</template>