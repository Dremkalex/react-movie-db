import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './styles.css';

const Movie = ({ url, releaseDate, overview }) => (
  <div className={styles.movie}>
    <img src={url} alt="Poster Img" />
    <p>Release date: {releaseDate}</p>
    <p>{overview}</p>
  </div>
);

Movie.propTypes = {
  url: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
};

export default Movie;
