import { connect } from 'react-redux';
import { StartGameInput } from '../../../components/UI';
import { startNewGame } from 'src/actions/game.actions.creator';
import { AppState } from '../../../store/app.store';
import { changeNumberOfPlayers } from '../../../actions/app.action.creator'
import { history } from "../../../screens/Routes";

const mapDispatchToProps = (dispatch:any ) => {
    return {
      onGameStartHandler: (payload:any) => {
        dispatch(startNewGame(payload));
        history.push('/game');
      },
      onChangeNumberOfPlayers: (numberOfPlayers: number): void => {
        dispatch(changeNumberOfPlayers(numberOfPlayers));
    }
  }
}

  const mapStateToProps = (state: AppState) => {
    return {
      numberOfPlayersSelected: state.homeView.numberOfPlayersSelected,
      name: state.user.name,
      balance: state.user.balance
    }
  };

  
export default connect(mapStateToProps,mapDispatchToProps)(StartGameInput);