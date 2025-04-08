import { useMdbApi } from "~/server/utils/mdbApi";

const mdbApi = useMdbApi();

export default defineEventHandler(async (event) => {
  if (!event.context?.params?.id) {
    return;
  }
  return mdbApi.findById(event.context.params.id);
});
