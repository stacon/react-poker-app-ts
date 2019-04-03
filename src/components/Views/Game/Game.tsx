import React from 'react';
import Board from './Board/Board';
import { connect } from 'react-redux';
import { AppState } from 'src/models/App/app.store';
import { GameState } from 'src/types';
import { history } from "../../Routes";


interface Props {
  game: GameState
}

export const game = ({game} : Props) => {
  if (Object.keys(game).length === 0 && game.constructor === Object) {
    history.push('/');
    return <></>
  }
   return <Board/>;
}

const mapStateToProps = (state: AppState) => {
  return {
    game: state.game
  }
};

export default connect(mapStateToProps)(game);