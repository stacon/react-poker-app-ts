// core
import React from 'react';

// css
import './Info.module.css';

interface Props {
  playerName: string,
  balance: number
}

const Info = ({playerName, balance}: Props): JSX.Element => {
  return (
    <div className="player_info border-gradient-grey">
      {playerName} | <span className="info-balance">{balance.toFixed(2)}</span> &euro;
    </div>
  );
}

export default Info;