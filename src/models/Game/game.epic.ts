import { map, tap, filter, delay } from 'rxjs/operators';
import { ofType, combineEpics, ActionsObservable, StateObservable } from 'redux-observable';
import _ from 'lodash';
import { history } from "../../components/Routes";

import {
  CARD_CLICKED,
  DEAL_CARDS,
  PLACE_ANTE,
  REPLACE_CARDS,
  START_GAME,
  antePlacedSuccessfully,
  cardsDealt,
  cardSelectedSuccessfully,
  placeAnte,
  replaceCardsSuccess,
  resetMessages,
  startGameSuccess,
} from './game.actions.creator';

import { GameState, IPlayer, UICard } from 'src/types';
import store, { AppState } from '../App/app.store';
import { GameStatus } from 'src/enums';
import { Action } from 'redux';

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
    const status: number = state.status ? state.status + 1 : 0;
    return replaceCardsSuccess({
      players,
      deck: newDeck,
      status
    });
  })
);

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
    return store.dispatch(resetMessages());
  })
)

const dealCardsEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(DEAL_CARDS),
  tap(() => store.dispatch(resetMessages())),
  map(() => {
    let newDeck: UICard[] = (state$.value.game.deck) ? [...state$.value.game.deck] : [];
    let newPlayers: IPlayer[] = (state$.value.game.players) ?
      state$.value.game.players.map((player: IPlayer) => ({
        ...player,
        hand: newDeck.splice(0, 5)
      }
      )) : [];
    return cardsDealt({
      deck: newDeck,
      players: newPlayers,
    });
  }),
  delay(200), // TODO: Better approach?
  tap(() => store.dispatch(placeAnte())),
)

const cardClickedEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(CARD_CLICKED),
  filter(() => state$.value.game.status === GameStatus._Discard),
  map((action: any) => {
    console.log('Am in')
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
    let players: IPlayer[] = state$.value.game.players ? [...state$.value.game.players] : [];
    players.forEach((player) => (player.balance -= 10));
    let pot = (state$.value.game.pot) ? state$.value.game.pot : 0;
    pot = pot + 10 * players.length;
    return antePlacedSuccessfully({
      players,
      pot
    })
  })
)

export default combineEpics(
  startGameEpic,
  dealCardsEpic,
  replaceCardsEpic,
  placeAnteEpic,
  cardClickedEpic,
);