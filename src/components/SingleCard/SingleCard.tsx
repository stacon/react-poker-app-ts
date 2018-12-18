import React from 'react';
import CardProperties from '../../classes/CardProperties';

interface Props {
    card: CardProperties;
    flipped: boolean;
    onFlippingCard: () => void
}


const SingleCard = (props: Props) => {
    const symbol: string = `&${props.card.suit.toString().toLowerCase()};`;
    return (props.flipped ?
        (
            <div
                className={`card ${props.flipped ? 'rank-' + props.card.rank.toString() : ''} ${props.flipped ? props.card.suit.toLowerCase() : ''}`}
                onClick={props.onFlippingCard}
            >
                <span className="rank">{props.card.rank.toString()}</span>
                <span className="suit">{symbol}</span>
            </div>
        )
        :
        (
            <div className="card back"></div>
        )
    )
};

export default SingleCard;