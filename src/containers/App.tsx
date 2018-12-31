import * as React from 'react';
import './App.css';

import ScreensRoot from 'src/screens/Roots';

class App extends React.Component {

  public render() {
    return (
      <div className="App" id="container">
          <div className="playingCards faceImages">
            <ScreensRoot
            ></ScreensRoot>
          </div>
      </div>
    );
  }
};

export default App;
