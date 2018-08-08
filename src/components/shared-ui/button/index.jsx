import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './styles.css';

const Button = ({ btnModal, onClick, children }) => (
  <button
    type="submit"
    className={btnModal ? styles.btnModal : styles.button}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  btnModal: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.element.isRequired,
};

Button.defaultProps = {
  btnModal: false,
  onClick: () => null,
};

export default Button;
