import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import Panel from '../shared-ui/panel';
import Button from '../shared-ui/button';
import ICONS from '../icon/icons';
import Icon from '../icon';

// styles
import styles from './styles.css';

class TitleSearch extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    title: '',
  };

  changeTitle = ({ target }) => {
    this.setState({ title: target.value });
  };

  submitTitle = evt => {
    evt.preventDefault();
    const { title } = this.state;
    const { onSubmit } = this.props;

    if (!title) return;

    onSubmit(title);
    this.setState({ title: '' });
  };

  render() {
    const { title } = this.state;

    return (
      <Panel searchBlock>
        <form onSubmit={this.submitTitle} className={styles.form}>
          <p className={styles.label}>Search by title</p>
          <input
            className={styles.input}
            value={title}
            onChange={this.changeTitle}
            type="text"
          />
          <Button>
            <Icon icon={ICONS.SEARCH} />
          </Button>
        </form>
      </Panel>
    );
  }
}

// TitleSearch.propTypes = {
//   filter: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };

// TitleSearch.defaultProps = {
//   filter: '',
// };
export default TitleSearch;
