import React from 'react';
import CardProperties from '../../classes/CardProperties';

interface Props {
    card: CardProperties;
    flipped: boolean;
    onFlippingCard: () => void
}


const SingleCard = (props: Props) => {
  console.log(props)

    return (

        <a
            className={`card ${props.flipped? props.card.suit.toLowerCase() : '' } ${props.flipped? 'rank'+props.card.rank.toString() : ''}`}
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
        </a>
    )
};

export default SingleCard;