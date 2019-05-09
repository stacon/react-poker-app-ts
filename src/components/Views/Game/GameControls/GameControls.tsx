import React from 'react';
import './GameControls.module.css';
import { AppState } from 'src/models/App/app.store';
import { connect } from 'react-redux';
import { raise, changeRaiseAmount, checkCall, replaceCards, fold } from 'src/models/Game/game.actions.creator';
import { GameStatus } from 'src/enums';
import { getGameStatus, getMainPlayer, getGameAmountForRaise, getSelectedCardsForReplacementNumber } from 'src/models/Game/game.selectors';

interface Props {
  pid: string,
  balance: number,
  onChangeRaiseAmount: Function,
  amountForRaise: number,
  selectedCardsForReplacement?: number,
  onRaise: Function,
  onCheck: Function,
  onFold: Function,
  onReplaceCards: Function,
  status: number
}

export const gameControls = (
  { 
    balance,
    onChangeRaiseAmount,
    selectedCardsForReplacement,
    amountForRaise,
    onRaise,
    onCheck,
    onFold,
    onReplaceCards,
    status,
    pid,
  }: Props
) => (
    <div className="game-control-container">
      <li className={'status' + status} onClick={() => onFold(pid)}>Fold</li>
      <li className={'status' + status} onClick={() => status % 2 === 0 ? onCheck(pid) : null}>Check</li>
      <li className={'status' + status}>
      <input
        className="raise-range"
        id='raise'
        type="range"
        min={1}
        max={status%2 === 0? balance: 10}
        step="1"
        value={amountForRaise}
        onChange={(event) => onChangeRaiseAmount(+event.target.value)}
      >
      </input>
        <div>{amountForRaise.toFixed(2)}</div>
        <div className="raise" onClick={() => status % 2 === 0 ? onRaise(amountForRaise, pid) : null } >Raise</div></li>
      {status === GameStatus._Discard ?
        <li className="status2" onClick={() => onReplaceCards(pid, selectedCardsForReplacement)}>
          {selectedCardsForReplacement && selectedCardsForReplacement > 0 ? `Replace ${selectedCardsForReplacement} Cards` : 'Keep Cards'}
        </li>
      : null}
    </div>
  )

const mapStateToProps = (state: AppState) => {
  return {
    pid: !!getMainPlayer(state).pid ? !!getMainPlayer(state).pid : '0',
    balance: !!getMainPlayer(state).balance ? getMainPlayer(state).balance : 0,
    amountForRaise: getGameAmountForRaise(state),
    status: getGameStatus(state),
    selectedCardsForReplacement: getSelectedCardsForReplacementNumber(state),
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onRaise: (amount: number, pid: string) => {
      dispatch(raise({amount, pid}));
    },
    onFold: (pid: string) => {
      dispatch(fold({pid}));
    },
    onCheck: (pid: string) => {
      dispatch(checkCall({pid}));
    },
    onChangeRaiseAmount: (amount: number): void => {
      dispatch(changeRaiseAmount(amount));
    },
    onReplaceCards: (pid: string, cardsForReplacement: number) => {
      dispatch(replaceCards({pid, cardsForReplacement}));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(gameControls);