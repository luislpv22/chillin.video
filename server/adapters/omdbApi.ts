import { useRecommendationsStore } from "~/stores/recommendations";
import type { Media } from "~/types/media";
import type { MDBApi, MDBApiRequestOptions } from "../utils/mdbApi";

const { featured, trending } = useRecommendationsStore();

export class OMDBApi implements MDBApi {
  baseUrl = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;

  findById = async (id: string) => {
    const response = await fetch(`${this.baseUrl}&i=${id}`);
    return response.json().then(adaptMedia);
  };

  findByTitle = async (title: string) => {
    const response = await fetch(`${this.baseUrl}&s=${title}`);
    return response.json().then(data => data['Search'].map(adaptMedia));
  };

  getFeatured = async (options: MDBApiRequestOptions = {}) => {
    const res = await Promise.all(
      featured.filter(item => 
        options.type && item.type === options.type || !options.type
      )
      .map(async (item) => {
        return this.findById(item.id).then(data => {
          data.poster = item.customPoster;
          return data;
        });
      }));
    return res;
  };

  getTrending = async (options: MDBApiRequestOptions = {}) => {
    const res = await Promise.all(
      trending.filter(item => 
        options.type && item.type === options.type || !options.type
      )
      .map(async (item) => this.findById(item.id)));
    return res;
  };
}

function adaptMedia(media: Record<string, any>): Media {
  const splitTitle = media['Title'].split(' - ');
  return {
    id: media['imdbID'],
    type: media['Type'],
    title: splitTitle[0],
    subtitle: splitTitle[1] ?? null,
    poster: media['Poster'] === 'N/A' ? null : media['Poster'],
    year: media['Year'],
    rated: media['Rated'],
    genre: media['Genre'],
    duration: media['Runtime'],
    director: media['Director'],
    writer: media['Writer'],
    cast: media['Actors'],
    plot: media['Plot'],
  };
}
