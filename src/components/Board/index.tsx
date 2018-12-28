// core
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import SingleCard from '../../components/SingleCard/SingleCard';

// actions
import { selectedCard } from '../../actions/index';

// helpers
import CardProperties from '../../classes/CardProperties';

const mapStateToProps = (state: any) => {
  return { card: state.hand[0] }; // temp
};

const mapDispatchToProps =  (dispatch: any)  => {
  return bindActionCreators({ selectedCard }, dispatch);
};

const Board = (props: any): JSX.Element => {

      console.log('card props: ', props);

      return <SingleCard
                card = { new CardProperties(props.suit, props.rank) }
                flipped = { props.isFlipped }
                onFlippingCard = { () => {
                                          console.log('card is clicked', props.card.id);
                                          props.selectedCard(props.card.id, !props.isFlipped);
                                    }
                                  }
              />;
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);