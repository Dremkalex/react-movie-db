import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

// styles
import styles from './styles.css';

const cx = classNames.bind(styles);

const Panel = ({
  searhPanel,
  searchBlock,
  watchListPanel,
  watchListItem,
  children,
}) => {
  const panelClass = cx({
    panel: styles.panel,
    searhPanel,
    searchBlock,
    watchListPanel,
    watchListItem,
  });

  return <section className={panelClass}>{children}</section>;
};

Panel.propTypes = {
  searhPanel: PropTypes.bool,
  searchBlock: PropTypes.bool,
  watchListPanel: PropTypes.bool,
  watchListItem: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Panel.defaultProps = {
  searhPanel: false,
  searchBlock: false,
  watchListPanel: false,
  watchListItem: false,
};

export default Panel;
