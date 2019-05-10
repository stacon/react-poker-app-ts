import { map, tap, filter, distinctUntilChanged, delay } from 'rxjs/operators';
import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable';
import _ from 'lodash';
import { history } from "../../components/Routes";

import {
  CALL_CHECK,
  CALL_CHECK_SUCCESSFUL,
  CARD_CLICKED,
  CURRENT_PLAYER_CHANGED,
  DEAL_CARDS,
  EVALUATION_COMPLETED,
  PLACE_ANTE,
  PLAYER_FOLDED,
  PLAYER_FOLDING_COMPLETED,
  RAISE,
  RAISE_SUCCESSFUL,
  REPLACE_CARDS,
  REPLACE_CARDS_SUCCESS,
  START_GAME,
  SHIFT_PLAYER_TURN,
  antePlacedSuccessfully,
  callCheckSuccessful,
  cardsDealt,
  cardSelectedSuccessfully,
  checkCall,
  currentPlayerChanged,
  playerTurnShiftSuccessFul,
  raiseSuccessful,
  replaceCardsSuccess,
  startGameSuccess,
  shiftPlayerTurn,
  changeStatus,
  onEvaluationCompletion,
  evaluationCompletionSuccessful,
  replaceCards,
  playerFoldingSucceeded,
} from './game.actions.creator';

import { IPlayer, UICard } from 'src/types';
import { AppState } from '../App/app.store';
import { GameStatus } from 'src/enums';
import { Action } from 'redux';
import { getGamePlayers, getGamePot, getGameStatus, getGameDeck, getGameState, getNextPlayerIndex, getHighestRoundPot, getGamePhase, getActivePlayersPIDs, getActivePlayers, getPlayerIndexByPid, getMainPlayer, getPlayerIndexByName, getCurrentPlayerIndex } from './game.selectors';
import { getWinnerResult } from 'src/libs/Hand/handEvaluation.helper';
import WinnerResult from 'src/types/WinnerResult.type';

const startGameEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(START_GAME),
  map((action: any) => {
    const { payload } = action;
    const players: IPlayer[] = _.times(payload.numberOfPlayers)
      .map(i => new IPlayer(
        i.toString(),
        i === 0 ? payload.name : `Player_${i + 1}`,
        i === 0 ? payload.balance : 1000,
      ))
    return startGameSuccess({ players });
  }),
  tap(() => {
    history.push('/game');
  })
)

const dealCardsEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(DEAL_CARDS),
  map(() => {
    const newDeck: UICard[] = (getGameDeck(state$.value));
    const newPlayers: IPlayer[] =
      getGamePlayers(state$.value).map((player: IPlayer) => ({
        ...player,
        hand: newDeck.splice(0, 5)
      }
      ));

      const i: number = getPlayerIndexByPid(state$.value, getMainPlayer(state$.value).pid);
      newPlayers[i].hand.forEach((card, cardIndex) => newPlayers[0].hand[cardIndex].flipped = true)
    return cardsDealt({
      currentPlayerPID: getMainPlayer(state$.value).pid,
      deck: newDeck,
      players: newPlayers,
    });
  }),
  // delay(200), // TODO: Better approach?
  // tap(() => store.dispatch(placeAnte())),
)

const replaceCardsEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(REPLACE_CARDS),
  map((action: any) => {
    const { payload } = action;
    const { pid }: { pid: string } = payload;
    const players: IPlayer[] = getActivePlayers(state$.value);
    const deck: UICard[] = getGameDeck(state$.value);
    const i: number = getPlayerIndexByPid(state$.value, pid);
    const hand: any[] = players[i].hand.reduce(
      (newHand, card, index) => {
        if (card.selected) {
          return [
            ...newHand.slice(0, index),
            deck.pop(),
            ...newHand.slice(index + 1)
          ];
        }
        return newHand;
      },
      players[i].hand
    );

    if (pid === getMainPlayer(state$.value).pid) {
      hand.forEach((card, cardIndex) => hand[cardIndex].flipped = true )
    }

    players[i] = {
      ...players[i],
      hand
    };

    const phase = getGamePhase(state$.value);
    if(phase.playerPIDsTookAction.indexOf(pid) === -1) {
      phase.playerPIDsTookAction.push(pid);
    }

    return replaceCardsSuccess({
      phase,
      players,
      deck,
    });
  }),
);

const cardClickedEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CARD_CLICKED),
  filter(() => getGameStatus(state$.value) === GameStatus._Discard),
  map((action: any) => {
    const { payload } = action;
    const cardsForReplacement: number = getGamePlayers(state$.value) ? getGamePlayers(state$.value)[0].hand.filter((card: UICard) => card.selected).length : 0;
    const players = getGamePlayers(state$.value);
    const mainPlayerIndex: number = getPlayerIndexByPid(state$.value, getMainPlayer(state$.value).pid)
    const clickedCard: UICard = players[mainPlayerIndex].hand[payload.key]
    clickedCard.selected = clickedCard.selected || cardsForReplacement < 3 ?
      !clickedCard.selected : clickedCard.selected;
    return cardSelectedSuccessfully({ players })
  }),
)

const onPlayerFoldEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(PLAYER_FOLDED),
  map((action: any) => {
    const { payload } = action;
    const { pid } = payload;

    const i: number = getPlayerIndexByPid(state$.value, pid);
    const phase = getGamePhase(state$.value);
    const players = getActivePlayers(state$.value);
    players[i].hand = [];
    const activePlayersPIDs: string[] = getActivePlayersPIDs(state$.value);
    activePlayersPIDs.splice(i);

    if(phase.playerPIDsTookAction.indexOf(pid) === -1) {
      phase.playerPIDsTookAction.push(pid);
    }


    return playerFoldingSucceeded({
      phase,
      players,
      activePlayersPIDs,
    })
  }),
)

const onSuccessfulPlayerFoldEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(PLAYER_FOLDING_COMPLETED),
  map(() => shiftPlayerTurn())
)

const placeAnteEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(PLACE_ANTE),
  map(() => {
    const players: IPlayer[] = getGamePlayers(state$.value);
    players.forEach((player) => (player.balance -= 10));
    const pot = getGamePot(state$.value) + + (10 * players.length);
    return antePlacedSuccessfully({
      players,
      pot
    })
  })
)

const callRequestEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CALL_CHECK),
  map((action: any) => {
    const { payload } = action;
    const { pid } = payload;
    const i = getPlayerIndexByPid(state$.value, pid)
    const players: IPlayer[] = getGamePlayers(state$.value);
    const highestRoundPot: number = getHighestRoundPot(state$.value);
    const playerRoundPot: number = getActivePlayers(state$.value)[i].roundPot;
    const amountToCall: number = highestRoundPot - playerRoundPot;
    const newBalance: number = getActivePlayers(state$.value)[i].balance - amountToCall;
    const pot = getGamePot(state$.value) + amountToCall;
    const phase = getGamePhase(state$.value);
    if(phase.playerPIDsTookAction.indexOf(pid) === -1) {
      phase.playerPIDsTookAction.push(pid);
    }

    players[i].roundPot += amountToCall;
    players[i].balance = newBalance;
    return callCheckSuccessful({
      players,
      pot,
      phase,
    })
  })
)

const onSuccessfulCallCheckEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(CALL_CHECK_SUCCESSFUL),
  map(() => shiftPlayerTurn())
)

const onSuccessfulCardsReplacementEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(REPLACE_CARDS_SUCCESS),
  map(() => shiftPlayerTurn())
)

const raiseRequestEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(RAISE),
  map((action: any) => {
    const { payload } = action;
    const { amount, pid } = payload;
    const i = getPlayerIndexByPid(state$.value, pid)
    const players: IPlayer[] = getGamePlayers(state$.value);
    const newBalance: number = players[i].balance - amount;
    const pot = getGamePot(state$.value) + amount;
    const phase = getGamePhase(state$.value);
    if(phase.playerPIDsTookAction.indexOf(pid) === -1) {
      phase.playerPIDsTookAction.push(pid);
    }

    players[i].roundPot += amount;
    players[i].balance = newBalance;
    return raiseSuccessful({
      players,
      pot,
      phase,
    })
  }),
)

const onSuccessfulRaiseEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(RAISE_SUCCESSFUL),
  map(() => shiftPlayerTurn())
)

const shiftPlayerTurnEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(SHIFT_PLAYER_TURN),
  filter(() => getGamePlayers(state$.value).length > 0),
  filter(() => getActivePlayersPIDs(state$.value).length > 1),
  map(() => {
    return playerTurnShiftSuccessFul({
      currentPlayerPID:  getGamePlayers(state$.value)[getNextPlayerIndex(state$.value)].pid,
    })
  })
)

const onCurrentPlayerIdChangeEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => state$.pipe(
  map(() => (getPlayerIndexByPid(state$.value, getGameState(state$.value).currentPlayerPID))),
  distinctUntilChanged(),
  filter(id => id !== -1),
  map((currentPlayerId) => {
    return currentPlayerChanged({ currentPlayerId }); // TODO: Follow it up
  }),
)

const onEvaluationPhaseEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => state$.pipe(
  map(() => (getGamePhase(state$.value).statusId)),
  distinctUntilChanged(),
  filter(id => id === GameStatus._EvaluationPhase),
  map(() => {
    const players = getActivePlayers(state$.value);
    const winnerResult: WinnerResult = getWinnerResult(players);
    return onEvaluationCompletion({
      playerWon: winnerResult.winningPlayer,
      winningHand: winnerResult.winningHandName,
    })
  }),
)

const onEvaluationCompletionEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(EVALUATION_COMPLETED),
  map((action:any) => {
    const { payload } = action;
    const { playerWon } = payload;
    const winnerId = getPlayerIndexByName(state$.value, playerWon.name);
    const gamePot = getGamePot(state$.value);
    const players = getActivePlayers(state$.value);
    players[winnerId].balance = players[winnerId].balance + gamePot
    players.forEach(
      (player, playerIndex) => player.hand.forEach(
        (card,cardIndex) => players[playerIndex].hand[cardIndex].flipped = true))
    return evaluationCompletionSuccessful({
      players
    })
  }),
)

const onBotPlayerTurnEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CURRENT_PLAYER_CHANGED),
  filter(() => getCurrentPlayerIndex(state$.value) !== 0),
  delay(1000),
  map((action: any) => {
    const { payload } = action;
    const { currentPlayerId } = payload;
    const phase = getGamePhase(state$.value);
    const players = getGamePlayers(state$.value);

    if(phase.playerPIDsTookAction.indexOf(currentPlayerId) === -1) {
      phase.playerPIDsTookAction.push(currentPlayerId);
    }

    if(phase.statusId === GameStatus._Discard) {
      const cardsForReplacement: number = players[currentPlayerId].hand.filter(cards => cards.selected).length;
      return replaceCards({
        pid: currentPlayerId,
        cardsForReplacement,
      });
    }
    return checkCall({pid: currentPlayerId});
  }),
)

const afterPlayerChangeWithOneRemainingPlayerEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CURRENT_PLAYER_CHANGED),
  filter(() => getActivePlayersPIDs(state$.value).length === 1),
  map(() => changeStatus({statusId: GameStatus._EvaluationPhase})),
)

const afterPlayerChangeEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CURRENT_PLAYER_CHANGED),
  filter(() => getActivePlayersPIDs(state$.value).length > 1),
  filter(() => {
    const everyOneHasTakenAction: boolean = getActivePlayersPIDs(state$.value).length === getGamePhase(state$.value).playerPIDsTookAction.length;
    const activePlayersBets: number[] = getActivePlayers(state$.value).map(player => player.roundPot);
    const everyOneHasSameBet: boolean = _.every(activePlayersBets, bet => bet === activePlayersBets[0]);
    return everyOneHasTakenAction && everyOneHasSameBet
  }),
  map(() => {
    const currentStatus: number = getGameStatus(state$.value);
    const nextStatusId: number = currentStatus + 1;
    return changeStatus({statusId: (nextStatusId <= 5) ? nextStatusId : GameStatus._Uninitialized});
  }),
)

export default combineEpics(
  startGameEpic,
  dealCardsEpic,
  replaceCardsEpic,
  placeAnteEpic,
  cardClickedEpic,
  raiseRequestEpic,
  shiftPlayerTurnEpic,
  onCurrentPlayerIdChangeEpic,
  callRequestEpic,
  onBotPlayerTurnEpic,
  onPlayerFoldEpic,
  onSuccessfulCallCheckEpic,
  onSuccessfulPlayerFoldEpic,
  onSuccessfulRaiseEpic,
  afterPlayerChangeWithOneRemainingPlayerEpic,
  afterPlayerChangeEpic,
  onEvaluationPhaseEpic,
  onSuccessfulCardsReplacementEpic,
  onEvaluationCompletionEpic,
);