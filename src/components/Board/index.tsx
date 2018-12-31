// core
import React from 'react';
import { connect } from 'react-redux';

// component
import Player from '../Player';

// interfaces
import { IState, IPlayer } from '../../helpers/interfaces';

//
import './stylesheet.css';

const mapStateToProps = (state: IState): { [key: string]: IPlayer[] } => {
  return { players: state.players };
};

const Board = (props: any): JSX.Element => {

  const { players } = props;

  return (
    <section className="board_wrapper">
      <div className="inner-wrapper">
        {
          players.map( (p: IPlayer, i: number) => <Player key={i} playerObj={p}/> )
        }
      </div>
    </section>
  )

}

export default connect(mapStateToProps)(Board);