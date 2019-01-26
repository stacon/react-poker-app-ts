import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import Board from '../components/Board/board';

const history = createBrowserHistory();

const ScreensRoot = () => (
  <Router history={history}>
    <Switch>
      <Route
        path="/"
        exact
        render={ () =><Board></Board> }
      />
    </Switch>
  </Router>
);

export default ScreensRoot;