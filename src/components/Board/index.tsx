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

  let { players } = props;
  // let playersOrdering = "inner-wrapper";
  // if (players.length % 2 !== 0) {
  //   playersOrdering += " grid"
  //   // players = players.slice(0).reverse();
  // }

  if (players.length % 2 !== 0) {
    playersOrdering += " players-ordering-3"
  }
  
  return (
    <section className="board_wrapper">
      <div className="top_buttons_wrapper">
        <Button
          btnClasses={'btn btn-warning'}
          btnText={'Leave Table'}
          btnHandler={null}
        />
      </div>

      <div className="inner-wrapper grid">

        {/* {
            players.map((p: IPlayer, i: number) => <Player key={i} playerObj={p} />)
          } */}
          {
            playersGrid            
          }
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