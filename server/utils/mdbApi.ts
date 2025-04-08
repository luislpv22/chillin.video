import { OMDBApi } from "../adapters/omdbApi"
import type { Media } from "~/types/media";

export interface MDBApi {
  baseUrl: string,
  findById: (id: string) => Promise<Media>,
  findByTitle: (title: string) => Promise<Media[]>,
  getFeatured: () => Promise<Media[]>,
  getTrending: () => Promise<Media[]>,
}

export const useMdbApi = (): MDBApi => {
  return new OMDBApi();
};