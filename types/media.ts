export type MediaType = 'movie' | 'series';

export type Media = {
  id: string;
  type: MediaType;
  title: string;
  poster: string;
  year: string;
  rated: string;
  genre: string;
  duration: string;
  director: string;
  writer: string;
  cast: string;
  plot: string;
}