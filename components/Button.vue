<script setup lang="ts">
import type { Component } from 'vue';

interface Props {
  as?: string | Component;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'primary',
  size: 'lg',
});

const classVariants = {
  variant: {
    primary: 'bg-white text-zinc-900 hover:bg-zinc-200',
    secondary: 'bg-zinc-800/50 backdrop-blur-xs hover:bg-zinc-700/50',
  },
  size: {
    sm: 'px-4 py-2',
    md: 'px-6 py-2.5 text-lg',
    lg: 'px-8 py-3 text-xl', 
  }
};
</script>

<template>
  <component
    :is="as"
    class="flex items-center gap-2 rounded-full font-medium cursor-pointer"
    :class="[
      classVariants.variant[variant],
      classVariants.size[size],
    ]"
  >
    <slot />
  </component>
</template>