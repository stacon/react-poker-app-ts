import React from 'react';
import CardProperties from '../../classes/CardProperties';
import './stylesheet.css';

interface Props {
    card: CardProperties;
    flipped: boolean;
    onFlippingCard: () => void
}


const SingleCard = (props: Props) => {

    return (

        <div
            className={`card ${props.flipped? props.card.suit : '' } ${props.flipped? props.card.rank : ''}`}
            onClick={ props.onFlippingCard }
            >
            { props.flipped
                    ?
                (
                    <div className="face"></div>
                )
                    :
                (
                    <div className="back"></div>
                )
            }
        </div>
    )
};

export default SingleCard;