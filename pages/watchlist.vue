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
  <div class="pt-40 px-14">
    <h1 class="text-[2rem] mb-6">My Watchlist</h1>
    <div class="grid grid-flow-col auto-cols-min gap-6">
      <NuxtLink
        v-for="movie in watchList"
        :key="movie.id"
        :to="`/movies/${movie.id}`"
        class="group h-96 hover:scale-105 transition-transform duration-200 shrink-0 aspect-[2/3]"
        @click.prevent="() => selectItem(movie)"
      >
        <img
          :src="movie.poster"
          class="h-full w-auto object-cover rounded-xl"
          :class="{ '[view-transition-name:movie-poster]': movieStore.currentMedia?.id === movie.id || selectedId === movie.id }" />
      </NuxtLink>
    </div>
  </div>
</template>