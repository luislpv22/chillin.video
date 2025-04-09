<script setup lang="ts">
import type { Media } from '~/types/media';
import debounce from 'lodash.debounce';

const movieStore = useMediaStore();
const watchList = movieStore.watchList;

const input = ref<HTMLInputElement>();
const result = ref<Media[]>([]);

const router = useRouter();
const route = useRoute();

const trending = await $fetch('/api/recommendations/trending');

onMounted(() => {
  if (input.value) {
    input.value.focus();
    input.value.value = route.query.q as string || '';
  }
});

const selectedId = ref<string | null>(null);
const selectItem = (item: Media) => {
  selectedId.value = item.id;
  movieStore.setCurrentMovie(item);
};

watch(() => route.query.q, (query) => {
  if (query) {
    $fetch(`/api/search?q=${query}`).then((data) => {
      result.value = data;
    });
  }
}, { immediate: true });

const search = debounce((event: Event) => {
  const query = (event.target as HTMLInputElement)?.value;
  if (query) {
    router.replace('/search?q=' + query);
  } else {
    router.replace('/search')
    result.value = [];
  }
}, 300);
</script>

<template>
  <div class="pb-24 md:pb-32">
    <div class="sticky px-6 md:px-14 pt-24 md:pt-28 top-0 relative z-1 flex items-center gap-2 md:gap-4 bg-gradient-to-b from-zinc-950 from-25% to-zinc-950/50 backdrop-blur-xs">
      <SearchIcon class="w-5 md:w-8 h-5 md:h-8 text-zinc-500" />
      <input
        ref="input"
        type="text"
        placeholder="Search by title, director, cast..."
        class="w-full py-2 md:py-6 text-lg md:text-[2rem] placeholder:text-zinc-500 text-white outline-none"
        @input="search"
      />
    </div>
    <div class="px-6 md:px-14 mt-6 grid grid-cols-6 gap-6 overflow-hidden">
      <NuxtLink
        v-if="result.length"
        v-for="movie in result"
        :key="movie.id"
        :to="`/movies/${movie.id}`"
        class="group hover:scale-105 transition-transform duration-200 shrink-0 aspect-[2/3] overflow-hidden"
        @click.prevent="() => selectItem(movie)"
      >
        <img
          v-if="movie.poster"
          :src="movie.poster"
          class="w-full h-full object-cover rounded-xl"
          :class="{ '[view-transition-name:movie-poster]': movieStore.currentMedia?.id === movie.id || selectedId === movie.id }" />
        <div v-else class="w-full h-full bg-zinc-800/50 rounded-xl"></div>
      </NuxtLink>
      <Carousel v-else title="Popular" :items="trending" />
    </div>
  </div>
</template>