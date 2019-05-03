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
import { getGamePlayers, getGamePot, getGameDealerIndex, gameHasStarted, getCurrentPlayerId } from 'src/models/Game/game.selectors';

interface Props {
  gameHasStarted: boolean
  players: IPlayer[],
  pot: number,
  dealerIndex: number,
  currentPlayerId: number,
}

export const board = ({gameHasStarted, players, pot, dealerIndex, currentPlayerId }: Props) => {
  const playersGrid: JSX.Element | JSX.Element[] = (!players) ?
    <div></div> : (
      players.map((player, index) => {
        return (
          <div className={`player player_${index + 1}`}>
            <Player
              pid={index}
              key={player.name}
              {...player}
              isMainPlayer={index ? false : true}
              isDealer={index === dealerIndex ? true : false}
            />
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
            players.length ? playersGrid : null
          }
        </div>
      </div>
      <MessagesFrame />
      {(gameHasStarted && currentPlayerId === 0 && players[0].hand) ? <GameControls /> : <></>}
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    gameHasStarted: gameHasStarted(state),
    currentPlayerId: getCurrentPlayerId(state),
    players: getGamePlayers(state),
    pot: getGamePot(state),
    dealerIndex: getGameDealerIndex(state),
  }
};

export default connect(mapStateToProps)(board);