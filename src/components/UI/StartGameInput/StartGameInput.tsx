import React from 'react';

import store, { AppState } from '../../../store/app.store';
import { changeNumberOfPlayers } from '../../../actions/app.action.creator'
import { connect } from 'react-redux';

import './StartGameInput.module.css'

const onGameStartHandler = () => {

}

const onPlayersNumberChangeHandler = (numberOfPlayers: number): void => {
  store.dispatch(changeNumberOfPlayers(numberOfPlayers));
}

const mapStateToProps = (state: AppState) => {
  console.log(state)
  return {
    numberOfPlayersSelected: state.indexView.numberOfPlayersSelected
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
      onClick={onGameStartHandler}
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