import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/about-me">
        <AboutPage />
      </Route>
    </Switch>
  </Router>
);
