// core
import React from 'react';

// component
import Hand from '../Hand/Hand';
import Info from '../Info/Info';

// css
import './Player.module.css';

// Interfaces
import { UICard } from '../Card/Card';
import DealerBadge from '../DealerBadge/DealerBadge';

interface Props {
  pid: number,
  hand: UICard[],
  name: string,
  balance: number,
  isMainPlayer: boolean,
  isDealer: boolean,
}

const Player = ({hand, name, balance, isMainPlayer, isDealer }: Props): JSX.Element => (
  <article>
    <Hand hand={hand} closed={isMainPlayer}/>
    <Info playerName={name} balance={balance} />
    {(isDealer) ? <DealerBadge/> : null}
  </article>
);

export default Player;