<script setup lang="ts">
import { NuxtLink } from '#components';
const featured = await $fetch('/api/recommendations/featured');
</script>

<template>
  <div class="flex h-[90vh] overflow-hidden relative after:absolute after:inset-0 after:bg-gradient-to-t after:to-50% after:from-zinc-950 after:to-transparent">
    <img :src="featured[0].poster" class="absolute w-full h-full object-cover object-top" />
    <div class="w-1/2 flex flex-col items-start justify-end px-14 z-1">
      <!-- <img :src="featured[0].poster" class="h-72 w-auto rounded-xl mb-12" /> -->
      <Badge class="mb-2">Most Popular</Badge>
      <h1 class="text-[4rem] text-white font-black leading-tight">{{ featured[0].title }}</h1>
      <h2 v-if="featured[0].subtitle" class="mt-1 text-[2.5rem] text-white leading-tight">{{ featured[0].subtitle }}</h2>
      <div class="mt-8 flex items-center gap-2 pb-12">
        <Button>
          <PlayIcon class="w-6 h-6 -ml-2" />
          Watch Now
        </Button>
        <Button :as="NuxtLink" :to="`/movies/${featured[0].id}`" variant="secondary">
          Details
          <AngleRightIcon class="w-6 h-6 -mr-2"/>
        </Button>
      </div>
    </div>
  </div>
</template>