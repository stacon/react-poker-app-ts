import { connect } from 'react-redux';
import { dealCards } from 'src/actions/game.actions.creator';
import { AppState } from '../../../../store/app.store';
import { Navbar } from 'src/components/UI';

const mapDispatchToProps = (dispatch:any ) => {
    return {
      dealCardsHandler: () => {
        dispatch(dealCards());
      }
  }
}

  const mapStateToProps = (state: AppState) => {
    return {
      name: state.user.name,
      balance: state.user.balance,
      gameStatus: (state.gameView.status) ? state.gameView.status : null
    }
  };

  
export default connect(mapStateToProps,mapDispatchToProps)(Navbar);