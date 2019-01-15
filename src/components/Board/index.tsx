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
import { getEvaluationResultFromHand } from '../../libs/evaluateHand/evaluateHand';
import { EvaluationResult } from '../../classes/evaluationResult.class';

const mapStateToProps = (state: IState): { [key: string]: IPlayer[] } => {
  return { players: state.players };
};

const Board = (props: any): JSX.Element => {

  let { players } = props;
  console.clear()
  //get power from hands
  let reducer = (player:IPlayer,curr: IPlayer) => {
   return [getEvaluationResultFromHand(curr.hand),getEvaluationResultFromHand(player.hand)]
  };
  let results: EvaluationResult[] = players.reduceRight(reducer);
  
  
  console.log(results);
  console.log(getEvaluationResultFromHand(players[1].hand));

  const gridItems: JSX.Element[] = Array(9).fill(null);  
  const playersGrid: JSX.Element[] = gridItems.map((gridItem, index) => {

    if(index === 1 && players.length === 2 ) {
      
      return (
        <div className={"grid-item"}>
          <Player key={players[1].index} {...players[1]} />
        </div>
      )
    }

    else if(index === 1 && players.length === 4 ) {
      return (
        <div className={"grid-item"}>
          <Player key={players[2].index} {...players[2]} />
        </div>
      )
    }

    else if(index === 3 && players.length >= 3 ) {
      return (
        <div className={"grid-item"}>
          <Player key={players[1].index} {...players[1]} />
        </div>
      )
    }
    
    else if(index === 5 && players.length === 4) {    
    return (
      <div className={"grid-item"}>
        <Player key={players[3].index} {...players[3]} />
      </div>
    )
    }

    else if(index === 5 && players.length === 3) {    
      return (
        <div className={"grid-item"}>
          <Player key={players[2].index} {...players[2]} />
        </div>
      )
      }
    else if(index === 7) {
      return (
        <div className={"grid-item"}>
          <Player key={players[0].index} {...players[0]} />
        </div>
      )
    }
    else {
      return (
        <div className={"grid-item"}></div>
      )
    }
  })


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
            players.map((p: IPlayer, i: number) => <Player key={i} {p} />)
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