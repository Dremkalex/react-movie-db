import axios from 'axios';

const API_KEY = '624f7df45767c9a0ff7b6bf3107182d5';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMoviesByCategory = ({ category, onSuccess, onError }) => {
  const url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`;

  return axios
    .get(url)
    .then(response => response.data.results)
    .then(onSuccess)
    .catch(onError);
};

export const fetchMoviesByTitle = ({ title, onSuccess, onError }) => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${title}`;

  return axios
    .get(url)
    .then(response => response.data.results)
    .then(onSuccess)
    .catch(onError);
};

export const fetchMovieInfo = ({ id, onSuccess, onError }) => {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;

  return axios
    .get(url)
    .then(response => response.data)
    .then(onSuccess)
    .catch(onError);
};
