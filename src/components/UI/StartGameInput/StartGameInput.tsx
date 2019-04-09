import React from 'react';
import './StartGameInput.module.css';
import { connect } from 'react-redux';
import { startNewGame } from 'src/models/Game/game.actions.creator';
import { AppState } from '../../../models/App/app.store';
import { changeNumberOfPlayers } from '../../../models/App/app.action.creator'
import { getUserInfo, getNumberOfSelectedPlayers } from 'src/models/User/user.selectors';

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



const mapDispatchToProps = (dispatch: Function ) => {
    return {
      onGameStartHandler: (payload: {numberOfPlayers: number, name: string, balance: number}) => {
        dispatch(startNewGame(payload));
      },
      onChangeNumberOfPlayers: (numberOfPlayers: number): void => {
        dispatch(changeNumberOfPlayers(numberOfPlayers));
    },


  }
}

  const mapStateToProps = (state: AppState) => {
    return {
      numberOfPlayersSelected: getNumberOfSelectedPlayers(state),
      name: getUserInfo(state).name,
      balance: getUserInfo(state).balance,
    }
  };


export default connect(mapStateToProps,mapDispatchToProps)(startGameInput);