import { AppState } from "../App/app.store";
import { GameState, IPlayer } from 'src/types';
import { GameStatus } from 'src/enums';

export const getGameState = (state: AppState): GameState => state.game;

export const gameHasPlayers = (state: AppState): boolean => (
    state.game.players.length > 0
)

export const gameHasStarted = (state: AppState): boolean => (
    gameHasPlayers(state) &&
    !!getGameState(state).status &&
    !!getGameState(state).pot &&
    !!getGameState(state).deck &&
    !!getGameState(state).dealerIndex
);

export const getGamePlayers = (state: AppState): IPlayer[] => [...getGameState(state).players];
export const getGameStatus = (state: AppState): GameStatus => getGameState(state).status;
export const getGamePot = (state: AppState): number => getGameState(state).pot;