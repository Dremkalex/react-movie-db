import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './styles.css';

const SearchBar = ({ onChange, filter }) => (
  <div>
    <label htmlFor className={styles.label}>
      Search by title
      <input
        className={styles.input}
        value={filter}
        onChange={onChange}
        type="text"
      />
    </label>
  </div>
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default SearchBar;
