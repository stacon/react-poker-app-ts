import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import Board from '../components/Board';
import { IState } from 'src/containers/App';

export interface AppProps {
  routerProps: {
    state: IState
  }
}

const history = createBrowserHistory();

const ScreensRoot = (props: AppProps) => (
  <Router history={history}>
    <Switch>
      <Route
        path="/"
        exact
        render={
          () =>(
            <Board
              state={props.routerProps.state}
            ></Board>
          )
        }
      />
    </Switch>
  </Router>
);

export default ScreensRoot;