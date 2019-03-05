import { map } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import {
 REPLACE_CARDS,
 replaceCardsSuccess,
} from './game.actions.creator';

import { GameState, IPlayer } from 'src/types';

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
     hand:newHand
   };
   const status: number = state.status ? state.status + 1  : 0;
   return replaceCardsSuccess({
     players,
     deck: newDeck,
     status
   });
 })
);

export default combineEpics(
 replaceCardsEpic,
);