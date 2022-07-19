import { DiscoverSortMovie, DiscoverSortTv } from "./Enums";
import { iSessionResponse } from "./interfaces";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w200/";
const RED = "#b10240";
const DARK_PURPLE = "#471f38";
const BLACK = "#282323";
const LIGHT = "#E2241";
const GOLD = "gold";

const EMPTY = {
  results: [],
  page: 0,
  total_results: 0,
  total_pages: 0,
};

const EMPTY_SESSION:iSessionResponse = {
  success: false,
  session_id: "",
};

const SORT_DISCOVER_MOVIES = [
  { text: "Popularity", value: DiscoverSortMovie.Popularity },
  { text: "Average", value: DiscoverSortMovie.Average },
  { text: "Revenue", value: DiscoverSortMovie.Revenue },
  { text: "Votes", value: DiscoverSortMovie.VoteCount },
  { text: "Release Date", value: DiscoverSortMovie.ReleaseDate },
];

const SORT_DISCOVER_TV = [
  { text: "Popularity", value: DiscoverSortTv.Popularity },
  { text: "Average", value: DiscoverSortTv.Average },
  { text: "Release Date", value: DiscoverSortTv.AirDate },
];
export {
  IMG_BASE_URL,
  RED,
  DARK_PURPLE,
  BLACK,
  GOLD,
  LIGHT,
  EMPTY,
  SORT_DISCOVER_TV,
  SORT_DISCOVER_MOVIES,
  EMPTY_SESSION,
};
