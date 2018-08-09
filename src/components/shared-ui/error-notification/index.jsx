import React from 'react';
import PropTypes from 'prop-types';
// components

import Icon from '../../icon';
import ICONS from '../../icon/icons';
// styles
import styles from './styles.css';

const ErrorNotification = ({ message, children }) => (
  <div className={styles.container}>
    <Icon icon={ICONS.ERROR} />
    <h3 className={styles.text}>{message}</h3>
    {children}
  </div>
);

ErrorNotification.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ErrorNotification;
