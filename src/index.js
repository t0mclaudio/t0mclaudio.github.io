import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import initialData from './App/initialState';
import appReducers from './App/reducers';

import App from './App';

const store = createStore(appReducers, initialData);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
