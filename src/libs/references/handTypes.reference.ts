const HandType = require('../models/HandType.model');

const handTypes = [
    new HandType(10, 'Royal Flush', sortedHand => {
        return everyCardIsSameSuit(sortedHand) && isRoyal(sortedHand);
    }),
    new HandType(9,  'Straight Flush', sortedHand => {
        return everyCardIsSameSuit(sortedHand) && isStraight(sortedHand);
    }),
    new HandType(8,  'Four of a kind', sortedHand => {
        return hasFourOfAkind(sortedHand);
    }),
    new HandType(7,  'Full House', sortedHand => {
        return hasFullHouse(sortedHand);
    }),
    new HandType(6,  'Flush', sortedHand => {
        return everyCardIsSameSuit(sortedHand);
    }),
    new HandType(5,  'Straight', sortedHand => {
        return isStraight(sortedHand);
    }),
    new HandType(4,  'Three of a Kind', sortedHand => {
        return isThreeOfAkind(sortedHand);
    }),
    new HandType(3,  'Two Pairs', sortedHand => {
        return Object.values(groupedByValueSets(sortedHand)).filter(value => value === 2).length === 2;
    }),
    new HandType(2,  'One Pair', sortedHand => {
        return isPair(sortedHand);
    }),
    new HandType(1,  'High Card', () => {
        return true;
    })
];

function everyCardIsSameSuit(sortedHand) {
    const firstCardSuit = sortedHand[0].suit;
    return sortedHand.every(card => card.suit === firstCardSuit);
}

function isRoyal(sortedHand) { //TODO: This is wrong
    if (sortedHand[0].value !==14) return false;
    const sortedHandByValue = sortedHand.slice().sort((cardA,cardB) => cardA.value - cardB.value);
    return sortedHandByValue.reduce((isRoyal, currentCard, i, arr)=>{
        if (i === 0) return isRoyal && true;
        if (arr[i-1].value + 1 === arr[i].value) return isRoyal && true;
        return isRoyal && false;
    }, true);
}

function isStraight(sortedHand) {
    return sortedHand.reduce((isStraight, currentCard, i, arr)=>{
        if (i === 0) return isStraight && true;
        if (arr[i-1].order + 1 === arr[i].order) return isStraight && true;
        return isStraight && false;
    }, true);
}

function hasFullHouse(sortedHand) {
    return isThreeOfAkind(sortedHand) && isPair(sortedHand);
}

function isThreeOfAkind(sortedHand) {
    return Object.values(groupedByValueSets(sortedHand)).filter(value => value === 3).length === 1;
}

function isPair(sortedHand) {
    return Object.values(groupedByValueSets(sortedHand)).filter(value => value === 2).length === 1;
}

function hasFourOfAkind(sortedHand) {
    return Object.values(groupedByValueSets(sortedHand)).filter(value => value === 4).length === 1;
}

function groupedByValueSets(sortedHand) {
    let counts = {};
    sortedHand.forEach(card => {
        counts[card.value] = (counts[card.value] || 0) + 1
    });
    return counts;
}

enum EvaluationType {
    royalFlush = 10,
    straightFlush = 9,
    fourOfAKind = 8,
    fullHouse = 7,
    flush = 6,
    straight = 5,
    threeOfAKind = 4,
    twoPairs = 3,
    onePair = 2,
    highCard = 1
}

export {EvaluationType}
