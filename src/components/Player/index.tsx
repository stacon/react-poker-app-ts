// core
import React from 'react';
import { connect } from 'react-redux';

// component
import Hand from '../Hand';
import Info from '../Info';

// css
import './stylesheet.css';

const Player = ({ hand, index, name }: any): JSX.Element => (
            <article className="player">
              <Hand hand= { hand } cardOwner={ index } />
              <Info playerName = { name } />
            </article>
  );

export default connect(undefined)(Player);