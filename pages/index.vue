<script setup lang="ts">
const trendingItems = await $fetch('/api/recommendations/trending');
const latestMovies = await $fetch('/api/recommendations/trending');

const movieStore = useMovieStore();
const recentlyViewed = movieStore.recentlyViewed;
</script>

<template>
  <Hero />
  <div class="mt-24 px-14 space-y-16 pb-32">
    <ClientOnly>
      <div v-if="recentlyViewed.length">
        <Carousel title="Recently viewed" :items="recentlyViewed" />
      </div>
    </ClientOnly>
    <Carousel title="Trending now" :items="trendingItems" />
    <Carousel title="Movies" :items="latestMovies" />
    <Carousel title="Series" :items="trendingItems" />
  </div>
</template>