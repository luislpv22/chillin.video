<script setup lang="ts">
import type { Media } from '~/types/media';

const route = useRoute();
const movieStore = useMediaStore();
let movie: Media;

if (movieStore.currentMedia?.id === route.params.id) {
  movie = movieStore.currentMedia;
} else {
  movie = await $fetch(`/api/movies/${route.params.id}`);
}

movieStore.addToRecentlyViewed(movie);

const toggleWatchList = () => {
  if (movieStore.isInWatchList(movie)) {
    movieStore.removeFromWatchList(movie);
  } else {
    movieStore.addToWatchList(movie);
  }
};
</script>

<template>
  <div class="absolute inset-0 h-screen w-full after:absolute after:inset-0 after:bg-gradient-to-t after:from-25% after:from-zinc-950">
    <img :src="movie.poster" class="h-full w-full object-cover mb-12 opacity-20" />
  </div>
  <div class="relative flex justify-center gap-12 px-14 pt-32">
    <div class="h-[50rem] aspect-[2/3]">
      <img :src="movie.poster" class="h-full object-cover rounded-xl [view-transition-name:movie-poster]" />
    </div>
    <div class="flex flex-col justify-center">
      <div class="flex items-center gap-5">
        <h1 class="text-[4rem] leading-tight">{{ movie.title }}</h1>
        <Badge class="mt-3 text-sm">{{ movie.rated }}</Badge>
      </div>
      <h2 v-if="movie.subtitle" class="text-[2rem] leading-tight mb-3">{{ movie.subtitle }}</h2>
      <div class="flex items-center gap-2 text-zinc-300 mb-6">
        <div class="px-1 rounded-sm border border-current font-medium text-sm ml-1">HD</div>
        <p>{{ movie.genre }}</p>
        <span>·</span>
        <p>{{ movie.duration }}</p>
        <span>·</span>
        <p>{{ movie.year }}</p>
      </div>
      <p class="text-zinc-300 font-light text-lg max-w-2xl mb-4">{{ movie.plot }}</p>
      <dl class="text-zinc-400">
        <dt class="text-zinc-500">Director</dt>
        <dd class="mb-1">{{ movie.director }}</dd>
        <dt class="text-zinc-500">Writer</dt>
        <dd class="mb-1">{{ movie.writer }}</dd>
        <dt class="text-zinc-500">Cast</dt> 
        <dd>{{ movie.cast }}</dd>
      </dl>
      <div class="flex items-center gap-2 my-10">
        <Button>
          <PlayIcon class="w-6 h-6 -ml-2" />
          Watch Now
        </Button>
        <Button variant="secondary" @click="toggleWatchList">
          <HeartFillIcon v-if="movieStore.isInWatchList(movie)" class="w-6 h-6 -ml-2" />
          <HeartLineIcon v-else class="w-6 h-6 -ml-2" />
          Watchlist
        </Button>
      </div>
    </div>
  </div>
</template>