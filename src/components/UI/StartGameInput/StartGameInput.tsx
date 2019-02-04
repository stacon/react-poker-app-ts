import React from 'react';
import './StartGameInput.module.css';

const startGameInput = (
  { 
    numberOfPlayersSelected,
    name,
    balance,
    onGameStartHandler,
    onChangeNumberOfPlayers
   }: Props) => (
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
        onChange={(event) => onChangeNumberOfPlayers(+event.target.value)}
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
      onClick={() => onGameStartHandler({
        numberOfPlayers:+numberOfPlayersSelected,
        name,
        balance
      })}
    >
      Start Game with
      <span className="button-players-number"> {numberOfPlayersSelected} </span>
      players
    </div>
  </>
)

interface Props {
  numberOfPlayersSelected: number,
  name: string,
  balance: number,
  onGameStartHandler: Function,
  onChangeNumberOfPlayers: Function,
}


export default startGameInput;