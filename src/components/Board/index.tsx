// core
import React from 'react';
import { connect } from 'react-redux';

// component
import Player from '../Player';

// interfaces
import { IState, IPlayer } from '../../helpers/interfaces';

const mapStateToProps = (state: IState): { [key: string]: IPlayer[] } => {
  return { players: state.players };
};

const Board = (props: any): JSX.Element => {

  const { players } = props;

  return (
    <section>
      {
        players.map( (p: IPlayer, i: number) => <Player key={i} playerObj={p}/> )
      }
    </section>
  )

}

export default connect(mapStateToProps)(Board);