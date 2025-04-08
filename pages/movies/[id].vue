<script setup lang="ts">
import { useMovieStore } from '@/stores/movie';
import type { Media } from '~/types/media';

const route = useRoute();
const movieStore = useMovieStore();
let movie: Media;

if (movieStore.currentMovie?.id === route.params.id) {
  movie = movieStore.currentMovie;
} else {
  movie = await $fetch(`/api/movies/${route.params.id}`);
}

movieStore.addToRecentlyViewed(movie);
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
          <svg class="w-6 h-6 -ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path></svg>
          Watch Now
        </Button>
        <Button variant="secondary">
          <svg class="w-6 h-6 -ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path></svg>
          Watchlist
        </Button>
      </div>
    </div>
  </div>
</template>