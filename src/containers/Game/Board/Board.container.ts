import { connect } from 'react-redux';
import Board from '../../../components/Views/Game/Board/Board';
import { AppState } from 'src/store/app.store';

  const mapStateToProps = (state: AppState) => {
    return {
      players: state.gameView.players,
    }
  };


export default connect(mapStateToProps)(Board);