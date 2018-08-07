import React from 'react';
import PropTypes from 'prop-types';

// components
import Panel from '../shared-ui/panel';
import WatchMovie from '../watch-movie';

// styles
import styles from './styles.css';

const Watchlist = ({ watchlist, onClickRemove }) => (
  <Panel watchListPanel>
    <h2 className={styles.title}>Watchlist</h2>
    {watchlist.length > 0 && (
      <ul className={styles.ul}>
        {watchlist.map(movie => (
          <li key={movie.id} className={styles.li}>
            <WatchMovie
              movie={movie}
              onClickRemove={() => onClickRemove(movie)}
            />
          </li>
        ))}
      </ul>
    )}
  </Panel>
);

Watchlist.propTypes = {
  watchlist: PropTypes.shape.isRequired,
  onClickRemove: PropTypes.func.isRequired,
};

export default Watchlist;
