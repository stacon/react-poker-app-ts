import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import { selectedCard } from '../../actions';

// import './stylesheet.css';


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
            className={`card ${ _card.isFlipped ? 'rank-'+_card.rank +' '+ _card.suit : 'back' }`}
            onClick={ () => props.selectedCard( _card.id, !_card.isFlipped ) }
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
                    ''
                )
            }
        </li>
    )
};

export default connect(undefined, mapDispatchToProps)(SingleCard);