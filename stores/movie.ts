import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Media } from '~/types/media'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    currentMovie: null as null | Media,
    recentlyViewed: useLocalStorage<Media[]>('pinia/media/recent', [])
  }),
  hydrate(state) {
    const recent = useLocalStorage<Media[]>('pinia/media/recent', []);
    state.recentlyViewed = recent.value;
  },
  actions: {
    setCurrentMovie(movie: Media) {
      this.currentMovie = movie
    },
    addToRecentlyViewed(movie: Media) {
      if (this.recentlyViewed.some(m => m.id === movie.id)) {
        console.log('already added');
        return;
      }

      this.recentlyViewed.unshift(movie);
      if (this.recentlyViewed.length > 8) {
        this.recentlyViewed.pop();
      }

      const storedRecent = useLocalStorage<Media[]>('pinia/media/recent', [] as Media[])
      storedRecent.value = [...this.recentlyViewed]
    }
  }
})