const axios = require("axios").default;
import * as Constants from "../constants";

const TMDB_HTTP_REQUEST = axios.create({
  baseURL: Constants.URLS.TMDB_BASE_URL,
  params: {
    api_key: Constants.URLS.TMDB_API_KEY,
  },
});

const getNowPlayingMovies = () =>
  TMDB_HTTP_REQUEST.get(Constants.URLS.ENDPOINTS.NOW_PLAYING_MOVIES);

const getUpcomingMovies = () =>
  TMDB_HTTP_REQUEST.get(Constants.URLS.ENDPOINTS.UPCOMING_MOVIES);

const getMovieById = (movieId: number, append_to_response = "") =>
  TMDB_HTTP_REQUEST.get(
    `${Constants.URLS.ENDPOINTS.MOVIE}/${movieId}`,
    append_to_response ? { params: { append_to_response } } : null
  );

const getAllGenres = () =>
  TMDB_HTTP_REQUEST.get(Constants.URLS.ENDPOINTS.GENRES);

const getPoster = (path: string) =>
  `${Constants.URLS.TMDB_IMAGE_BASE_URL}/original${path}`;

const getVideo = (key: string) => `${Constants.URLS.YOUTUBE_BASE_URL}?v=${key}`;

const getLanguage = (language_iso: string) =>
  Constants.Languages.find((language) => language.iso_639_1 === language_iso);

export {
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
  getMovieById,
  getPoster,
  getLanguage,
  getVideo,
};
