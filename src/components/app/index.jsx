import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
// servises
import { fetchMoviesByCategory, fetchMoviesByTitle } from '../../servises/api';

// components
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
    title: '',
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { category } = this.state;
  //   if (!category) return true;

  //   const shouldUpdate = category.value !== nextState.category.value;
  //   return shouldUpdate;
  // }

  componentDidUpdate(prevProps, prevState) {
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

  changeTitle = ({ target }) => {
    this.setState({ title: target.value });
  };

  submitTitle = evt => {
    evt.preventDefault();
    const { title } = this.state;
    fetchMoviesByTitle({
      title,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchError,
    });

    this.setState({
      title: '',
    });
  };

  handleFetchSuccess = movies => this.setState({ movies });

  handleFetchError = error => this.setState({ error });

  render() {
    // console.log('render', Date.now());
    const { category, movies, error, title } = this.state;
    return (
      <div className={styles.wrapper}>
        <aside className={styles.aside}>
          <div className={styles.watchlist}>
            <h2>Watchlist</h2>
          </div>
        </aside>
        <main className={styles.main}>
          <Panel searhPanel>
            <CategorySelector
              value={category}
              onChange={this.changeCategory}
              options={selectorOptions}
              placeholder="Choose category..."
            />
            <TitleSearch
              value={title}
              onChange={this.changeTitle}
              onSubmit={this.submitTitle}
            />
          </Panel>

          {movies.length > 0 && <MovieList movies={movies} />}

          {error && <p>{error.message}</p>}
        </main>
      </div>
    );
  }
}

export default hot(module)(App);
