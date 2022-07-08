import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  iDiscoverRequestMovie,
  iDiscoverRequestTv,
  iMultiSearchResponse,
  iTrendingRequest,
} from "../interfaces";

const MOVIES_API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2JlYjY2ZTAwYzc1MWY0MTU1ODQ5YmUyZGQ2MzhhZiIsInN1YiI6IjYyYTBiYjcyN2Q1ZGI1MDg2YmYyNjE1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2R0fHZQZA5-nBguSQF9z4aXZorQHGJGI3JYEcYaZMos";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders(headers) {
      headers.set("Authorization", MOVIES_API_KEY);
      headers.set("Content-type", "application/json;charset=utf-8");
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchMovies: builder.query<iMultiSearchResponse, string | void>({
        query(search = "matrix") {
          return `/search/multi?query=${search}`;
        },
      }),

      fetchUpcomingMovies: builder.query<iMultiSearchResponse, number | void>({
        query(page = 1) {
          return `/movie/upcoming?page=${page}`;
        },
      }),

      fetchTrending: builder.query<iMultiSearchResponse, iTrendingRequest>({
        query({ mediaType = "week", timeWindow, page = 1 }) {
          return `/trending/${mediaType}/${timeWindow}?page=${page}`;
        },
      }),

      fetchDiscoverMovie: builder.query<
        iMultiSearchResponse,
        iDiscoverRequestMovie
      >({
        query(args) {
          console.log(args);
          return `/discover/movie?sort_by=${args.sort_by}`;
        },
      }),

      fetchDiscoverTv: builder.query<iMultiSearchResponse, iDiscoverRequestTv>({
        query(sort_by) {
          return `/discover/tv?sort_by=${sort_by}`;
        },
      }),
    };
  },
});

export const {
  useFetchMoviesQuery,
  useFetchUpcomingMoviesQuery,
  useFetchTrendingQuery,
  useFetchDiscoverMovieQuery,
  useFetchDiscoverTvQuery,
  useLazyFetchMoviesQuery,
} = apiSlice;
