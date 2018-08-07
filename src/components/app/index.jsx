import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
// servises
import { fetchMoviesByCategory, fetchMoviesByTitle } from '../../servises/api';

// components
import Watchlist from '../watchlist';
import CategorySelector from '../category-selector';
import TitleSearch from '../title-search';
import MovieList from '../movie-list';
import Panel from '../shared-ui/panel';
// options
import selectorOptions from '../../selector-options';
// styles
import styles from './styles.css';

class App extends Component {
  state = {
    category: null,
    movies: [],
    error: null,
    watchlist: [],
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
      fetchMoviesByCategory({
        category: category.value,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
      });

      return;
    }

    const prevCategory = prevState.category;

    if (prevCategory.value !== category.value) {
      fetchMoviesByCategory({
        category: category.value,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
      });
    }
  }

  changeCategory = category => this.setState({ category });

  // changeFilter = ({ target }) => {
  //   this.setState({ filter: target.value });
  // };

  searchByTitle = value => {
    fetchMoviesByTitle({
      title: value,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchError,
    });
  };

  handleFetchSuccess = movies => this.setState({ movies });

  handleFetchError = error => this.setState({ error });

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

    localStorage.setItem('watchlist', JSON.stringify(newWatchList));

    this.setState({
      watchlist: newWatchList,
    });
  };

  render() {
    const { category, movies, error, watchlist } = this.state;
    return (
      <div className={styles.wrapper}>
        <aside className={styles.aside}>
          <Watchlist
            watchlist={watchlist}
            onClickRemove={this.removeWatchlist}
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

          {movies.length > 0 && (
            <MovieList movies={movies} onClickAdd={this.addWatchList} />
          )}

          {error && <p>{error.message}</p>}
        </main>
      </div>
    );
  }
}

export default hot(module)(App);
