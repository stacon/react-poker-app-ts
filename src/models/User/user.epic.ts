import { ActionsObservable, StateObservable, ofType, combineEpics } from "redux-observable";
import { Action } from 'redux';
import { AppState } from '../App/app.store';
import { RAISE, CALL_CHECK, EVALUATION_COMPLETED } from '../Game/game.actions.creator';
import { getUserBalance } from '../Messages/messages.selectors';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { userBalanceChangedSuccessfully } from './user.action.creator';
import { getGamePlayers, getHighestRoundPot, getPlayerIndexByName, getGamePot } from '../Game/game.selectors';

const changeUserBalanceOnRaiseEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
    ofType(RAISE),
    filter((action: any) => action.payload.pid === 0),
    map((action: any) => {
        const { payload } = action;
        const { amount } = payload;
        const oldBalance: number = getUserBalance(state$.value);
        const newBalance: number = oldBalance - amount;
        return userBalanceChangedSuccessfully({ balance: newBalance })
    })
);

const changeUserBalanceOnCheckCallEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
    ofType(CALL_CHECK),
    filter((action: any) => action.payload.pid === 0),
    map((action: any) => {
        const { payload } = action;
        const { pid } = payload;
        const highestRoundPot: number = getHighestRoundPot(state$.value);
        const playerRoundPot: number = getGamePlayers(state$.value)[pid].roundPot;
        const amountToCall: number = highestRoundPot - playerRoundPot;
        const newBalance: number = getGamePlayers(state$.value)[pid].balance - amountToCall;
        return userBalanceChangedSuccessfully({ balance: newBalance })
    })
);

const onEvaluationCompletionEpic = (action$: ActionsObservable<Action>, state$: StateObservable<AppState>) => action$.pipe(
    ofType(EVALUATION_COMPLETED),
    filter((action: any) => {
        const { payload } = action;
        const { playerWon } = payload;
        return getPlayerIndexByName(state$.value, playerWon.name) === 0;
    }),
    map(() => {
        const balance = getUserBalance(state$.value) + getGamePot(state$.value)
        return userBalanceChangedSuccessfully({ balance });
    }),
)

export default combineEpics(
    changeUserBalanceOnRaiseEpic,
    changeUserBalanceOnCheckCallEpic,
    onEvaluationCompletionEpic,
)