import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import { selectedCard } from '../../actions';

// Interfaces
import { ICard } from '../../helpers/interfaces';

const mapDispatchToProps =  (dispatch: any)  => {
    return bindActionCreators({ selectedCard }, dispatch);
};

const SingleCard = (props: any): JSX.Element => {

    const _card: ICard  = props.card;
    

    return (
        <li
            style={{ 'cursor': 'pointer'} }
            className={`card ${ _card.isFlipped ? 'rank-'+_card.rank.toString().toLowerCase() +' '+ _card.suit.toString().toLowerCase() : 'back' }`}
            onClick={ () => {
                console.log(_card)
                props.selectedCard( _card.playerId ,_card.id, !_card.isFlipped, _card.cardIndex )
            } }
            >
            { _card.isFlipped
                    ?
                (
                    <div className="inner-wrapper">
                        <span className="rank">{ `${_card.rank}` }</span>
                        <span className="suit" dangerouslySetInnerHTML={{__html: `&${_card.suit.toLowerCase()};`}}></span>
                    </div>
                )
                    :
                (
                    <div className="inner-wrapper"/>
                )
            }
        </li>
    );
};

export default connect(undefined, mapDispatchToProps)(SingleCard);