import { DiscoverSortMovie, DiscoverSortTv } from "./Enums";
import { iLogin, iSessionResponse } from "./interfaces";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w300/";
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

const EMPTY_LOGIN: iLogin ={
  username:'',
  password:'',
  requestToken:''
}

const SORT_DISCOVER_MOVIES = [
  { text: "Popularity", value: DiscoverSortMovie.Popularity },
  { text: "Average", value: DiscoverSortMovie.Average },
  { text: "Revenue", value: DiscoverSortMovie.Revenue },
  { text: "Votes", value: DiscoverSortMovie.VoteCount },
];

const SORT_DISCOVER_TV = [
  { text: "Popularity", value: DiscoverSortTv.Popularity },
  { text: "Average", value: DiscoverSortTv.Average },
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
  EMPTY_LOGIN
};
