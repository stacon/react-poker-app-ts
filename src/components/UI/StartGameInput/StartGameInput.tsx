import React from 'react';
import './StartGameInput.module.css';
import { connect } from 'react-redux';
import { startNewGame, resetMessages } from 'src/models/Game/game.actions.creator';
import { AppState } from '../../../models/App/app.store';
import { changeNumberOfPlayers } from '../../../models/App/app.action.creator'
import { history } from "../../Routes";

interface Props {
  numberOfPlayersSelected: number,
  name: string,
  balance: number,
  onGameStartHandler: Function,
  onChangeNumberOfPlayers: Function,
}

export const startGameInput = (
  {
    numberOfPlayersSelected,
    name,
    balance,
    onGameStartHandler,
    onChangeNumberOfPlayers
   }: Props) => (
  <div className="start-game-control-container">
    <div className="range-control">
      <span className="range-number">
        2
    </span>

      <input
        className="start-game-range"
        id='NumberOfPlayers'
        type="range"
        min="2"
        max="4"
        value={numberOfPlayersSelected}
        onChange={(event) => onChangeNumberOfPlayers(+event.target.value)}
        step="1"
      >
      </input>

      <span className="range-number">
        4
    </span>
    </div>
    <br />
    <br />
    <div
      className="start-game-button"
      onClick={() => onGameStartHandler({
        numberOfPlayers:+numberOfPlayersSelected,
        name,
        balance
      })}
    >
      Start Game with
      <span className="button-players-number"> {numberOfPlayersSelected} </span>
      players
    </div>
  </div>
)



const mapDispatchToProps = (dispatch:any ) => {
    return {
      onGameStartHandler: (payload:any) => {
        dispatch(resetMessages());
        dispatch(startNewGame(payload));
        history.push('/game');
      },
      onChangeNumberOfPlayers: (numberOfPlayers: number): void => {
        dispatch(changeNumberOfPlayers(numberOfPlayers));
    },
      

  }
}

  const mapStateToProps = (state: AppState) => {
    return {
      numberOfPlayersSelected: state.app.numberOfPlayersSelected,
      name: state.user.name,
      balance: state.user.balance,
    }
  };


export default connect(mapStateToProps,mapDispatchToProps)(startGameInput);