import * as React from 'react';
import './App.css';

import logo from '../logo.svg';
import SingleCard from '../components/SingleCard/SingleCard'
import CardProperties from '../classes/CardProperties'


class App extends React.Component {
  
  newCard = new CardProperties('diams', 'k');
    
  renderSingleCard(card: CardProperties) {
    return <SingleCard card={card} />;
  }
    
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
            {this.renderSingleCard(this.newCard)}
      </div>
    );
  }
}

export default App;
