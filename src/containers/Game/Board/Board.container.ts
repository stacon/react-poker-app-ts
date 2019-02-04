import { connect } from 'react-redux';
import Board from '../../../components/Views/Game/Board/Board';
import { GameState } from 'src/reducers/GameView.reducer';

  const mapStateToProps = (state: GameState) => {
    return {
      players: state.players,
    }
  };

  
export default connect(mapStateToProps)(Board);