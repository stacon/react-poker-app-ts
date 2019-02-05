import React from 'react';
import { connect } from 'react-redux';
import { onCardSelect } from 'src/actions/game.actions.creator';

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
  onCardClickHandler: Function,
  keyForRef: string,
}

export const card = ({isFlipped, rank, suit, isSelected, onCardClickHandler, keyForRef }: Props): JSX.Element => {
  const liCardStyle = {
    position: 'relative',
    top: isSelected ? '-10px' : '0px',
    cursor: isFlipped ? 'pointer' : 'undefined'
  }
  return (
    <li
      style={liCardStyle}
      className={`card ${isFlipped ?
        'rank-' + getRankUIRepresentation(rank).toLowerCase() + ' ' + suit.toString().toLowerCase() :
        'back'}`}
    >
      {isFlipped ? (
          <div className="inner-wrapper"
            onClick= {() => onCardClickHandler(keyForRef)}
          >
            <span className="rank">{`${getRankUIRepresentation(rank)}`}</span>
            <span className="suit" dangerouslySetInnerHTML={{ __html: `&${suit.toLowerCase()};` }}></span>
          </div>
        ) : (
          <div className="inner-wrapper" />
        )}
    </li>
  );
};

const mapDispatchToProps = (dispatch: any) =>  ({
    onCardClickHandler: (key:number) => {
      dispatch(onCardSelect(key));
    }
});

export default connect(null, mapDispatchToProps)(card);