import React from 'react';
import './Navbar.module.css';
import { GameStatus } from '../../../../reducers/GameView.reducer';

interface Props {
  name: string,
  balance: number,
  dealCardsHandler: Function,
  gameStatus: number,
}

const navBar = ({name, balance, dealCardsHandler, gameStatus}: Props) => (
  <header className="Navbar">
      <p>
        Hello, <span className="name">{name}</span> |
        Balance: <span className="balance">{balance.toFixed(2)}</span>
        &nbsp;&euro;
      </p>
      <nav>
          <ul>
           {gameStatus && gameStatus === GameStatus._New ? <li onClick={() => dealCardsHandler()}>Deal Cards</li> : null }
          </ul>
      </nav>
  </header>
);

export default navBar;