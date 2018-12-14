import * as React from 'react';
import './App.css';

import SingleCard from '../components/SingleCard/SingleCard'
import CardProperties from '../classes/CardProperties'


class App extends React.Component {

  state = {
    isFlipped: false // temporary
  }

  newCard = new CardProperties('spades ', 'rank1'); // temporary


  renderSingleCard(card: CardProperties) { // temporary

    return <SingleCard
              card={card}
              flipped={this.state.isFlipped}
              onFlippingCard={ () => {
                this.setState({ isFlipped: !this.state.isFlipped });
              }}
            />;
  }

  public render() {
    return (
      <div className="App">
          <div id="container">
            {this.renderSingleCard(this.newCard)} {/* // temporary */}
          </div>
      </div>
    );
  }
}

export default App;
