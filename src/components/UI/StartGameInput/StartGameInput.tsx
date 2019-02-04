import React from 'react';

import store, { AppState } from '../../../store/app.store';
import { changeNumberOfPlayers } from '../../../actions/app.action.creator'
import { connect } from 'react-redux';

import './StartGameInput.module.css'
import { startNewGame } from 'src/actions/game.actions.creator';

const onGameStartHandler = (numberOfPlayers: number) => {
  store.dispatch(startNewGame(numberOfPlayers));
}

const onPlayersNumberChangeHandler = (numberOfPlayers: number): void => {
  store.dispatch(changeNumberOfPlayers(numberOfPlayers));
}

const mapStateToProps = (state: AppState) => {
  return {
    numberOfPlayersSelected: state.homeView.numberOfPlayersSelected
  }
};

const startGameInput = ({ numberOfPlayersSelected }: Props) => (
  <>
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
        onChange={(event) => onPlayersNumberChangeHandler(+event.target.value)}
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
      onClick={() => onGameStartHandler(+numberOfPlayersSelected)}
    >
      Start Game with
      <span className="button-players-number"> {numberOfPlayersSelected} </span>
      players
    </div>
  </>
)

interface Props {
  numberOfPlayersSelected: number
}

export default connect(mapStateToProps)(startGameInput);