import React from 'react';
import PropTypes from 'prop-types';
// components
import Panel from '../shared-ui/panel';
import Button from '../shared-ui/button';
import ICONS from '../icon/icons';
import Icon from '../icon';

// styles
import styles from './styles.css';

const TitleSearch = ({ title, onSubmit, onChange }) => (
  <Panel searchBlock>
    <p>Search by title</p>
    <form onSubmit={onSubmit}>
      <input
        className={styles.input}
        value={title}
        onChange={onChange}
        type="text"
      />
      <Button>
        <Icon icon={ICONS.SEARCH} />
      </Button>
    </form>
  </Panel>
);

TitleSearch.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TitleSearch;
