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
  PLACE_ANTE,
  RAISE,
  RAISE_SUCCESSFUL,
  REPLACE_CARDS,
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
  REPLACE_CARDS_SUCCESS,
  onEvaluationCompletion,
  EVALUATION_COMPLETED,
  evaluationCompletionSuccessful,
  replaceCards,
} from './game.actions.creator';

import { IPlayer, UICard } from 'src/types';
import { AppState } from '../App/app.store';
import { GameStatus } from 'src/enums';
import { Action } from 'redux';
import { getGamePlayers, getGamePot, getCurrentPlayerId, getGameStatus, getGameDeck, getGameState, getNextPlayerId, getHighestRoundPot, getGamePhase, getActivePlayersIDs, getActivePlayers, getPlayerIdByName } from './game.selectors';
import { getWinnerResult } from 'src/libs/Hand/handEvaluation.helper';
import WinnerResult from 'src/types/WinnerResult.type';

const startGameEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(START_GAME),
  map((action: any) => {
    const { payload } = action;
    const players: IPlayer[] = _.times(payload.numberOfPlayers)
      .map(i => new IPlayer(
        i === 0 ? payload.name : `Player_${i + 1}`,
        i === 0 ? payload.balance : 1000
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
      newPlayers[0].hand.forEach((card, cardIndex) => newPlayers[0].hand[cardIndex].flipped = true)
    return cardsDealt({
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
    const { pid } = payload;
    const players: IPlayer[] = getActivePlayers(state$.value);
    const deck: UICard[] = getGameDeck(state$.value);
    const hand: any[] = players[pid].hand.reduce(
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
      players[pid].hand
    );

    if (pid === 0) {
      hand.forEach((card, cardIndex) => hand[cardIndex].flipped = true )
    }

    players[pid] = {
      ...players[pid],
      hand
    };

    const phase = getGamePhase(state$.value);
    if(phase.playerIDsTookAction.indexOf(pid) === -1) {
      phase.playerIDsTookAction.push(pid);
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
    const clickedCard: UICard = players[0].hand[payload.key]
    clickedCard.selected = clickedCard.selected || cardsForReplacement < 3 ?
      !clickedCard.selected : clickedCard.selected;
    return cardSelectedSuccessfully({ players })
  }),
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
    const players: IPlayer[] = getGamePlayers(state$.value);
    const highestRoundPot: number = getHighestRoundPot(state$.value);
    const playerRoundPot: number = getGamePlayers(state$.value)[pid].roundPot;
    const amountToCall: number = highestRoundPot - playerRoundPot;
    const newBalance: number = getGamePlayers(state$.value)[pid].balance - amountToCall;
    const pot = getGamePot(state$.value) + amountToCall;
    const phase = getGamePhase(state$.value);
    if(phase.playerIDsTookAction.indexOf(pid) === -1) {
      phase.playerIDsTookAction.push(pid);
    }    

    players[pid].roundPot += amountToCall;
    players[pid].balance = newBalance;
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

const onSuccessfulCardsReplacement = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(REPLACE_CARDS_SUCCESS),
  map(() => shiftPlayerTurn())
)

const raiseRequestEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(RAISE),
  map((action: any) => {
    const { payload } = action;
    const { amount, pid } = payload;
    const players: IPlayer[] = getGamePlayers(state$.value);
    const newBalance: number = players[pid].balance - amount;
    const pot = getGamePot(state$.value) + amount;
    const phase = getGamePhase(state$.value);
    if(phase.playerIDsTookAction.indexOf(pid) === -1) {
      phase.playerIDsTookAction.push(pid);
    }

    players[pid].roundPot += amount;
    players[pid].balance = newBalance;
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
  map(() => {
    return playerTurnShiftSuccessFul({
      currentPlayerId: getNextPlayerId(state$.value),
    })
  })
)

const onCurrentPlayerIdChangeEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => state$.pipe(
  map(() => (getGameState(state$.value).currentPlayerId)),
  distinctUntilChanged(),
  filter(id => id !== -1),
  map((currentPlayerId) => {
    return currentPlayerChanged({ currentPlayerId });
  }),
)

const onEvaluationPhaseEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => state$.pipe(
  map(() => (getGamePhase(state$.value).statusId)),
  distinctUntilChanged(),
  filter(id => id === 5),
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
    const winnerId = getPlayerIdByName(state$.value, playerWon.name);
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

const onBotPlayerTurn = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CURRENT_PLAYER_CHANGED),
  filter(() => getCurrentPlayerId(state$.value) !== 0),
  delay(1000),
  map((action: any) => {
    const { payload } = action;
    const { currentPlayerId } = payload;
    const phase = getGamePhase(state$.value);
    const players = getGamePlayers(state$.value);
    const cardsForReplacement: number = players[currentPlayerId].hand.filter(cards => cards.selected).length;

    if(phase.playerIDsTookAction.indexOf(currentPlayerId) === -1) {
      phase.playerIDsTookAction.push(currentPlayerId);
    }

    if(phase.statusId === GameStatus._Discard) {
      return replaceCards({
        pid: currentPlayerId,
        cardsForReplacement,
      });
    }
    return checkCall({pid: currentPlayerId});
  }),
)

const afterPlayerChangeWithOneRemainingPlayer = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CURRENT_PLAYER_CHANGED),
  filter(() => getActivePlayersIDs(state$.value).length === 1),
  map(() => changeStatus({statusId: GameStatus._EvaluationPhase})),
)

const afterPlayerChange = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CURRENT_PLAYER_CHANGED),
  filter(() => getActivePlayersIDs(state$.value).length > 1),
  filter(() => {
    const everyOneHasTakenAction: boolean = getActivePlayersIDs(state$.value).length === getGamePhase(state$.value).playerIDsTookAction.length;
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
  onBotPlayerTurn,
  onSuccessfulCallCheckEpic,
  onSuccessfulRaiseEpic,
  afterPlayerChangeWithOneRemainingPlayer,
  afterPlayerChange,
  onEvaluationPhaseEpic,
  onSuccessfulCardsReplacement,
  onEvaluationCompletionEpic,
);