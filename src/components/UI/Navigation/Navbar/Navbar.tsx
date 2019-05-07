import React from 'react';
import './Navbar.module.css';
import { connect } from 'react-redux';
import { dealCards, endGame, startNextRound } from 'src/models/Game/game.actions.creator';
import { AppState } from '../../../../models/App/app.store';
import { GameStatus } from 'src/enums';
import { getUserInfo } from 'src/models/User/user.selectors';
import { getGameStatus } from 'src/models/Game/game.selectors';

interface Props {
  name: string,
  balance: number,
  dealCardsHandler: Function,
  endGameHandler: Function,
  newRoundHandler: Function,
  gameStatus: number,
}

export const navBar = ({name, balance, dealCardsHandler, endGameHandler, newRoundHandler, gameStatus}: Props) => (
  <header className="Navbar">
      <p>
        Hello, <span className="name">{name}</span> |
        Balance: <span className="balance">{balance.toFixed(2)}</span>
        &nbsp;&euro;
      </p>
      <nav>
          <ul>
           {gameStatus === GameStatus._EvaluationPhase ? <li onClick={() => endGameHandler()}>End Game</li> : null }
           {gameStatus === GameStatus._EvaluationPhase ? <li onClick={() => newRoundHandler()}>Next Round</li> : null }
           {gameStatus === GameStatus._NewGame ? <li onClick={() => dealCardsHandler()}>Deal Cards</li> : null }
          </ul>
      </nav>
  </header>
);

const mapDispatchToProps = (dispatch: Function ) => {
    return {
      dealCardsHandler: () => {
        dispatch(dealCards());
      },
      endGameHandler: () => {
        dispatch(endGame())
      },
      newRoundHandler: () => {
        dispatch(startNextRound())
      }
  }
}

  const mapStateToProps = (state: AppState) => {
    return {
      name: getUserInfo(state).name,
      balance: getUserInfo(state).balance,
      gameStatus: getGameStatus(state),
    }
  };


export default connect(mapStateToProps,mapDispatchToProps)(navBar);