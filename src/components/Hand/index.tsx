// core
import React from 'react';
import { connect } from 'react-redux';

// components
import SingleCard from '../../components/SingleCard/SingleCard';

// helpers
import CardProperties from '../../classes/CardProperties';

// interfaces
import { IState, ICard } from '../../helpers/interfaces';

const mapStateToProps = (state: IState): { [key: string]: ICard[] } => {
  return { hand: state.hand };
};

const Hand = (props: any): JSX.Element => {

      const handArr: ICard[] = props.hand;
      console.log('Hand props: ', handArr);

      return (
        <ul className="table">
          {
            handArr.map( ( item: ICard, i: number) => {
              return <SingleCard key={i} card={new CardProperties(item.id, item.suit, item.rank, item.isFlipped)} />;
            })
          }
        </ul>
      )

};

export default connect(mapStateToProps)(Hand);