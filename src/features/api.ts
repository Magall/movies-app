import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MediaType } from "../Enums";
import {
  iDiscoverRequest,
  iLogin,
  iMultiSearchResponse,
  iRequestTokenResponse,
  iSessionResponse,
  iTrendingRequest,
} from "../interfaces";

const MOVIES_BEARER_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2JlYjY2ZTAwYzc1MWY0MTU1ODQ5YmUyZGQ2MzhhZiIsInN1YiI6IjYyYTBiYjcyN2Q1ZGI1MDg2YmYyNjE1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2R0fHZQZA5-nBguSQF9z4aXZorQHGJGI3JYEcYaZMos";
const MOVIES_V3_API_KEY = "33beb66e00c751f4155849be2dd638af";
let sessionId = "";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders(headers) {
      headers.set("Authorization", MOVIES_BEARER_TOKEN);
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

      fetchDiscovery: builder.query<iMultiSearchResponse, iDiscoverRequest>({
        query(args) {
          if (args.media_type === MediaType.Movies) {
            return `/discover/movie?sort_by=${args.sort_by}&page=${args.page}`;
          }
          if (args.media_type === MediaType.TV) {
            return `/discover/tv?sort_by=${args.sort_by}&page=${args.page}`;
          }
          return "ERROR";
        },
      }),

      fetchRequestToken: builder.query<any, void>({
        query() {
          return `/authentication/token/new?api_key=${MOVIES_V3_API_KEY}`;
        },
      }),

      createUserSession: builder.mutation<any, iLogin>({
        query(arg: iLogin) {
          return {
            url: `/authentication/token/validate_with_login?api_key=${MOVIES_V3_API_KEY}`,
            method: "POST",
            body: {
              username: arg.username,
              password: arg.password,
              request_token: arg.requestToken,
            },
          };
        },
      }),
    };
  },
});

export const {
  useFetchMoviesQuery,
  useFetchUpcomingMoviesQuery,
  useFetchTrendingQuery,
  useLazyFetchMoviesQuery,
  useFetchDiscoveryQuery,
  useFetchRequestTokenQuery,
  useCreateUserSessionMutation,
} = api;
