import { defineStore } from 'pinia'
import type { Media } from '~/types/media'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    currentMovie: null as null | Media
  }),
  actions: {
    setCurrentMovie(movie: Media) {
      this.currentMovie = movie
    }
  }
})