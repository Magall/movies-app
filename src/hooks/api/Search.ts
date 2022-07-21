import client from "../../client";
import { useQuery } from "@tanstack/react-query";
import { iMultiSearchResponse } from "../../interfaces";

export function useGetMultiSearch(searchParam: string) {
  return useQuery(
    ["multiSearch", searchParam],
    (): Promise<iMultiSearchResponse> =>
      client
        .get("/search/multi", { params: { query: searchParam } })
        .then((resp) => resp.data),
    { enabled: searchParam.length > 2 }
  );
}

