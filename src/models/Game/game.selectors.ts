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

// By val
export const getCurrentPlayerId = (state: AppState): number => getGameState(state).currentPlayerId;
export const getGameStatus = (state: AppState): GameStatus => getGameState(state).status;
export const getGamePot = (state: AppState): number => getGameState(state).pot;
export const getGameDealerIndex = (state: AppState): number => getGameState(state).dealerIndex;
export const getGameAmountForRaise = (state: AppState): number => getGameState(state).amountForRaise;
export const getSelectedCardsForReplacementNumber = (state: AppState): number => getMainPlayer(state).hand.filter((card: UICard) => card.selected).length;