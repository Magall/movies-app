import axios from "axios";
import { setCredentials } from "./store/auth.slice";
import { store } from "./store";

const BEARER_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2JlYjY2ZTAwYzc1MWY0MTU1ODQ5YmUyZGQ2MzhhZiIsInN1YiI6IjYyYTBiYjcyN2Q1ZGI1MDg2YmYyNjE1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2R0fHZQZA5-nBguSQF9z4aXZorQHGJGI3JYEcYaZMos";

const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 5000,
  headers: {
    Authorization: BEARER_TOKEN,
    "Content-type": "application/json;charset=utf-8",
  },
});

client.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    //TODO handle errors by calling the alert
    if (error.status === 401) {
      store.dispatch(
        setCredentials({
          requestToken: "EXPIRED",
          requestTokenExpiresAt: "EXPIRED",
          sessionId: "EXPIRED",
        })
      );
    }
    return Promise.reject(error);
  }
);
export default client;
