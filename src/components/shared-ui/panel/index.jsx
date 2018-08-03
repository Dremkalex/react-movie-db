import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

// styles
import styles from './styles.css';

const cx = classNames.bind(styles);

const Panel = ({ searhPanel, searchBlock, children }) => {
  const panelClass = cx({
    panel: styles.panel,
    searhPanel,
    searchBlock,
  });

  return <section className={panelClass}>{children}</section>;
};

Panel.propTypes = {
  searhPanel: PropTypes.bool,
  searchBlock: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Panel.defaultProps = {
  searhPanel: false,
  searchBlock: false,
};

export default Panel;
