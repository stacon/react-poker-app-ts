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
import { getGamePlayers, getGamePot, getGameDealerPID, gameHasStarted } from 'src/models/Game/game.selectors';

interface Props {
  gameHasStarted: boolean
  players: IPlayer[],
  pot: number,
  dealerPID: string,
}

export const board = ({ gameHasStarted, players, pot, dealerPID, }: Props) => {
  const playersGrid: JSX.Element | JSX.Element[] = (
    players.map((player, index) => {
      return (
        <div className={`player player_${(index + 1).toString()}`}>
          <Player
            key={player.pid}
            {...player}
            isDealer={player.pid === dealerPID}
          />
        </div>
      )
    })
  );

  return (
    <>
      <div className="playingCards faceImages">
        <div className="inner-wrapper flex">
          {pot ?
            <div className="pokerchip iso">
              <div className="pot">{pot} $</div>
            </div> : ''}
          {
            players.length ? playersGrid : null
          }
        </div>
      </div>
      <MessagesFrame />
      {(gameHasStarted) ? <GameControls /> : <></>}
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    gameHasStarted: gameHasStarted(state),
    players: getGamePlayers(state),
    pot: getGamePot(state),
    dealerPID: getGameDealerPID(state),
  }
};

export default connect(mapStateToProps)(board);