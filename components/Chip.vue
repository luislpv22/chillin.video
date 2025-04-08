<script setup lang="ts">
interface Props {
  selected?: boolean;
}

withDefaults(defineProps<Props>(), {
  selected: false,
});
</script>

<template>
  <div
    class="px-4 py-1 rounded-full font-medium cursor-pointer"
    :class="selected ? 'bg-primary text-black' : 'text-white hover:bg-zinc-800/50 hover:backdrop-blur-xs'"
  >
    <slot />
  </div>
</template>