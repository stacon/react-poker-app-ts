// core
import React from 'react';

// component
import Hand from '../Hand/Hand';
import Info from '../Info/Info';

// css
import './Player.module.css';

// Interfaces
import { UICard } from '../Card/Card';

interface Props {
  hand: UICard[],
  name: string,
  balance: number,
  isMainPlayer: boolean
}

const Player = ({ hand, name, balance, isMainPlayer }: Props): JSX.Element => (
  <article className="player">
    <Hand hand={hand} closed={isMainPlayer}/>
    <Info playerName={name} balance={balance} />
  </article>
);

export default Player;