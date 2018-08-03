import React from 'react';
import PropTypes from 'prop-types';
// components
import Panel from '../shared-ui/panel';
import Button from '../shared-ui/button';
import ICONS from '../icon/icons';
import Icon from '../icon';

// styles
import styles from './styles.css';

const TitleSearch = ({ filter, onChange, onClick }) => (
  <Panel searchBlock>
    <p>Search by title</p>
    <div>
      <input
        className={styles.input}
        value={filter}
        onChange={onChange}
        type="text"
      />
      <Button onClick={onClick}>
        <Icon icon={ICONS.SEARCH} />
      </Button>
    </div>
  </Panel>
);

TitleSearch.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TitleSearch;
