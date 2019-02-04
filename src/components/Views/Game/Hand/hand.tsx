// core
import React from 'react';

// components
import CardComponent, { UICard } from '../Card/Card';

// css
import './Hand.module.css';



interface Props {
  hand: UICard[],
  closed: boolean,
}

const Hand = ({ hand, closed }: Props): JSX.Element => (
    <ul className="table tbl_clear m-b-0">
      {hand.map((item: UICard) => (
        <CardComponent
          key={`${item.suit}+${item.rank}`}
          isFlipped={(closed) ? true : false}
          rank={item.rank}
          suit={item.suit}
          isSelected={item.selected}
        />
      ))}
    </ul>
  );

export default Hand;