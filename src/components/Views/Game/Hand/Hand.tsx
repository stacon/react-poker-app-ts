// core
import React from 'react';

// components
import CardContainer from '../Card/Card';


// css
import './Hand.module.css';

// types
import { UICard } from 'src/libs/types';
import _ from 'lodash';

interface Props {
  hand: UICard[],
}

const Hand = ({ hand }: Props): JSX.Element => (
  <ul className="table tbl_clear m-b-0" style={ {overflow : 'visible'}}>
    {hand.map((card: UICard, index) => (
      <CardContainer
        key={`${card.suit}+${card.rank}`}
        isFlipped={_.isEmpty(card)}
        rank={card.rank}
        suit={card.suit}
        index={index}
        isSelected={!!card.selected}
      />
    ))}
  </ul>
);

export default Hand;