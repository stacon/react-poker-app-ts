import { map } from 'rxjs/internal/operators/map';
import { ofType, combineEpics, ActionsObservable, StateObservable } from "redux-observable";
import { 
  CARDS_DEALT, 
  ANTE_PLACED_SUCCESSFULLY, 
  GAME_STARTED, 
  EVALUATION_COMPLETED,
  RAISE,
  REPLACE_CARDS,
} from '../Game/game.actions.creator';
import { 
  ADD_MESSAGE, 
  addMessage,
  messageAddedSuccessfully, 
  resetMessages 
} from './messages.action.creator';
import { Action } from 'redux';
import { AppState } from '../App/app.store';
import { getMessagesList } from './messages.selectors';
import { IPlayer } from 'src/types';
import { getPlayerById, getActivePlayers } from '../Game/game.selectors';

const cardsDealtEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(CARDS_DEALT),
  map(() => addMessage('Hands Dealt! Good Luck')),
);

const onRaiseRequestEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(RAISE),
  map((action: any) => {
    const { payload } = action;
    const { amount, pid } = payload;
    const player: IPlayer = getPlayerById(state$.value, pid);
    return addMessage(`${player.name} raised by ${amount.toFixed(2)} $.`)
  }),
)

const onReplaceCardsEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(REPLACE_CARDS),
  map((action: any) => {
    const { payload } = action;
    const { pid, cardsForReplacement } = payload;
    const players: IPlayer[] = getActivePlayers(state$.value);

    return addMessage(
      cardsForReplacement < 1 ? 
      `${players[pid].name} didn't replace any cards.` :
      `${players[pid].name} replaced ${cardsForReplacement} cards.`
    );
  }),
);

const onEvaluationCompletionEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(EVALUATION_COMPLETED),
  map((action: any) => {
    const { payload } = action;
    const { playerWon, winningHand } = payload;
    return addMessage(
      `Winner is ${playerWon.name} with ${winningHand}`,
    )
  }),
)

const startGameEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(GAME_STARTED),
  map(() => resetMessages()),
);

const antesPlacedEpic = (action$: ActionsObservable<Action>) => action$.pipe(
  ofType(ANTE_PLACED_SUCCESSFULLY),
  map(() => addMessage('Players Placed their Antes!')),
);

const addMessageEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(ADD_MESSAGE),
  map((action: any) => {
    const { payload } = action;
    const { message } = payload;
    const list: string[] = [...getMessagesList(state$.value), message];
    return messageAddedSuccessfully({list})
  }),
);

export default combineEpics(
  cardsDealtEpic,
  antesPlacedEpic,
  addMessageEpic,
  startGameEpic,
  onEvaluationCompletionEpic,
  onRaiseRequestEpic,
  onReplaceCardsEpic,
)