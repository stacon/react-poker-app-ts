// core
import React from 'react';

// components
import CardContainer from '../Card/Card';


// css
import './Hand.module.css';

// types
import { UICard } from 'src/types';

interface Props {
  hand: UICard[],
}

const Hand = ({ hand }: Props): JSX.Element => (
  <ul className="table tbl_clear m-b-0" style={ {overflow : 'visible'}}>
    {hand.map((item: UICard, index) => (
      <CardContainer
        key={`${item.suit}+${item.rank}`}
        isFlipped={(item.flipped) ? true : false}
        rank={item.rank}
        suit={item.suit}
        index={index}
        isSelected={item.selected}
      />
    ))}
  </ul>
);

export default Hand;