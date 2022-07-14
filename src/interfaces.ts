import { type } from "os";
import {
  AlertType,
  DiscoverSortMovie,
  DiscoverSortTv,
  MediaType,
} from "./Enums";

interface iAlertStatus {
  show: boolean;
  type: AlertType;
  messages: (string | undefined)[];
}

interface iSliderCardData {
  imgSrc: string | " " | undefined;
  title: string | undefined;
  subtitle?: string | number | undefined;
}

interface iCard extends iSliderCardData {
  width: number;
}

interface apiResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

interface iMultiSearch {
  id: number;
  title?: string;
  vote_average?: number;
  vote_count?: number;
  poster_path?: string;
  backdrop_path?: string;
  popularity?: number;
  name?: string;
  release_date?: Date;
  first_air_date?: Date;
}

interface iMultiSearchResponse extends apiResponse {
  results: iMultiSearch[];
}

interface iTrendingRequest {
  mediaType: string;
  timeWindow: string;
  page?: number;
}

interface iDiscoverRequest {
  sort_by: DiscoverSortMovie | DiscoverSortTv;
  page?: number;
  media_type: MediaType;
}

interface iRequestTokenResponse {
  success:boolean;
  expires_at:string;
  request_token:string;
}

interface iSessionResponse {
  success:boolean;
  session_id:string;
}

interface iLogin {
  username:string;
  password:string;
  requestToken:string;
}
export type {
  iAlertStatus,
  iMultiSearchResponse,
  apiResponse,
  iMultiSearch,
  iCard,
  iSliderCardData,
  iTrendingRequest,
  iDiscoverRequest,
  iRequestTokenResponse,
  iSessionResponse,
  iLogin
};
