// core
import React from 'react';
import { connect } from 'react-redux';

// component
import Player from '../Player';
import Button from '../UI/Button';

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
      <div className="top_buttons_wrapper">
        <Button
          btnClasses={ 'btn btn-warning' }
          btnText={ 'Leave Table' }
          btnHandler={ null }
        />
      </div>
      <div className="inner-wrapper players-ordering">
        {players.map( (p: IPlayer, i: number) => 
          <Player key={i} {...p}/> 
        )}
      </div>
      <div className="status-wrapper">
        <div className="inner-wrapper">
          <ul>
            <li> wow</li>
          </ul>
        </div>
      </div>
    </section>
  )

}

export default connect(mapStateToProps)(Board);