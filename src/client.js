import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(<App />, document.getElementById('container'));

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default;
    hydrate(<NewApp />, document.getElementById('container'));
  });
}
