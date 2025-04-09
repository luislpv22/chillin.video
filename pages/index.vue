<script setup lang="ts">
const featured = await $fetch('/api/recommendations/featured');
const trending = await $fetch('/api/recommendations/trending');
const movies = await $fetch('/api/recommendations/trending?type=movie');
const series = await $fetch('/api/recommendations/trending?type=series');

const movieStore = useMediaStore();
const recentlyViewed = movieStore.recentlyViewed;
</script>

<template>
  <Hero :items="featured" />
  <div class="mt-16 md:mt-24 px-6 md:px-14 space-y-12 md:space-y-16 pb-24 md:pb-32 overflow-hidden">
    <ClientOnly>
      <div v-if="recentlyViewed.length">
        <Carousel title="Recently viewed" :items="recentlyViewed" />
      </div>
    </ClientOnly>
    <Carousel title="Trending now" :items="trending" />
    <Carousel title="Movies" :items="movies.reverse()" />
    <Carousel title="Series" :items="series" />
  </div>
</template>