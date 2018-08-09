import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
// servises
import { fetchMoviesByCategory, fetchMoviesByTitle } from '../../servises/api';

// components
import Watchlist from '../watchlist';
import CategorySelector from '../category-selector';
import TitleSearch from '../title-search';
import MyBulletListLoader from '../shared-ui/loader/bulletlist';
import ErrorNotification from '../shared-ui/error-notification';
import MovieList from '../movie-list';
import Panel from '../shared-ui/panel';
import MovieInfoModal from '../movie-info-modal';

// options
import selectorOptions from '../../selector-options';
// styles
import styles from './styles.css';

class App extends Component {
  state = {
    category: null,
    movies: [],
    isLoading: false,
    error: null,
    watchlist: [],
    movieID: null,
    showModal: false,
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { category } = this.state;
  //   if (!category) return true;

  //   const shouldUpdate = category.value !== nextState.category.value;
  //   return shouldUpdate;
  // }
  componentDidMount() {
    const watchlist = localStorage.getItem('watchlist');
    if (watchlist) {
      this.setState({ watchlist: JSON.parse(watchlist) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { watchlist } = this.state;
    localStorage.setItem('watchlist', JSON.stringify(watchlist));

    const { category } = this.state;

    if (!prevState.category && !category) return;

    if (!prevState.category) {
      this.handleFetch();
      fetchMoviesByCategory({
        category: category.value,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
      });

      return;
    }

    const prevCategory = prevState.category;

    if (prevCategory.value !== category.value) {
      this.handleFetch();
      fetchMoviesByCategory({
        category: category.value,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
      });
    }
  }

  // changeFilter = ({ target }) => {
  //   this.setState({ filter: target.value });
  // };

  handleOpenModal = movieID => {
    this.setState({ movieID, showModal: true });
  };

  handleCloseModal = () => this.setState({ movieID: null, showModal: false });

  addWatchList = movie => {
    const { watchlist } = this.state;
    const { id } = movie;

    const isMovieInWatchlist = watchlist.find(item => item.id === id);
    if (isMovieInWatchlist) return;

    this.setState(prevState => ({
      watchlist: [movie, ...prevState.watchlist],
    }));

    // localStorage.setItem('watchlist', JSON.stringify(watchlist));
  };

  removeWatchlist = movie => {
    const { watchlist } = this.state;
    const { id } = movie;

    const newWatchList = watchlist.filter(item => item.id !== id);

    // localStorage.setItem('watchlist', JSON.stringify(newWatchList));

    this.setState(
      {
        watchlist: newWatchList,
      },
      () => localStorage.setItem('watchlist', JSON.stringify(newWatchList)),
    );
  };

  handleFetchSuccess = movies => this.setState({ movies, isLoading: false });

  handleFetchError = error => this.setState({ error, isLoading: false });

  handleFetch = () => {
    this.setState({ isLoading: true, error: null });
  };

  searchByTitle = value => {
    fetchMoviesByTitle({
      title: value,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchError,
    });
  };

  changeCategory = category => this.setState({ category });

  render() {
    const {
      category,
      movies,
      isLoading,
      error,
      watchlist,
      movieID,
      showModal,
    } = this.state;
    return (
      <div className={styles.wrapper}>
        {showModal && (
          <MovieInfoModal
            movieID={movieID}
            showModal={showModal}
            onClose={this.handleCloseModal}
          />
        )}
        <aside className={styles.aside}>
          <Watchlist
            watchlist={watchlist}
            onClickRemove={this.removeWatchlist}
            onClickInfo={this.handleOpenModal}
          />
        </aside>
        <main className={styles.main}>
          <Panel searhPanel>
            <CategorySelector
              value={category}
              onChange={this.changeCategory}
              options={selectorOptions}
              placeholder="Choose category..."
            />
            <TitleSearch onSubmit={this.searchByTitle} />
          </Panel>

          {error && <ErrorNotification message={error.message} />}

          {isLoading && <MyBulletListLoader />}

          {movies.length > 0 && (
            <MovieList
              movies={movies}
              onClickAdd={this.addWatchList}
              onClickInfo={this.handleOpenModal}
            />
          )}
        </main>
      </div>
    );
  }
}

export default hot(module)(App);
