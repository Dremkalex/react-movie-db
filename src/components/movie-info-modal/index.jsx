// core
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
// servises
import { fetchMovieInfo } from '../../servises/api';
import { bgImageUrl } from '../../servises/movie-list';
// components
import Button from '../shared-ui/button';
import Icon from '../icon';
import ICONS from '../icon/icons';
// styles
import styles from './styles.css';

class MovieInfoModal extends Component {
  state = {
    movie: {},
    // error: null,
  };

  componentDidMount() {
    const { movieID } = this.props;

    fetchMovieInfo({
      id: movieID,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchError,
    });
  }

  handleFetchSuccess = movie => {
    this.setState({ movie });
  };

  // handleFetchError = error => this.setState({ error });

  render() {
    const { movie } = this.state;
    const { showModal, onClose } = this.props;

    return (
      <ReactModal
        className={styles.modal}
        overlayClassName={styles.overlay}
        isOpen={showModal}
        contentLabel="Movie info"
        onRequestClose={() => onClose()}
        shouldCloseOnOverlayClick
      >
        <div className={styles.content}>
          <img src={bgImageUrl(movie.backdrop_path)} alt="Poster Img" />
          <h2>{movie.title}</h2>
          <p className={styles.tagline}>{movie.tagline}</p>
          <p className={styles.overview}>{movie.overview}</p>
          <h4 className={styles.title}>Genres</h4>

          {/* <ul className={styles.genres}>
            {movie.genres.map(genre => (
              <li key={genre.id} className={styles.genreItem}>
                {genre.name}
              </li>
            ))}
          </ul> */}
        </div>
        <Button onClick={() => onClose()} btnModal>
          <Icon icon={ICONS.CANCEL} />
        </Button>
      </ReactModal>
    );
  }
}

MovieInfoModal.propTypes = {
  movieID: PropTypes.number.isRequired,
  showModal: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieInfoModal;
