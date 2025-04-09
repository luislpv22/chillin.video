import { useMdbApi } from "~/server/utils/mdbApi";
import { MediaType } from "~/types/media";

const mdbApi = useMdbApi();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return mdbApi.getTrending({
    type: query.type as MediaType
  });
});