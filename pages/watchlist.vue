<script setup lang="ts">
import type { Media } from '~/types/media';

const movieStore = useMediaStore();
const watchList = movieStore.watchList;

const selectedId = ref<string | null>(null);
const selectItem = (item: Media) => {
  selectedId.value = item.id;
  movieStore.setCurrentMovie(item);
};
</script>

<template>
  <div class="pt-24 md:pt-40 px-6 md:px-14">
    <h1 class="text-2xl md:text-[2rem] mb-6 md:mb-8">My Watchlist</h1>
    <div class="grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
      <NuxtLink
        v-for="movie in watchList"
        :key="movie.id"
        :to="`/movies/${movie.id}`"
        class="group hover:scale-105 transition-transform duration-200 shrink-0 aspect-[2/3] overflow-hidden"
        @click.prevent="() => selectItem(movie)"
      >
        <img
          :src="movie.poster"
          class="w-full h-full object-cover rounded-lg md:rounded-xl"
          :class="{ '[view-transition-name:movie-poster]': movieStore.currentMedia?.id === movie.id || selectedId === movie.id }" />
      </NuxtLink>
    </div>
  </div>
</template>