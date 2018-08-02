import React from 'react';
import PropTypes from 'prop-types';
// components
import ICONS from '../icon/icons';
import Button from '../shared-ui/button';
import Icon from '../icon';
// styles
import styles from './styles.css';

const Movie = ({ url, releaseDate, overview }) => (
  <div className={styles.movie}>
    <div className={styles.buttonBox}>
      <Button>
        <Icon icon={ICONS.HEART} />
      </Button>
      <Button>
        <Icon icon={ICONS.INFO} />
      </Button>
    </div>

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
