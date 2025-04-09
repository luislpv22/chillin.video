<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { NuxtLink } from '#components';
import type { Media } from '~/types/media';

interface Props {
  items: Media[];
}

defineProps<Props>();

const { y } = useWindowScroll();

const parallaxEffect = computed(() => ({
  transform: `translateY(${Math.floor(y.value * 0.4)}px)`
}));
</script>

<template>
  <div class="flex h-[90vh] overflow-hidden relative after:absolute after:inset-0 after:bg-gradient-to-t after:to-50% after:from-zinc-950 after:to-transparent">
    <img
      :src="items[0].poster"
      class="absolute w-full h-full object-cover object-top"
      :style="parallaxEffect"
    />
    <div class="flex flex-col items-start justify-end px-6 md:px-14 z-1">
      <!-- <img :src="items[0].poster" class="h-72 w-auto rounded-xl mb-12" /> -->
      <Badge class="mb-4">Most Popular</Badge>
      <h1 class="text-5xl/12 md:text-[4rem]/16 text-white font-black">{{ items[0].title }}</h1>
      <h2 v-if="items[0].subtitle" class="mt-3 text-2xl md:text-[2.5rem] text-white leading-tight">{{ items[0].subtitle }}</h2>
      <div class="mt-6 md:mt-8 flex flex-wrap items-center gap-2 md:pb-12">
        <Button>
          <PlayIcon class="w-6 h-6 -ml-2" />
          Watch Now
        </Button>
        <Button :as="NuxtLink" :to="`/movies/${items[0].id}`" variant="secondary">
          Details
          <AngleRightIcon class="w-6 h-6 -mr-2"/>
        </Button>
      </div>
    </div>
  </div>
</template>