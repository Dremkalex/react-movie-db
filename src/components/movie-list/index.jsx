import React from 'react';
import PropTypes from 'prop-types';
// components
import Movie from '../movie';
// servises
import {
  getShortOverview,
  getReleaseDate,
  IMG_URL,
} from '../../servises/movie-list';
// styles
import styles from './styles.css';

const MovieList = ({ movies }) => (
  <ul className={styles.ul}>
    {movies.map(movie => (
      <li key={movie.id} className={styles.li}>
        <Movie
          url={IMG_URL + movie.poster_path}
          releaseDate={getReleaseDate(movie.release_date)}
          overview={getShortOverview(movie.overview)}
        />
      </li>
    ))}
  </ul>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default MovieList;
