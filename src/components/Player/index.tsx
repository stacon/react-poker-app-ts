// core
import React from 'react';
import { connect } from 'react-redux';

// component
import Hand from '../Hand';

const Player = (props: any): JSX.Element => { // temp

  const { hand, index } = props.playerObj;

  return (
            <article>
              <Hand
                hand={ hand }
                cardOwner={ index }
              />
            </article>
  );

}

export default connect(undefined)(Player);