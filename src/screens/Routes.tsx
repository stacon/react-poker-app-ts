import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import { Home, Game } from '../components/Views';

const history = createBrowserHistory();

const ScreensRoot = () => (
  <Router history={history}>
    <Switch>
      <Route
        path="/"
        exact
        render={ () =><Home/> }
      />
      <Route
        path="/game"
        exact
        render={ () =><Game/> }
      />
    </Switch>
  </Router>
);

export default ScreensRoot;