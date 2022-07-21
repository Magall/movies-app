import axios from "axios";

const BEARER_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2JlYjY2ZTAwYzc1MWY0MTU1ODQ5YmUyZGQ2MzhhZiIsInN1YiI6IjYyYTBiYjcyN2Q1ZGI1MDg2YmYyNjE1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2R0fHZQZA5-nBguSQF9z4aXZorQHGJGI3JYEcYaZMos";
const V3_API_KEY = "33beb66e00c751f4155849be2dd638af";

const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 5000,
  headers: {
    Authorization: BEARER_TOKEN,
    'Content-type': "application/json;charset=utf-8",
  },
});

// client.interceptors.response.use(function (error) {
//     console.log(error);
//     return Promise.reject(error);

// })
export default client;