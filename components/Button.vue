<script setup lang="ts">
import type { Component } from 'vue';

interface Props {
  as?: string | Component;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
}

withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'primary',
  size: 'lg',
  iconOnly: false
});

const classVariants = {
  variant: {
    primary: 'bg-white text-zinc-900 hover:bg-zinc-200',
    secondary: 'bg-zinc-800/50 backdrop-blur-xs hover:bg-zinc-700/50'
  },
  size: {
    sm: 'px-4 py-2',
    md: 'px-6 py-2.5 text-lg',
    lg: 'px-5 md:px-7 lg:px-8 py-2 md:py-3 text-base lg:text-xl'
  },
  sizeIconOnly: {
    sm: 'p-2.5',
    md: 'p-3', 
    lg: 'p-3.5'
  },
  disabled: 'opacity-50 cursor-default pointer-events-none'
};
</script>

<template>
  <component
    :is="as"
    class="flex items-center gap-2 rounded-full font-medium cursor-pointer whitespace-nowrap"
    :class="[
      classVariants.variant[variant],
      classVariants[iconOnly ? 'sizeIconOnly' : 'size'][size],
      $attrs.disabled && classVariants.disabled
    ]"
  >
    <slot />
  </component>
</template>