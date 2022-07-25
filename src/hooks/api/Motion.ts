import client from "../../client";
import { useQuery } from "@tanstack/react-query";
import {
  iMotionRequest,
  iMotionCreditsResponse,
  iMotionDetailsResponse,
  iMultiSearchResponse,
} from "../../interfaces";

export function useGetMotionDetails(motionParams: iMotionRequest) {
  return useQuery(
    ["detail", motionParams.mediaType, motionParams.motionId],
    (): Promise<iMotionDetailsResponse> =>
      client
        .get(`/${motionParams.mediaType}/${motionParams.motionId}`)
        .then((res) => res.data)
  );
}
export function useGetMotionCredits(motionParams: iMotionRequest) {
  return useQuery(
    ["credit", motionParams.mediaType, motionParams.motionId],
    (): Promise<iMotionCreditsResponse> =>
      client
        .get(`/${motionParams.mediaType}/${motionParams.motionId}/credits`)
        .then((res) => res.data)
  );
}

export function useGetMotionRecomendations(motionParams: iMotionRequest) {
  return useQuery(
    ["recommendations", motionParams.mediaType, motionParams.motionId],
    (): Promise<iMultiSearchResponse> =>
      client
        .get(
          `/${motionParams.mediaType}/${motionParams.motionId}/recommendations`
        )
        .then((res) => res.data)
  );
}
