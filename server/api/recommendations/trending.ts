import { useMdbApi } from "~/server/utils/mdbApi";

const mdbApi = useMdbApi();

export default defineEventHandler(async () => {
  return mdbApi.getTrending();
});