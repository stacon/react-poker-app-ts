// core
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'src/models/App/app.store';

// components
import Player from '../Player/Player';

import './Board.module.css';
import MessagesFrame from '../MessagesFrame/MessagesFrame';
import GameControls from '../GameControls/GameControls';
import { IPlayer } from 'src/types';

interface Props {
  players: IPlayer[],
  pot: number,
  dealerIndex: number
}

export const board = ({ players, pot, dealerIndex }: Props) => {
  console.log('dealerINdex', dealerIndex)
  const playersGrid: JSX.Element | JSX.Element[] = (!players) ?
    <div></div> : (
      players.map((player, index) => {
        return (
          <div className={`player player_${index + 1}`}>
            <Player pid={index} key={player.name} {...player} isMainPlayer={index ? false : true} isDealer={index === dealerIndex ? true : false} />
          </div>
        )
      })
    )
  return (
    <>
      <div className="playingCards faceImages">
        <div className="inner-wrapper flex">
        {pot?
            <div className="pokerchip iso">
              <div className="pot">{pot} $</div>
            </div> : ''}
          {
            players && players.length ? playersGrid : null
          }
        </div>
      </div>
      <MessagesFrame />
      {(players[0].hand.length) ? <GameControls /> : <></>}
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    players: state.game.players,
    pot: state.game.pot,
    dealerIndex: state.game.dealerIndex
  }
};

export default connect(mapStateToProps)(board);