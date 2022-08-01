import { useQuery } from "@tanstack/react-query";
import client from "../../client";
import { iAccountDetailsResponse } from "../../interfaces";

export function useGetAccountDetails(sessionId: string) {
  return useQuery(
    ["accountDetails"],
    (): Promise<iAccountDetailsResponse> =>
      client
        .get(`/account`, { params: { session_id: sessionId } })
        .then((res) => res.data)
  );
}
