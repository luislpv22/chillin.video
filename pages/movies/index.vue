<script setup lang="ts">
const featured = await $fetch('/api/recommendations/featured?type=movie');
const trendingItems = await $fetch('/api/recommendations/trending?type=movie');
const latestMovies = await $fetch('/api/recommendations/trending');
</script>

<template>
  <Hero :items="featured.reverse()" />
  <div class="mt-16 md:mt-24 px-6 md:px-14 space-y-12 md:space-y-16 pb-24 md:pb-32 overflow-hidden">
    <Carousel title="Trending now" :items="trendingItems" />
  </div>
</template>