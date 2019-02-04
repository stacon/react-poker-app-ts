// core
import React from 'react';

// components
import Player from '../Player/Player';

import './Board.module.css';
import { IPlayer } from 'src/reducers/GameView.reducer';
// import { UIGetStringArrayFromFinalHands, UIGetWinnerFromPlayers } from '../../../../libs/evaluateHand/helpers';


const Board = (props: Props): JSX.Element => {

  const { players } = props;

  // const handPowers: string[] = UIGetStringArrayFromFinalHands(players);
  const gridItems: JSX.Element[] = Array(9).fill(null);
  const playersGrid: JSX.Element[] | JSX.Element = (!players) ? <div></div> : gridItems.map((_, index) => {
    if (index === 1 && players.length === 2) {

      return (
        <div className={"grid-item"}>
          <Player key={players[1].name} {...players[1]} />
        </div>
      )
    }

    else if (index === 1 && players.length === 4) {
      return (
        <div className={"grid-item"}>
          <Player key={players[2].name} {...players[2]} />
        </div>
      )
    }

    else if (index === 3 && players.length >= 3) {
      return (
        <div className={"grid-item"}>
          <Player key={players[1].name} {...players[1]} />
        </div>
      )
    }

    else if (index === 5 && players.length === 4) {
      return (
        <div className={"grid-item"}>
          <Player key={players[3].name} {...players[3]} />
        </div>
      )
    }

    else if (index === 5 && players.length === 3) {
      return (
        <div className={"grid-item"}>
          <Player key={players[2].name} {...players[2]} />
        </div>
      )
    }
    else if (index === 7) {
      return (
        <div className={"grid-item"}>
          <Player key={players[0].name} {...players[0]} />
        </div>
      )
    }
    else {
      return (
        <div className={"grid-item"}></div>
      )
    }
  })


  return (
    <section className="board_wrapper">

      <div className="inner-wrapper grid">
        {
          players && players.length ? playersGrid : null
        }
      </div>
      <div className="status-wrapper">
        <div className="inner-wrapper">
          <ul></ul>
        </div>
      </div>
    </section>
  )

}

interface Props {
  players: IPlayer[]
}
export default Board;