import { AppState } from "../App/app.store";
import { GameState, IPlayer, UICard } from 'src/types';
import { GameStatus } from 'src/enums';

export const getGameState = (state: AppState): GameState => state.game;

export const gameHasPlayers = (state: AppState): boolean => (
    state.game.players.length > 0
)

export const gameHasStarted = (state: AppState): boolean => (
    gameHasPlayers(state) &&
    getGameStatus(state) > GameStatus._NewGame
);

// By ref
export const getGamePlayers = (state: AppState): IPlayer[] => [...getGameState(state).players];
export const getMainPlayer = (state: AppState): IPlayer => ({...getGameState(state).players[0]});
export const getGameDeck = (state: AppState): UICard[] => [...getGameState(state).deck];
export const getPlayerById = (state: AppState, id: number) => ({...getGamePlayers(state)[id]});
export const getCurrentPlayer = (state: AppState) => ({...getGamePlayers(state)[getCurrentPlayerId(state)]});
export const getGamePhase = (state: AppState) => ({...getGameState(state).phase});

// By val
export const getCurrentPlayerId = (state: AppState): number => getGameState(state).currentPlayerId;
export const getGameStatus = (state: AppState): GameStatus => getGamePhase(state).statusId;
export const getGamePot = (state: AppState): number => getGameState(state).pot;
export const getGameDealerIndex = (state: AppState): number => getGameState(state).dealerIndex;
export const getGameAmountForRaise = (state: AppState): number => getGameState(state).amountForRaise;
export const getSelectedCardsForReplacementNumber = (state: AppState): number => getMainPlayer(state).hand.filter((card: UICard) => card.selected).length;

// Advanced Selectors
export const getPreviousPlayerId = (state: AppState) => {
  const currentPlayerId: number = getGameState(state).currentPlayerId;
  return currentPlayerId - 1 === -1 ? getGamePlayers(state).length - 1 : currentPlayerId - 1
}

export const getNextPlayerId = (state: AppState) => (
  getGameState(state).currentPlayerId + 1 > getGamePlayers(state).length - 1 ? 0 : getGameState(state).currentPlayerId + 1
);

export const getHighestRoundPot = (state: AppState) => (
  Math.max(...getGamePlayers(state)
    .filter(({roundPot}) => roundPot > getCurrentPlayer(state).roundPot)
    .map(player => player.roundPot))
)