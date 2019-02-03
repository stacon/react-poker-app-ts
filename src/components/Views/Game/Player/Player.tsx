// core
import React from 'react';
import { connect } from 'react-redux';

// component
import Hand from '../Hand/hand';
import Info from '../Info/info';

// css
import './Player.module.css';

const Player = ({ hand, index, name }: any): JSX.Element => (
  <article className="player">
    <Hand hand={hand} cardOwner={index} />
    <Info playerName={name} />
  </article>
);

export default connect(undefined)(Player);