import { type } from "os";
import { AlertType } from "./Enums";

interface iAlertStatus {
  show: boolean;
  type: AlertType;
  messages: (string | undefined)[];
}

interface iSliderCardData {
  imgSrc: string | " ";
  title: string;
  subtitle?: string | number;
}

interface iCard extends iSliderCardData {
  width:number;
}

interface apiResponse {
  page: number;
  totalPages: number;
  totalResults: number;
  total_results: number;
}

interface iMultiSearch {
  id: number;
  title: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;

}

interface iMultiSearchResponse extends apiResponse {
  results: iMultiSearch[];
}

export type {
  iAlertStatus,
  iMultiSearchResponse,
  apiResponse,
  iMultiSearch,
  iCard,
  iSliderCardData
};
