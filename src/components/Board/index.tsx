import React from 'react';
import { connect } from 'react-redux';

import SingleCard from '../../components/SingleCard/SingleCard';
import CardProperties from '../../classes/CardProperties';

import { IState } from 'src/containers/App';

interface appState {
  state: IState
}

const newCard = new CardProperties('spades ', 'rank1'); // temporary
const renderSingleCard = (card: CardProperties, obj: IState) => { // temporary

  return <SingleCard
            card={card}
            flipped={obj.isFlipped}
            onFlippingCard={ () => {
              //this.setState({ isFlipped: !this.state.isFlipped }); // must dispatch flip action
            }}
          />;
}

const Board = (props: appState) => {
  return (
    <div>
      { renderSingleCard(newCard, props.state ) }
    </div>
  );
};

export default connect(null, null)(Board); // needs clarifying