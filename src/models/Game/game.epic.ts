import { map, tap } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import _ from 'lodash';
import { history } from "../../components/Routes";

import {
  REPLACE_CARDS,
  replaceCardsSuccess,
  START_GAME,
  startGameSuccess,
  resetMessages,
  DEAL_CARDS,
  cardsDealt,
  // placeAnte,
  PLACE_ANTE,
  antePlacedSuccessfully,
  CARD_CLICKED,
  cardSelectedSuccessfully,
} from './game.actions.creator';

import { GameState, IPlayer, UICard } from 'src/types';
import store from '../App/app.store';
import { GameStatus } from './game.reducer';

const replaceCardsEpic = (action$: any, state$: any) => action$.pipe(
  ofType(REPLACE_CARDS),
  map(() => {
    const state: GameState = state$.value.game;
    const players: IPlayer[] = [...(state.players || [])];
    const [player] = players;
    const newDeck: any[] = [...(state.deck || [])];
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

const startGameEpic = (action$: any) => action$.pipe(
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

const dealCardsEpic = (action$: any, state$: any) => action$.pipe(
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
  // tap(() => store.dispatch(placeAnte())),
)

const cardClickedEpic = (action$: any, state$: any) => action$.pipe(
  ofType(CARD_CLICKED),
  map((action: any) => {
    const { payload } = action;
    if (state$.value.status !== GameStatus._Discard) return;
    const cardsForReplacement: number = state$.value.game.players ? state$.value.game.players[0].hand.filter((card: UICard) => card.selected).length : 0;
    let players = state$.value.game.players ? [...state$.value.game.players] : [];
    const clickedCard: UICard = players[0].hand[payload.key]
    clickedCard.selected = clickedCard.selected || cardsForReplacement < 3 ?
      !clickedCard.selected : clickedCard.selected;
    return cardSelectedSuccessfully({ players })
  }),
)

const placeAnteEpic = (action$: any, state$: any) => action$.pipe(
  ofType(PLACE_ANTE),
  map(() => {
    let players: IPlayer[] = (state$.value.game.players) ? [...state$.value.game.players] : [];
    const newBalance: number = players[0].balance - 10;
    players.forEach((player) => (player.balance = newBalance));
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