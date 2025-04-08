<script setup lang="ts">
import { ref } from 'vue';
import { useMovieStore } from '@/stores/movie';
import type { Media, MediaType } from '~/types/media';

interface Props {
  title: string;
  items: Media[];
}

defineProps<Props>();

const movieStore = useMovieStore();

const typeRouteMap: Record<MediaType, string> = {
  movie: 'movies',
  series: 'series',
};

const getItemUrl = (item: Media) => {
  return `/${typeRouteMap[item.type]}/${item.id}`;
};

const selectedId = ref<string | null>(null);
const selectItem = (item: Media) => {
  selectedId.value = item.id;
  movieStore.setCurrentMovie(item);
};
</script>

<template>
  <div>
    <h3 class="text-[2rem] mb-6">{{ title }}</h3>
    <div class="flex items-center gap-4">
      <NuxtLink
        v-for="item in items"
        :key="item.id"
        :to="getItemUrl(item)"
        class="group h-96 hover:scale-105 transition-transform duration-200 shrink-0 aspect-[2/3]"
        @click.prevent="() => selectItem(item)">
        <img :src="item.poster" class="h-full w-auto object-cover rounded-xl" :class="{
          '[view-transition-name:movie-poster]': item.id === selectedId,
        }" />
      </NuxtLink>
    </div>
  </div>
</template>