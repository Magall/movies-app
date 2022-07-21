import client from "../../client";
import { useQuery } from "@tanstack/react-query";
import { iDiscoverRequest, iMultiSearchResponse } from "../../interfaces";
import { MediaType } from "../../Enums";

export function useGetDiscover(discoverParams: iDiscoverRequest) {
  return useQuery(
    [
      "upComming",
      discoverParams.media_type,
      discoverParams.page,
      discoverParams.sort_by,
    ],
    (): Promise<iMultiSearchResponse> => {
      if (discoverParams.media_type === MediaType.Movies) {
        return client
          .get("/discover/movie", {
            params: {
              sort_by: discoverParams.sort_by,
              page: discoverParams.page,
            },
          })
          .then((resp) => resp.data);
      } else {
        return client
          .get("/discover/tv", {
            params: {
              sort_by: discoverParams.sort_by,
              page: discoverParams.page,
            },
          })
          .then((resp) => resp.data);
      }
    }
  );
}
