// core
import React from 'react';

// component
import Hand from '../Hand/Hand';
import Info from '../Info/Info';

// css
import './Player.module.css';

// Interfaces
import DealerBadge from '../DealerBadge/DealerBadge';
import { UICard } from 'src/types';

// Types

interface Props {
  pid: number,
  hand: UICard[],
  name: string,
  balance: number,
  isDealer: boolean,
}

const Player = ({hand, name, balance, isDealer }: Props): JSX.Element => (
  <article>
    <Hand
      hand={hand}
    />
    <Info
      playerName={name}
      balance={balance}
    />
    {(isDealer) ? <DealerBadge/> : null}
  </article>
);

export default Player;