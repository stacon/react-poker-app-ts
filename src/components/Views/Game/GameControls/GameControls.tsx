import React from 'react';
import './GameControls.module.css';
import { AppState } from 'src/models/App/app.store';
import { connect } from 'react-redux';
import { raise, changeRaiseAmount, call, check, replaceCards } from 'src/models/Game/game.actions.creator';
import { GameStatus } from 'src/models/Game/game.reducer';
import { UICard } from 'src/types';

interface Props {
  balance: number,
  onChangeRaiseAmount: Function,
  amountForRaise: number,
  selectedCardsForReplacement?: number,
  onRaise: Function,
  onCheck: Function,
  onReplaceCards: Function,
  status: number
}

export const gameControls = (
  { balance, onChangeRaiseAmount, selectedCardsForReplacement, amountForRaise, onRaise, onCheck, onReplaceCards, status }: Props
) => (
    <div className="game-control-container">
      <li className={'status' + status}>Fold</li>
      <li className={'status' + status} onClick={() => status % 2 === 0 ? onCheck() : null}>Check</li>
      <li className={'status' + status}><input
        className="raise-range"
        id='raise'
        type="range"
        min="10"
        max={status%2 === 0? balance: 10}
        step="1"
        value={amountForRaise}
        onChange={(event) => onChangeRaiseAmount(+event.target.value)
        }
      >
      </input>
        <div>{amountForRaise.toFixed(2)}</div>
        <div className="raise" onClick={() => status % 2 === 0 ? onRaise(amountForRaise.toFixed(2)) : null /* OPINION: Vgale to toFixed apo tin parametro kai diaxeirisouto me tin methodo tou fix otan einai mono na to kaneis view kai oxi otan to pernas san orisma */} >Raise</div></li>
      {status === GameStatus._Discard ?
        <li className="status2" onClick={() => onReplaceCards()}>
          {selectedCardsForReplacement && selectedCardsForReplacement > 0 ? `Replace ${selectedCardsForReplacement} Cards` : 'Keep Cards'}
        </li>
      : null}
    </div>
  )

const mapStateToProps = (state: AppState) => {
  return {
    balance: (state.game.players) ? state.game.players[0].balance : 0,
    amountForRaise: state.game.amountForRaise,
    status: state.game.status,
    selectedCardsForReplacement: state.game.players && state.game.players[0].hand ?
          state.game.players[0].hand.filter((card: UICard) => card.selected).length : null
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onRaise: (amount: number) => {
      dispatch(raise(amount));
      //TODO: AUTOMATICALLY CALL, NEEDS REFACTORING
      setTimeout(() => dispatch(call(+amount)), 1000);
    },
    onCheck: () => {
      dispatch(check());
      //TODO: OTHERS PLAYERS AUTOMATICALLY CHECK, NEEDS REFACTORING
    },
    onChangeRaiseAmount: (amount: number): void => {
      dispatch(changeRaiseAmount(amount));
    },
    onReplaceCards: () => {
      dispatch(replaceCards());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(gameControls);