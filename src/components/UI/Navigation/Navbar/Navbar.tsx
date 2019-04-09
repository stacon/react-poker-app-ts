import React from 'react';
import './Navbar.module.css';
import { connect } from 'react-redux';
import { dealCards } from 'src/models/Game/game.actions.creator';
import { AppState } from '../../../../models/App/app.store';
import { GameStatus } from 'src/enums';

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

const mapDispatchToProps = (dispatch: Function ) => {
    return {
      dealCardsHandler: () => {
        dispatch(dealCards());
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