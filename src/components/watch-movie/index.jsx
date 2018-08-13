import React from 'react';
import PropTypes from 'prop-types';
// servises
import { getReleaseDate, imageUrl } from '../../servises/movie-list';
// components
import Panel from '../shared-ui/panel';
import Button from '../shared-ui/button';
import Icon from '../icon';
import ICONS from '../icon/icons';
// styles
import styles from './styles.css';

const WatchMovie = ({ movie, onClickRemove, onClickInfo }) => (
  <Panel watchListItem>
    <img
      src={imageUrl(movie.poster_path)}
      className={styles.img}
      alt="Poster Img"
    />
    <div className={styles.info}>
      <h3>{movie.title}</h3>
      <p>Released: {getReleaseDate(movie.release_date)}</p>
      <p>Rating: {movie.vote_average}</p>
      <div className={styles.buttonBox}>
        <Button onClick={onClickRemove}>
          <Icon icon={ICONS.BIN} />
        </Button>
        <Button onClick={onClickInfo}>
          <Icon icon={ICONS.INFO} />
        </Button>
      </div>
    </div>
  </Panel>
);

WatchMovie.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
  }).isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onClickInfo: PropTypes.func.isRequired,
};

export default WatchMovie;
