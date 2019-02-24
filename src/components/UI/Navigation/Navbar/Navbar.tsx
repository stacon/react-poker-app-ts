import React from 'react';
import './Navbar.module.css';
import { GameStatus } from '../../../../models/Game/game.reducer';
import { connect } from 'react-redux';
import { dealCards, resetMessages, placeAnte } from 'src/models/Game/game.actions.creator';
import { AppState } from '../../../../models/App/app.store';

interface Props {
  name: string,
  balance: number,
  dealCardsHandler: Function,
  gameStatus: number,
}

export const navBar = ({name, balance, dealCardsHandler, gameStatus}: Props) => (
  <header className="Navbar">
      <p>
        Hello, <span className="name">{name}</span> |
        Balance: <span className="balance">{balance.toFixed(2)}</span>
        &nbsp;&euro;
      </p>
      <nav>
          <ul>
           {gameStatus && gameStatus === GameStatus._NewGame ? <li onClick={() => dealCardsHandler()}>Deal Cards</li> : null }
          </ul>
      </nav>
  </header>
);

const mapDispatchToProps = (dispatch:any ) => {
    return {
      dealCardsHandler: () => {
        dispatch(resetMessages());
        dispatch(dealCards());
        dispatch(placeAnte());
      }
  }
}

  const mapStateToProps = (state: AppState) => {
    return {
      name: state.user.name,
      balance: state.user.balance,
      gameStatus: (state.game.status) ? state.game.status : null
    }
  };


export default connect(mapStateToProps,mapDispatchToProps)(navBar);