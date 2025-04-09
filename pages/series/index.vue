<script setup lang="ts">
const featured = await $fetch('/api/recommendations/featured?type=series');
const trendingItems = await $fetch('/api/recommendations/trending?type=series');
</script>

<template>
  <Hero :items="featured" />
  <div class="mt-16 md:mt-24 px-6 md:px-14 space-y-12 md:space-y-16 pb-24 md:pb-32 overflow-hidden">
    <Carousel title="Trending now" :items="trendingItems" />
  </div>
</template>