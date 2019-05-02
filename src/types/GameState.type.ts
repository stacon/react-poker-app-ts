import { UICard, IPlayer } from '.';

interface GameState {
  players: IPlayer[],
  deck: UICard[],
  dealerIndex: number,
  currentPlayerId: number,
  pot: number,
  phase: {
    statusId: number,
    playersIDsInGamePhase: number[],
    playerIDsTookAction: number[]
  }
  amountForRaise: number,
}

export default GameState;