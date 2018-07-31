import React from 'react';
import { whyDidYouUpdate } from 'why-did-you-update';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';

if (process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React);
}

ReactDOM.render(<App />, document.getElementById('root'));
