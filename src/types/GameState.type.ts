import { UICard, IPlayer } from '.';

interface GameState {
  players: IPlayer[],
  deck: UICard[],
  dealerPID: string,
  currentPlayerPID: string,
  pot: number,
  phase: {
    statusId: number,
    playersPIDsInGamePhase: string[],
    playerPIDsTookAction: string[]
  }
  amountForRaise: number,
}

export default GameState;