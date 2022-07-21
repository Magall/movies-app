import client from "../../client";
import { useQuery } from "@tanstack/react-query";
import { iMultiSearchResponse, iTrendingRequest } from "../../interfaces";

export function useGetTrending(trendingParams: iTrendingRequest) {
  return useQuery(
    ["trending",trendingParams.mediaType,trendingParams.page],
    (): Promise<iMultiSearchResponse> =>
      client
        .get(
          `/trending/${trendingParams.mediaType}/${trendingParams.timeWindow}`,
          { params: { page: trendingParams.page } }
        )
        .then((resp) => resp.data)
  );
}
