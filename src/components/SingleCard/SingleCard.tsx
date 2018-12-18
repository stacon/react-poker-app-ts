import React from 'react';
import CardProperties from '../../classes/CardProperties';
import { Suit } from 'src/libs/references';

interface Props {
    card: CardProperties;
    flipped: boolean;
    onFlippingCard: () => void
}

const getSymbol = (suit: Suit) => {
    switch(suit){
        case(Suit.spades): {
            return '♠';
        }
        case(Suit.clubs): {
            return '♣';
        }
        case(Suit.hearts): {
            return '♥';
        }
        case(Suit.diamonds): {
            return '♦';
        }
    }
}

const getSuitCSSClass = (suit: Suit) => {
    switch(suit){
        case(Suit.spades): {
            return 'spades';
        }
        case(Suit.clubs): {
            return 'clubs';
        }
        case(Suit.hearts): {
            return 'hearts';
        }
        case(Suit.diamonds): {
            return 'diams';
        }
    }
}

const getCardRank = (rank: number) => {
    const rankPrefix = 'rank-'
    switch(rank){
        case(13): {
            return rankPrefix+'k'
        }
        case(12): {
            return rankPrefix+'q'
        }
        case(11): {
            return rankPrefix+'j'
        }
        case(1): {
            return rankPrefix+'a'
        }
        default: {
            return rankPrefix+rank
        }
    }
}

const getRankName = (rank: number) => {
    switch(rank){
        case(13): {
            return 'K'
        }
        case(12): {
            return 'Q'
        }
        case(11): {
            return 'J'
        }
        case(1): {
            return 'A'
        }
        default: {
            return rank.toString()
        }
    }
}

const SingleCard = (props: Props) => {
    return (props.flipped ?
        (
            <div
                className={`card ${getCardRank(props.card.rank)} ${getSuitCSSClass(props.card.suit)}`}
                onClick={props.onFlippingCard}
            >
                <span className="rank">{getRankName(props.card.rank)}</span>
                <span className="suit">{getSymbol(props.card.suit)}</span>
            </div>
        ):(
            <div className="card back"></div>
        )
    )
};

export default SingleCard;