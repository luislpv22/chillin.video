<script setup lang="ts">
const trendingItems = await $fetch('/api/recommendations/trending');
const latestMovies = await $fetch('/api/recommendations/trending');
</script>

<template>
  <Hero />
  <div class="mt-24 px-14 pb-16">
    <Carousel title="Trending now" :items="trendingItems" />
  </div>
  <div class="px-14 pb-16">
    <Carousel title="Movies" :items="latestMovies" />
  </div>
  <div class="px-14 pb-32">
    <Carousel title="Series" :items="trendingItems" />
  </div>
</template>