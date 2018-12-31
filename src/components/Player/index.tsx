// core
import React from 'react';
import { connect } from 'react-redux';

// component
import Hand from '../Hand';
import Info from '../Info';

// css
import './stylesheet.css';

const Player = (props: any): JSX.Element => { // temp

  const { hand, index, name } = props.playerObj;

  return (
            <article className="player">
              <Hand
                hand={ hand }
                cardOwner={ index }
              />
              <Info
                playerName = { name }
              />
            </article>
  );

}

export default connect(undefined)(Player);