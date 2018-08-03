import React from 'react';

// components
import Select from 'react-select';
import Panel from '../shared-ui/panel';

const CategorySelector = props => (
  <Panel searchBlock>
    <p>Search by category</p>
    <Select {...props} />
  </Panel>
);

export default CategorySelector;
