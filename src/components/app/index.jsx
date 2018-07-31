import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// servises
import { fetchMoviesByCategory } from '../../servises/api';

// components
import CategorySelector from '../category-selector';
import selectorOptions from '../../selector-options.js';

class App extends Component {
  state = {
    movies: [],
    category: null,
    isLoading: false,
    error: null,
  };

  changeCategory = category => this.setState({ category });

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.category) return;
    const prevCategory = prevState.category.value;
    const nextCategory = this.state.category.value;

    if (prevCategory !== nextCategory) {
      console.log('need to fetch');
      fetchMoviesByCategory({
        category: nextCategory,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
      });
    }
  }

  handleFetchSuccess = () => console.log('Success');
  handleFetchError = () => console.log('Error');

  render() {
    const { movies, category, isLoading, error } = this.state;
    return (
      <div>
        <p>Hello</p>
        <CategorySelector
          value={category}
          onChange={this.changeCategory}
          options={selectorOptions}
          placeholder="Choose category..."
        />
      </div>
    );
  }
}

export default hot(module)(App);
