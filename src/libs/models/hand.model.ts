const { handTypes } = require('../references/handTypes.reference');

class Hand {
    constructor(cards = []) {
        this.cards = cards;
        if (!this.hasCards()) return;
        this.takeCards(cards);
    }

    takeCards(cards) {
        this.cards = this.sortHand(cards);
        this.handType = this.getHandType();
        this.cardNames = this.cards.map(card => card.name);
    }

    sortHand(cardsHolding) {
        return cardsHolding.sort((cardA,cardB) => cardA.order - cardB.order);
    }

    getHandType() {
       return handTypes.find(handType => handType.evalFunction(this.cards)).name;
    }

    hasCards() {
        return this.cards.length > 0
    }
}

module.exports = Hand;
