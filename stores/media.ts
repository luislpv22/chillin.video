import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Media } from '~/types/media'

export const useMediaStore = defineStore('media', {
  state: () => ({
    currentMedia: null as null | Media,
    recentlyViewed: useLocalStorage<Media[]>('pinia/media/recent', []),
    watchList: useLocalStorage<Media[]>('pinia/media/watchlist', [])
  }),
  hydrate(state) {
    const recent = useLocalStorage<Media[]>('pinia/media/recent', []);
    const watchList = useLocalStorage<Media[]>('pinia/media/watchlist', []);
    state.recentlyViewed = recent.value;
    state.watchList = watchList.value;
  },
  actions: {
    setCurrentMovie(movie: Media) {
      this.currentMedia = movie
    },
    addToRecentlyViewed(movie: Media) {
      const index = this.recentlyViewed.findIndex(m => m.id === movie.id);
      if (index > -1) {
        this.recentlyViewed.splice(index, 1);
        this.recentlyViewed.unshift(movie);
        return;
      }

      this.recentlyViewed.unshift(movie);
      if (this.recentlyViewed.length > 8) {
        this.recentlyViewed.pop();
      }

      const storedRecent = useLocalStorage<Media[]>('pinia/media/recent', [] as Media[])
      storedRecent.value = [...this.recentlyViewed]
    },
    addToWatchList(movie: Media) {
      if (this.watchList.some(m => m.id === movie.id)) {
        return;
      }

      this.watchList.push(movie);

      const storedRecent = useLocalStorage<Media[]>('pinia/media/recent', [] as Media[])
      storedRecent.value = [...this.watchList]
    },
    isInWatchList(movie: Media) {
      return this.watchList.some(m => m.id === movie.id);
    },
    removeFromWatchList(movie: Media) {
      const index = this.watchList.findIndex(m => m.id === movie.id);
      if (index > -1) {
        this.watchList.splice(index, 1);
        const storedRecent = useLocalStorage<Media[]>('pinia/media/recent', [] as Media[])
        storedRecent.value = [...this.watchList]
      }
    }
  }
})