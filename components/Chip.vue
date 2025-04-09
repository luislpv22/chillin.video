<script setup lang="ts">
interface Props {
  to: string;
}

defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="px-4 py-1 rounded-full font-medium cursor-pointer"
    :class="$route.fullPath === to ? 'bg-primary text-black' : 'text-white hover:bg-zinc-950/50 hover:backdrop-blur-xs'"
  >
    <slot />
  </NuxtLink>
</template>