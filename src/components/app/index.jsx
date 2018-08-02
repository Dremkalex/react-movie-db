import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
// servises
import fetchMoviesByCategory from '../../servises/api';
// components
import CategorySelector from '../category-selector';
import MovieList from '../movie-list';
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

  shouldComponentUpdate(nextProps, nextState) {
    const { category } = this.state;
    if (!category) return true;

    const shouldUpdate = category.value !== nextState.category.value;
    return shouldUpdate;
  }

  componentDidUpdate(prevProps, prevState) {
    const { category } = this.state;
    // console.log('prevState.category: ', prevState.category);
    // console.log('this.state.category: ', category);
    // const { value } = category;

    if (!prevState.category) {
      fetchMoviesByCategory({
        category: category.value,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
      });
      console.log('aftermount category', category.value);
      return;
    }

    const prevValue = prevState.category.value;

    if (prevValue !== category.value) {
      fetchMoviesByCategory({
        category: category.value,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
      });
      console.log('this.state.category.value: ', category.value);
    }
  }

  changeCategory = category => this.setState({ category });

  handleFetchSuccess = movies => this.setState({ movies });

  handleFetchError = error => this.setState({ error });

  render() {
    console.log('render', Date.now());
    const { category, movies, error } = this.state;
    return (
      <div className={styles.wrapper}>
        <aside className={styles.aside}>
          <div className={styles.watchlist}>
            <h2>Watchlist</h2>
          </div>
        </aside>
        <main className={styles.main}>
          <CategorySelector
            value={category}
            onChange={this.changeCategory}
            options={selectorOptions}
            placeholder="Choose category..."
          />

          {movies.length > 0 && <MovieList movies={movies} />}

          {error && <p>{error.message}</p>}
        </main>
      </div>
    );
  }
}

export default hot(module)(App);
