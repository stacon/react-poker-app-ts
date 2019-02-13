// core
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'src/models/App/app.store';

// components
import Player from '../Player/Player';

import './Board.module.css';
import { IPlayer } from 'src/models/Game/game.reducer';
import MessagesFrame from '../MessagesFrame/MessagesFrame';
import GameControls from '../GameControls/GameControls';

interface Props {
  players: IPlayer[]
}

export const board = ({ players }: Props) => {
  
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
      <MessagesFrame/>
      {(players[0].hand.length) ? <GameControls/> : <></>}
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    players: state.game.players
  }
};

export default connect(mapStateToProps)(board);