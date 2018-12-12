import React from 'react';
import CardProperties from '../../classes/CardProperties'

interface Props {
    card: CardProperties;
}

interface State {
    card: CardProperties;
}

export default class SingleCard extends React.Component<Props, State> {
    

    constructor(props:Props) {
        super(props);
        this.state = {
          card: this.props.card,
        };
      }
    //TODO:couldn't find other way to show html entity, be my guest to try
    suitFormat() : string {
        
        switch(this.state.card.suit) {
            case 'spades':            
                return String.fromCharCode(9824);
            case 'diams':
                return String.fromCharCode(9830);
            case 'hearts':
                return String.fromCharCode(9829);
            case 'clubs':
                return String.fromCharCode(9827);
            default:
                return '';
        }
        return '';              
    }
    
    renderCard(): any {
        
    }

    render() {    
        if(this.state.card.flipped) {
            return (
            <div className="playingCards simpleCards">
                <div className="card back">*</div>
            </div>
            );
        }        
        return (
            <div className="playingCards simpleCards">
                <div className={`card rank-${this.state.card.rank} ${this.state.card.suit}`}>
                    <span className="rank">{this.state.card.rank.toUpperCase()}</span>
                    <span className="suit">{this.suitFormat()}</span>
                </div>
            </div>
        );
      }
}