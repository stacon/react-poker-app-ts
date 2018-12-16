import * as React from 'react';
import './App.css';
import ScreensRoot from 'src/screens/Roots';
import { Props } from 'react';

export interface IState {
  isFlipped: boolean
};

class App extends React.Component<Props<IState>, IState> {

  public state: IState = {
    isFlipped: false
  };

  public render() {
    const state =  this.state;
    return (
      <div className="App">
          <div id="container">
            <ScreensRoot
              routerProps={ { state } }
            ></ScreensRoot>
          </div>
      </div>
    );
  }
};

export default App;
