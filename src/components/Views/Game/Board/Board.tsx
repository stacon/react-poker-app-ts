// core
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'src/models/App/app.store';

// components
import Player from '../Player/Player';

import './Board.module.css';
import { IPlayer } from 'src/models/Game/game.reducer';
import { statusFrame as StatusFrame } from '../StatusFrame/StatusFrame';

interface Props {
  players: IPlayer[]
}

export const board = ({ players }: Props) => {
  const messages = ['You won!'];
  const playersGrid: JSX.Element | JSX.Element[] = (!players) ?
    <div></div> : (
      players.map((player, index) => {
        return (
          <div className = {`player player_${index+1}`}>
           <Player pid= {index} key={player.name} {...player} isMainPlayer={index? false : true } isDealer = {index? false : true } />
         </div>
        )
      })
    )


  return (
    <>
      <div className="playingCards faceImages">
        <div className="inner-wrapper flex">
          {
            players && players.length ? playersGrid : null
          }
        </div>
      </div>
      <StatusFrame messages={messages}/>
    </>
  )

}

const mapStateToProps = (state: AppState) => {
  return {
    players: state.game.players
  }
};

export default connect(mapStateToProps)(board);