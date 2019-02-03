import React from 'react';

// Interfaces
import { ICard } from '../../../../helpers/interfaces';

//css
import './Card.module.css';

const Card = (props: any): JSX.Element => {

  const _card: ICard = props.card;

  return (
    <li
      style={{ 'cursor': 'pointer' }}
      className={`card ${_card.isFlipped ?
        'rank-' + _card.rank.toString().toLowerCase() + ' ' + _card.suit.toString().toLowerCase() :
        'back'}`}
    >
      {_card.isFlipped
        ?
        (
          <div className="inner-wrapper">
            <span className="rank">{`${_card.rank}`}</span>
            <span className="suit" dangerouslySetInnerHTML={{ __html: `&${_card.suit.toLowerCase()};` }}></span>
          </div>
        )
        :
        (
          <div className="inner-wrapper" />
        )
      }
    </li>
  );
};

export default Card;