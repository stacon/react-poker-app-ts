import { connect } from 'react-redux';
import Card from '../../../components/Views/Game/Card/Card';
import { onCardSelect } from 'src/actions/game.actions.creator';

const mapDispatchToProps = (dispatch: any) => {
  return {
    onCardClickHandler: (key:number) => {
      dispatch(onCardSelect(key));
    }
  }
}

export default connect(null, mapDispatchToProps)(Card);