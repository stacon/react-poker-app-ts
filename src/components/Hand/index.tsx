// core
import React from 'react';

// components
import SingleCard from '../SingleCard';

// helpers
import CardProperties from '../../classes/CardProperties';

// interfaces
import { ICard } from '../../helpers/interfaces';

// css
import './stylesheet.css';

interface Props {
  hand: ICard[],
  cardOwner: number
}

const Hand = ({ hand }: Props): JSX.Element => (
    <ul className="table tbl_clear m-b-0">
      {hand.map((item: ICard, i: number) => (
        <SingleCard
          key={i}
          card={new CardProperties(item.id, item.suit, item.rank, item.isFlipped, item.playerId, i)}
        />
      ))}
    </ul>
  );

export default Hand;