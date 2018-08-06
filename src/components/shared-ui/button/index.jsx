import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './styles.css';

const Button = ({ active, onClick, children }) => (
  <button
    type="submit"
    className={active ? styles.active : styles.button}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.element.isRequired,
};

Button.defaultProps = {
  active: false,
  onClick: () => null,
};

export default Button;
