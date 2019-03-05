import { UICard, IPlayer } from '.';

interface GameState {
  players?: IPlayer[],
  deck?: UICard[],
  status?: number,
  dealerIndex?: number,
  amountForRaise?: number,
  pot?: number
}

export default GameState;