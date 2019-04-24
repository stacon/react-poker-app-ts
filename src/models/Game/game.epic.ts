import { map, tap, filter, delay, distinctUntilChanged } from 'rxjs/operators';
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
  placeAnte,
  playerTurnShiftSuccessFul,
  raiseSuccessful,
  replaceCardsSuccess,
  startGameSuccess,
  shiftPlayerTurn,
} from './game.actions.creator';

import { GameState, IPlayer, UICard } from 'src/types';
import store, { AppState } from '../App/app.store';
import { GameStatus } from 'src/enums';
import { Action } from 'redux';
import { getGamePlayers, getGamePot, getCurrentPlayerId, getGameStatus, getGameDeck, getGameState, getNextPlayerId, getHighestRoundPot } from './game.selectors';

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
    return cardsDealt({
      deck: newDeck,
      players: newPlayers,
    });
  }),
  delay(200), // TODO: Better approach?
  tap(() => store.dispatch(placeAnte())),
)

const replaceCardsEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(REPLACE_CARDS),
  map(() => {
    const state: GameState = state$.value.game;
    const players: IPlayer[] = [...(state.players || [])];
    const [player] = players;
    const newDeck: UICard[] = [...(state.deck || [])];
    const newHand: any[] = player.hand.reduce(
      (newHand, card, index) => {
        if (card.selected) {
          return [
            ...newHand.slice(0, index),
            newDeck.pop(),
            ...newHand.slice(index + 1)
          ];
        }
        return newHand;
      },
      player.hand
    );
    players[0] = {
      ...player,
      hand: newHand
    };
    const status: number = getGameStatus(state$.value);
    return replaceCardsSuccess({
      players,
      deck: newDeck,
      status
    });
  })
);

const cardClickedEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CARD_CLICKED),
  filter(() => getGameStatus(state$.value) === GameStatus._Discard),
  map((action: any) => {
    const { payload } = action;
    const cardsForReplacement: number = state$.value.game.players ? state$.value.game.players[0].hand.filter((card: UICard) => card.selected).length : 0;
    let players = state$.value.game.players ? [...state$.value.game.players] : [];
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

    players[pid].roundPot += amountToCall;
    players[pid].balance = newBalance;
    return callCheckSuccessful({
      players,
      pot,
    })
  })
)

const onSuccessfulCallCheckEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(CALL_CHECK_SUCCESSFUL),
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
    players[pid].roundPot += amount;
    players[pid].balance = newBalance;
    return raiseSuccessful({
      players,
      pot,
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

const afterCurrentPlayerChange = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CURRENT_PLAYER_CHANGED),
  filter(() => getCurrentPlayerId(state$.value) !== 0),
  map((action: any) => {
    const { payload } = action;
    const { currentPlayerId } = payload;
    return checkCall(currentPlayerId);
  }),
)

// TODO: Status should be changed dynamically
// const status: number = state.status ? state.status + 1 : 0;

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
  afterCurrentPlayerChange,
  onSuccessfulCallCheckEpic,
  onSuccessfulRaiseEpic,
);