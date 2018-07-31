import axios from 'axios';

const API_KEY = '624f7df45767c9a0ff7b6bf3107182d5';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMoviesByCategory = ({ category, onSuccess, onError }) => {
  const url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`;

  return axios
    .get(url)
    .then(response => response.data.results)
    .then(onSuccess)
    .catch(onError);
};

export { fetchMoviesByCategory as default };
