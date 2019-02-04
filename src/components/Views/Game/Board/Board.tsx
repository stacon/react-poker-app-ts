// core
import React from 'react';

// components
import Player from '../Player/Player';

import './Board.module.css';
import { IPlayer } from 'src/reducers/GameView.reducer';

const Board = ({ players }: Props) => {
  const playersGrid: JSX.Element = (!players) ?
    <div></div> : (
      <>
        <div className={"grid-item"}></div>
        <div className={"grid-item"}>
          {(players.length === 2) ? <Player key={players[1].name} {...players[1]} isMainPlayer={false} /> : null}
          {(players.length === 4) ? <Player key={players[3].name} {...players[3]} isMainPlayer={false}/> : null}
        </div>
        <div className={"grid-item"}></div>
        <div className={"grid-item"}>
          {(players.length >= 3) ? <Player key={players[1].name} {...players[1]} isMainPlayer={false} /> : null}
        </div>
        <div className={"grid-item"}></div>
        <div className={"grid-item"}>
          {(players.length >= 3) ? <Player key={players[2].name} {...players[2]} isMainPlayer={false} /> : null}
        </div>
        <div className={"grid-item"}></div>
        <div className={"grid-item"}>
          <Player key={players[0].name} {...players[0]} isMainPlayer={true} />
        </div>
        <div className={"grid-item"}></div>
      </>
    )


  return (
    <>
      <div className="playingCards faceImages">
        <div className="inner-wrapper grid">
          {
            players && players.length ? playersGrid : null
          }
        </div>
      </div>
      <div className="status-wrapper">
        <ul></ul>
      </div>
    </>
  )

}

interface Props {
  players: IPlayer[]
}
export default Board;