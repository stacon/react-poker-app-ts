import * as React from 'react';
import './App.css';

import CardProperties from '../classes/CardProperties'
import { Suit } from 'src/libs/references';
import Hand from 'src/components/Hand/Hand';


class App extends React.Component {

  state = {
    isFlipped: false // temporary
  }

  public fiveCards: CardProperties[] = [
    new CardProperties(Suit.spades, 1),
    new CardProperties(Suit.hearts, 2),
    new CardProperties(Suit.clubs, 11),
    new CardProperties(Suit.diamonds, 12),
    new CardProperties(Suit.spades, 13),
  ]; // temporary

  public render() {
    return (
      <div className="App">
          <div id="container">
            <div className="playingCards fourColours faceImages rotateHand" id="cards">
              <Hand cards={this.fiveCards}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
