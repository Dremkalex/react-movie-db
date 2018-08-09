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
import MyInstagramLoader from '../shared-ui/loader/instagram';
// styles
import styles from './styles.css';

class MovieInfoModal extends Component {
  state = {
    movie: {},
    isLoading: false,
    // error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    const { movieID } = this.props;

    fetchMovieInfo({
      id: movieID,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchError,
    });
  }

  handleFetchSuccess = movie => {
    this.setState({ movie, isLoading: false });
  };

  // handleFetchError = error => this.setState({ error });

  render() {
    const { movie, isLoading } = this.state;
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
        {isLoading && <MyInstagramLoader />}

        {movie.genres &&
          movie.production_companies && (
            <div className={styles.content}>
              <img src={bgImageUrl(movie.backdrop_path)} alt="Poster Img" />
              <h2>{movie.title}</h2>
              <p className={styles.tagline}>{movie.tagline}</p>
              <p className={styles.overview}>{movie.overview}</p>

              <h4 className={styles.title}>Genres</h4>
              <ul className={styles.genres}>
                {movie.genres.map(genre => (
                  <li key={genre.id} className={styles.genreItem}>
                    {genre.name}
                  </li>
                ))}
              </ul>
              <h4 className={styles.title}>Production Companies</h4>
              <ul className={styles.genres}>
                {movie.production_companies.map(company => (
                  <li key={company.id} className={styles.genreItem}>
                    {company.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
