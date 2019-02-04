import React from 'react';

//css
import './Card.module.css';
import { getRankUIRepresentation } from './helpers';
import { Suit } from 'src/libs/references';
import Card from 'src/libs/models/card.model';

export class UICard extends Card {
  public flipped: boolean;
  public selected: boolean;

  constructor(rank: number, suit: Suit) {
    super(rank, suit);
    this.flipped = false;
    this.selected = false;
  }
}

interface Props {
  isFlipped: boolean,
  rank: number,
  suit: string,
  isSelected: boolean,
}

const card = ({isFlipped, rank, suit, isSelected }: Props): JSX.Element => {
  console.log(isSelected)
  return (
    <li
      style={{ 'cursor': 'pointer' }}
      className={`card ${isFlipped ?
        'rank-' + getRankUIRepresentation(rank).toLowerCase() + ' ' + suit.toString().toLowerCase() :
        'back'}`}
    >
      {isFlipped
        ?
        (
          <div className="inner-wrapper">
            <span className="rank">{`${getRankUIRepresentation(rank)}`}</span>
            <span className="suit" dangerouslySetInnerHTML={{ __html: `&${suit.toLowerCase()};` }}></span>
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

export default card;