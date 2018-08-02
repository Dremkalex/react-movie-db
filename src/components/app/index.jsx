import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
// servises
import fetchMoviesByCategory from '../../servises/api';
// components
import CategorySelector from '../category-selector';
import MovieList from '../movie-list';
import SearchBar from '../search-bar';
// options
import selectorOptions from '../../selector-options';
// styles
import styles from './styles.css';

class App extends Component {
  state = {
    category: null,
    movies: [],
    error: null,
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { category } = this.state;
  //   if (!category) return true;

  //   const shouldUpdate = category.value !== nextState.category.value;
  //   return shouldUpdate;
  // }

  componentDidUpdate(prevProps, prevState) {
    const { category } = this.state;
    // const { value } = category;

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

  handleFetchSuccess = movies => this.setState({ movies });

  handleFetchError = error => this.setState({ error });

  render() {
    const { category, movies, error } = this.state;
    return (
      <div className={styles.wrapper}>
        <aside className={styles.aside}>
          <div className={styles.watchlist}>
            <h2>Watchlist</h2>
          </div>
        </aside>
        <main className={styles.main}>
          <div className={styles.searhPanel}>
            <div className={styles.searchForm}>
              <CategorySelector
                value={category}
                onChange={this.changeCategory}
                options={selectorOptions}
                placeholder="Choose category..."
              />
            </div>
            <div className={styles.searchForm}>
              <SearchBar />
            </div>
          </div>

          {movies.length > 0 && <MovieList movies={movies} />}

          {error && <p>{error.message}</p>}
        </main>
      </div>
    );
  }
}

export default hot(module)(App);
