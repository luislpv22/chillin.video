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
          <svg class="w-6 h-6 -ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path></svg>
          Watch Now
        </Button>
        <Button :as="NuxtLink" :to="`/movies/${featured[0].id}`" variant="secondary">
          Details
          <svg class="w-6 h-6 -mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
        </Button>
      </div>
    </div>
  </div>
</template>