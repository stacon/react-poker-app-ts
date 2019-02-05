// core
import React from 'react';

// components
import CardContainer, { UICard } from '../Card/Card';

// css
import './Hand.module.css';

interface Props {
  hand: UICard[],
  closed: boolean,
}

const Hand = ({ hand, closed }: Props): JSX.Element => (
  <ul className="table tbl_clear m-b-0" style={ {overflow : 'visible'}}>
    {hand.map((item: UICard, index) => (
      <CardContainer
        key={`${item.suit}+${item.rank}`}
        isFlipped={(closed) ? true : false}
        rank={item.rank}
        suit={item.suit}
        index={index}
        isSelected={item.selected}
      />
    ))}
  </ul>
);

export default Hand;