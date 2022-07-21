import client from "../../client";
import { useQuery } from "@tanstack/react-query";
import { iMultiSearchResponse } from "../../interfaces";

export function useGetUpCommingMovies(page: number = 1) {
  return useQuery(
    ["upComming"],
    (): Promise<iMultiSearchResponse> =>
      client
        .get("/movie/upcoming", { params: { page } })
        .then((resp) => resp.data)
  );
}
