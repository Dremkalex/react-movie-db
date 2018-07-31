import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// servises
import fetchMoviesByCategory from '../../servises/api';

// components
import CategorySelector from '../category-selector';
import selectorOptions from '../../selector-options';

class App extends Component {
  state = {
    category: null,
    movies: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { category } = this.state;
    const { value } = category;

    if (!prevState.category) {
      fetchMoviesByCategory({
        category: value,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
      });
      return;
    }

    const prevValue = prevState.category.value;

    if (prevValue !== value) {
      fetchMoviesByCategory({
        category: value,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
      });
    }
  }

  changeCategory = category => this.setState({ category });

  handleFetchSuccess = movies => this.setState({ movies });

  handleFetchError = () => console.log('Error');

  render() {
    const { category, movies } = this.state;
    return (
      <div>
        <p>Hello</p>
        <CategorySelector
          value={category}
          onChange={this.changeCategory}
          options={selectorOptions}
          placeholder="Choose category..."
        />
        {movies.length > 0 && (
          <ul>
            {movies.map(({ id, title, overview }) => (
              <li key={id}>
                <h2>{title}</h2>
                <p>{overview}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default hot(module)(App);
