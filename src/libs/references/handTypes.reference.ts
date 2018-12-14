const HandType = require('../models/HandType.model');
import Card from '../models/card.model';

const handTypes = [
    new HandType(10, 'Royal Flush', (sortedHand: Card[]) => {
        return everyCardIsSameSuit(sortedHand) && isRoyal(sortedHand);
    }),
    new HandType(9,  'Straight Flush', (sortedHand: Card[]) => {
        return everyCardIsSameSuit(sortedHand) && isStraight(sortedHand);
    }),
    new HandType(8,  'Four of a kind', (sortedHand: Card[]) => {
        return hasFourOfAkind(sortedHand);
    }),
    new HandType(7,  'Full House', (sortedHand: Card[]) => {
        return hasFullHouse(sortedHand);
    }),
    new HandType(6,  'Flush', (sortedHand: Card[]) => {
        return everyCardIsSameSuit(sortedHand);
    }),
    new HandType(5,  'Straight', (sortedHand: Card[]) => {
        return isStraight(sortedHand);
    }),
    new HandType(4,  'Three of a Kind', (sortedHand: Card[]) => {
        return isThreeOfAkind(sortedHand);
    }),
    new HandType(3,  'Two Pairs', (sortedHand: Card[]) => {
        return Object.values(groupedByValueSets(sortedHand)).filter((value: number) => value === 2).length === 2;
    }),
    new HandType(2,  'One Pair', (sortedHand: Card[]) => {
        return isPair(sortedHand);
    }),
    new HandType(1,  'High Card', () => {
        return true;
    })
];

function everyCardIsSameSuit(sortedHand: Card[]) {
    const firstCardSuit = sortedHand[0].suit;
    return sortedHand.every((card: Card) => card.suit === firstCardSuit);
}

function isRoyal(sortedHand: Card[]) { //TODO: This is wrong
    if (sortedHand[0].value !==14) return false;
    const sortedHandByValue = sortedHand.slice().sort((cardA: Card,cardB: Card) => cardA.value - cardB.value);
    return sortedHandByValue.reduce((isRoyal: boolean, currentCard: Card, i: number, arr: Card[])=>{
        if (i === 0) return isRoyal && true;
        if (arr[i-1].value + 1 === arr[i].value) return isRoyal && true;
        return isRoyal && false;
    }, true);
}

function isStraight(sortedHand: Card[]) {
    return sortedHand.reduce((isStraight: boolean, currentCard: Card, i: number, arr: Card[])=>{
        if (i === 0) return isStraight && true;
        if (arr[i-1].order + 1 === arr[i].order) return isStraight && true;
        return isStraight && false;
    }, true);
}

function hasFullHouse(sortedHand: Card[]) {
    return isThreeOfAkind(sortedHand) && isPair(sortedHand);
}

function isThreeOfAkind(sortedHand: Card[]) {
    return Object.values(groupedByValueSets(sortedHand)).filter((value: number) => value === 3).length === 1;
}

function isPair(sortedHand: Card[]) {
    return Object.values(groupedByValueSets(sortedHand)).filter((value: number) => value === 2).length === 1;
}

function hasFourOfAkind(sortedHand: Card[]) {
    return Object.values(groupedByValueSets(sortedHand)).filter((value: number) => value === 4).length === 1;
}

function groupedByValueSets(sortedHand: Card[]) {
    let counts = {};
    sortedHand.forEach((card: Card) => {
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

export {EvaluationType, handTypes}
