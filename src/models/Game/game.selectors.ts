import { AppState } from "../App/app.store";
import { GameState, IPlayer, UICard } from 'src/libs/types';
import { GameStatus } from 'src/enums';
import GamePhase from 'src/libs/types/GamePhase.type';

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
export const getActivePlayersPIDs = (state: AppState): string[] => [...getGamePhase(state).playersPIDsInGamePhase];
export const getActivePlayers = (state: AppState): IPlayer[] => [...getActivePlayersPIDs(state).map((pid: string) =>({...getGamePlayers(state)[getPlayerIndexByPid(state, pid)]}))];
export const getMainPlayer = (state: AppState): IPlayer => ({...getGameState(state).players[0]}); // TODO: Might need improvement
export const getGameDeck = (state: AppState): UICard[] => [...getGameState(state).deck];
export const getPlayerById = (state: AppState, id: number): IPlayer => ({...getGamePlayers(state)[id]});
export const getCurrentPlayer = (state: AppState): IPlayer => ({...getGamePlayers(state)[getCurrentPlayerIndex(state)]});
export const getGamePhase = (state: AppState): GamePhase => ({...getGameState(state).phase});

// By val
export const getCurrentPlayerPID = (state: AppState): string => getGameState(state).currentPlayerPID;
export const getCurrentPlayerIndex = (state: AppState): number => getPlayerIndexByPid(state, getCurrentPlayerPID(state));
export const getGameStatus = (state: AppState): GameStatus => getGamePhase(state).statusId;
export const getGamePot = (state: AppState): number => getGameState(state).pot;
export const getGameDealerPID = (state: AppState): string => getGameState(state).dealerPID;
export const getGameAmountForRaise = (state: AppState): number => getGameState(state).amountForRaise;
export const getSelectedCardsForReplacementNumber = (state: AppState): number => getMainPlayer(state).hand.filter((card: UICard) => card.selected).length;
export const getPlayerIndexByPid = (state: AppState, pid: string): number => getGamePlayers(state).findIndex(player => player.pid === pid);
export const isMainPlayerTurn = (state: AppState): boolean => getMainPlayer(state).pid === getCurrentPlayerPID(state);

// Advanced Selectors
export const getPreviousPlayerIndex = (state: AppState): number => {
  const currentPlayerPID: string = getGameState(state).currentPlayerPID;
  const currentPlayerIndex: number = getPlayerIndexByPid(state, currentPlayerPID)
  return currentPlayerIndex - 1 === -1 ? getGamePlayers(state).length - 1 : currentPlayerIndex - 1
}

export const getNextPlayerIndex = (state: AppState): number => {
  const { currentPlayerPID } = getGameState(state);
  const numberOfActivePlayers: number = getActivePlayersPIDs(state).length;
  const playerIndex: number = getActivePlayersPIDs(state).findIndex(pid => pid === currentPlayerPID);
  return (playerIndex + 1 >= numberOfActivePlayers) ? 0 : playerIndex + 1;
};

export const getHighestRoundPot = (state: AppState) => (
  Math.max(...getActivePlayers(state)
    .filter(({roundPot}) => roundPot >= getCurrentPlayer(state).roundPot)
    .map(player => player.roundPot)
  )
)

export const getPlayerIndexByName = (state: AppState, name: string): number => {
  const players: IPlayer[] = getActivePlayers(state);
  return players.findIndex(player => player.name === name);
}