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
  };

  componentDidUpdate(prevProps, prevState) {
    const { category } = this.state;
    const { value } = category;

    if (!prevState.category) return;

    const prevValue = prevState.category.value;

    if (prevValue !== value) {
      fetchMoviesByCategory({
        category,
        onSuccess: this.handleFetchSuccess,
        onError: this.handleFetchError,
      });
    }
  }

  changeCategory = category => this.setState({ category });

  handleFetchSuccess = () => console.log('Success');

  handleFetchError = () => console.log('Error');

  render() {
    const { category } = this.state;
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
