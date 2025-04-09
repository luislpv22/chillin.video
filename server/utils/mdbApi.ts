import { OMDBApi } from "../adapters/omdbApi"
import type { Media, MediaType } from "~/types/media";

export type MDBApiRequestOptions = {
  type?: MediaType;
}
export interface MDBApi {
  baseUrl: string;
  findById: (id: string) => Promise<Media>;
  findByTitle: (title: string) => Promise<Media[]>;
  getFeatured: (options?: MDBApiRequestOptions) => Promise<Media[]>;
  getTrending: (options?: MDBApiRequestOptions) => Promise<Media[]>;
}

export const useMdbApi = (): MDBApi => {
  return new OMDBApi();
};