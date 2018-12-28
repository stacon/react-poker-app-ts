import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import { selectedCard } from '../../actions';

import './stylesheet.css';

// Interfaces
import { ICard } from '../../helpers/interfaces';

const mapDispatchToProps =  (dispatch: any)  => {
return bindActionCreators({ selectedCard }, dispatch);
};


const SingleCard = (props: any) => {

    const _card: ICard  = props.card;

    return (

        <li
            className={`card ${ _card.isFlipped ? _card.suit : '' } ${ _card.isFlipped? _card.rank : '' }`}
            onClick={ () => props.selectedCard( _card.id, !_card.isFlipped ) }
            >
            { _card.isFlipped
                    ?
                (
                    <div className="face"></div>
                )
                    :
                (
                    <div className="back"></div>
                )
            }
        </li>
    )
};

export default connect(undefined, mapDispatchToProps)(SingleCard);