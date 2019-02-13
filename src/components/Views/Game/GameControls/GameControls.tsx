import React from 'react';
import './GameControls.module.css';
import { AppState } from 'src/models/App/app.store';
import { connect } from 'react-redux';
import { raise, changeRaiseAmount } from 'src/models/Game/game.actions.creator';

interface Props {
  balance: number,
  onChangeRaiseAmount: Function,
  amountForRaise: number,
  onRaise: Function
}

export const gameControls = (
  { balance, onChangeRaiseAmount, amountForRaise, onRaise }: Props
) => { 
return (
    <div className="game-control-container">      
      <li>Fold</li>
      <li>Check</li>
      <li><input
        className="raise-range"
        id='raise'
        type="range"
        min="1"
        max={balance}
        step="1"
        value={amountForRaise}
        onChange={(event) => onChangeRaiseAmount(+event.target.value)}
      >
      </input>
      <div>{amountForRaise.toFixed(2)}</div>
      <div className="raise" onClick = {() => onRaise()} >Raise</div></li>
      <li>Replace Cards</li>
    </div>
  )
}
const mapStateToProps = (state: AppState) => {
  return {
    balance: (state.game.players) ? state.game.players[0].balance : 0,
    amountForRaise: state.game.amountForRaise
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onRaise: () => {
      dispatch(raise());
    },
    onChangeRaiseAmount: (amount: number): void => {
      dispatch(changeRaiseAmount(amount));
  },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(gameControls);