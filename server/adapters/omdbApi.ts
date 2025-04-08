import type { Media } from "~/types/media";
import type { MDBApi } from "../utils/mdbApi";

export class OMDBApi implements MDBApi {
  baseUrl = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}`;

  private featured = [{
    id: 'tt9603208',
    customPoster: 'https://m.media-amazon.com/images/M/MV5BZTcwNzVjNDctMDVkZi00NDU3LTkyZmItYzcxNjU4MTE2MDM3XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._CR476,153,1380,776_QL75_UY563_CR0,0,1000,563_.jpg',
  }];

  private trendingIds = [
    'tt6208148',
    'tt3566834',
    'tt2172954',
    'tt17526714',
    'tt0816692',
    'tt33305312',
    'tt28015403'
  ];

  findById = async (id: string) => {
    const response = await fetch(`${this.baseUrl}&i=${id}`);
    return response.json().then(adaptMedia);
  };

  findByTitle = async (title: string) => {
    const response = await fetch(`${this.baseUrl}&s=${title}`);
    return response.json().then(data => data.map(adaptMedia));
  };

  getFeatured = async () => {
    const res = await Promise.all(
      this.featured.map(async (item) => this.findById(item.id).then(data => {
        data.poster = item.customPoster;
        return data;
      }))
    );
    return res;
  };

  getTrending = async () => {
    const res = await Promise.all(
      this.trendingIds.map(async (id) => this.findById(id))
    );
    return res;
  };
}

function adaptMedia(media: Record<string, any>): Media {
  return {
    title: media['Title'],
    poster: media['Poster'],
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
