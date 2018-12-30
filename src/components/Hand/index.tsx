// core
import React from 'react';

// components
import SingleCard from '../SingleCard';

// helpers
import CardProperties from '../../classes/CardProperties';

// interfaces
import { ICard } from '../../helpers/interfaces';

const Hand = (props: any): JSX.Element => {

    const handArr: ICard[] = props.hand;

    return (
      <ul className="table">
        {
          handArr.map( ( item: ICard, i: number) => {
            return <SingleCard
                      key={i}
                      card={new CardProperties(item.id, item.suit, item.rank, item.isFlipped, item.playerId, i)}
                    />;
          })
        }
      </ul>
    );

};

export default Hand;