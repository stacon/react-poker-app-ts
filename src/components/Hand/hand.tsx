// core
import React from 'react';

// components
import { Card } from '../';

// helpers
import CardProperties from 'src/helpers/interfaces/CardProperties';

// interfaces
import { ICard } from '../../helpers/interfaces';

// css
import './hand.module.css';

interface Props {
  hand: ICard[],
  cardOwner: number
}

const Hand = ({ hand }: Props): JSX.Element => (
    <ul className="table tbl_clear m-b-0">
      {hand.map((item: ICard, i: number) => (
        <Card
          key={i}
          card={new CardProperties(item.id, item.suit, item.rank, item.isFlipped, i)}
        />
      ))}
    </ul>
  );

export default Hand;