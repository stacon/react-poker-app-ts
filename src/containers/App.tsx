import * as React from 'react';
import './App.css';

import ScreensRoot from 'src/screens/Roots';
import store from 'src/store/app.store';

class App extends React.Component {
  componentWillUpdate() {
    console.log(store.getState());
  }

  public render() {
    return (
      <div className="App" id="container">
          <div className="playingCards faceImages">
            <ScreensRoot/>
          </div>
      </div>
    );
  }
};

export default App;
