import client from "../../client";
import { useQuery, useMutation, QueryCache } from "@tanstack/react-query";
import {
  iLogin,
  iRequestTokenResponse,
  iSessionResponse,
} from "../../interfaces";

const MOVIES_V3_API_KEY = "33beb66e00c751f4155849be2dd638af";

export function useGetRequestToken() {
  return useQuery(
    ["requestToken"],
    (): Promise<iRequestTokenResponse> =>
      client
        .get("/authentication/token/new", {
          params: { api_key: MOVIES_V3_API_KEY },
        })
        .then((res) => res.data)
  );
}

export function useValidateRequestToken() {
  return useMutation(
    (validateParams: iLogin): Promise<iRequestTokenResponse> =>
      client
        .post(
          `/authentication/token/validate_with_login?api_key=${MOVIES_V3_API_KEY}`,
          {
            username: validateParams.username,
            password: validateParams.password,
            request_token: validateParams.requestToken,
          }
        )
        .then((res) => res.data)
  );
}

export function useCreateUserSession() {
  return useMutation(
    (requestToken: string): Promise<iSessionResponse> =>
      client
        .post(`/authentication/session/new?api_key=${MOVIES_V3_API_KEY}`, {
          request_token: requestToken,
        })
        .then((res) => res.data)
  );
}
