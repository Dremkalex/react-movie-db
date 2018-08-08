import React from 'react';
import PropTypes from 'prop-types';
// components
import Movie from '../movie';
// servises
import {
  getShortOverview,
  getReleaseDate,
  imageUrl,
} from '../../servises/movie-list';
// styles
import styles from './styles.css';

const MovieList = ({ movies, onClickAdd, onClickInfo }) => (
  <ul className={styles.ul}>
    {movies.map(movie => (
      <li key={movie.id} className={styles.li}>
        <Movie
          url={imageUrl(movie.poster_path)}
          releaseDate={getReleaseDate(movie.release_date)}
          overview={getShortOverview(movie.overview)}
          average={movie.vote_average}
          onClickAdd={() => onClickAdd(movie)}
          onClickInfo={() => onClickInfo(movie.id)}
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
      poster_path: PropTypes.string,
    }).isRequired,
  ).isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickInfo: PropTypes.func.isRequired,
};

export default MovieList;
