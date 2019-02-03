import React from 'react';

import store from '../../store/app.store';
import { changeNumberOfPlayers } from '../../actions/app.action.creator'

import './IndexView.module.css'
import { connect } from 'react-redux';
import { AppState } from 'src/reducers/app.reducer';

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

const IndexView = ({ numberOfPlayersSelected }: Props) => (
  <main>
    <input
      id='NumberOfPlayers'
      type="range"
      min="2"
      max="4"
      value={numberOfPlayersSelected}
      onChange={(event) => onPlayersNumberChangeHandler(+event.target.value)}
      step="1"
    >
    </input>
    <br /><br />
    <button
      onClick={onGameStartHandler}
    >
      Start Game with {numberOfPlayersSelected} players
    </button>
  </main>
);



interface Props {
  numberOfPlayersSelected: number
}

export default connect(mapStateToProps)(IndexView)