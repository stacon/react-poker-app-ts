import {
  everyCardIsSameSuit,
  isRoyal,
  hasStraight,
  hasFourOfAKind,
  hasThreeOfAKind,
  hasTwoPairs,
  hasOnePair,
  getHighCard,
  getFourOfAKindGroupValue,
  getThreeOfAKindGroupValue,
  getPairGroupValue,
  getPairsGroupValues,
} from './handEvaluation.helper';
import { Suit } from '../../../src/enums';
import { Card } from '../types';


it('should evaluate the cardset to be truthy cause all cards are hearts suit and it\'s straight', ()=> {
  const fiveCardsOfSameSuitAndStraight = [
    <Card>{rank: 1, suit: Suit.hearts},
    <Card>{rank: 2, suit: Suit.hearts},
    <Card>{rank: 3, suit: Suit.hearts},
    <Card>{rank: 4, suit: Suit.hearts},
    <Card>{rank: 5, suit: Suit.hearts},
  ];
  expect(everyCardIsSameSuit(fiveCardsOfSameSuitAndStraight)).toBeTruthy();
  expect(hasStraight(fiveCardsOfSameSuitAndStraight)).toBeTruthy();
})

it('should evaluate the cardset to be falsy cause one cards is of spades suit and it\'s not straight', ()=> {
  const fiveCardsNotOfSameSuitAndNotStraight = [
    <Card>{rank: 1, suit: Suit.hearts},
    <Card>{rank: 2, suit: Suit.hearts},
    <Card>{rank: 2, suit: Suit.spades},
    <Card>{rank: 4, suit: Suit.hearts},
    <Card>{rank: 5, suit: Suit.hearts},
  ];
  expect(everyCardIsSameSuit(fiveCardsNotOfSameSuitAndNotStraight)).toBeFalsy();
  expect(hasStraight(fiveCardsNotOfSameSuitAndNotStraight)).toBeFalsy();
})

it('should evaluate the cardset to be truthy as it evaluates as royal', ()=> {
  const fiveCardsAsARoyal = [
    <Card>{rank: 10, suit: Suit.hearts},
    <Card>{rank: 11, suit: Suit.hearts},
    <Card>{rank: 12, suit: Suit.spades},
    <Card>{rank: 13, suit: Suit.hearts},
    <Card>{rank: 14, suit: Suit.hearts},
  ];
  expect(isRoyal(fiveCardsAsARoyal)).toBeTruthy();
})

it('should evaluate the cardset to be falsy as it doesn\'t evaluate as royal', ()=> {
  const fiveCardsNotARoyal = [
    <Card>{rank: 1, suit: Suit.hearts},
    <Card>{rank: 2, suit: Suit.hearts},
    <Card>{rank: 3, suit: Suit.spades},
    <Card>{rank: 4, suit: Suit.hearts},
    <Card>{rank: 5, suit: Suit.hearts},
  ];
  expect(isRoyal(fiveCardsNotARoyal)).toBeFalsy();
})

it('should evaluate the cardset to be falsy as it doesn\'t evaluate as royal', ()=> {
  const fiveCardsNotARoyal = [
    <Card>{rank: 1, suit: Suit.hearts},
    <Card>{rank: 2, suit: Suit.hearts},
    <Card>{rank: 3, suit: Suit.spades},
    <Card>{rank: 4, suit: Suit.hearts},
    <Card>{rank: 5, suit: Suit.hearts},
  ];
  expect(isRoyal(fiveCardsNotARoyal)).toBeFalsy();
})

it('should evaluate the cardset to be falsy as it doesn\'t evaluate as royal', ()=> {
  const fiveCardsNotARoyal = [
    <Card>{rank: 10, suit: Suit.hearts},
    <Card>{rank: 10, suit: Suit.hearts},
    <Card>{rank: 13, suit: Suit.spades},
    <Card>{rank: 13, suit: Suit.hearts},
    <Card>{rank: 14, suit: Suit.hearts},
  ];
  expect(isRoyal(fiveCardsNotARoyal)).toBeFalsy();
});

it('should evaluate the cardset to be falsy as it doesn\'t evaluate as royal', ()=> {
  const fiveCardsNotARoyal = [
    <Card>{rank: 10, suit: Suit.hearts},
    <Card>{rank: 10, suit: Suit.hearts},
    <Card>{rank: 12, suit: Suit.spades},
    <Card>{rank: 14, suit: Suit.hearts},
    <Card>{rank: 14, suit: Suit.hearts},
  ];
  expect(isRoyal(fiveCardsNotARoyal)).toBeFalsy();
});

it('should evaluate the cardset to be truthy as it has one set of four of a kind', ()=> {
  const fourOfAKind = [
    <Card>{rank: 2, suit: Suit.hearts},
    <Card>{rank: 2, suit: Suit.spades},
    <Card>{rank: 2, suit: Suit.clubs},
    <Card>{rank: 2, suit: Suit.diamonds},
    <Card>{rank: 5, suit: Suit.diamonds},
  ];
  expect(hasFourOfAKind(fourOfAKind)).toBeTruthy();
})

it('should evaluate the cardset to be falsy as it has one set not of four of a kind, and truthy because its three of a kind, and falsy bnecause it\'s not a pair', ()=> {
  const threeOfAKind = [
    <Card>{rank: 2, suit: Suit.hearts},
    <Card>{rank: 2, suit: Suit.spades},
    <Card>{rank: 10, suit: Suit.clubs},
    <Card>{rank: 2, suit: Suit.diamonds},
    <Card>{rank: 5, suit: Suit.diamonds},
  ];
  expect(hasFourOfAKind(threeOfAKind)).toBeFalsy();
  expect(hasThreeOfAKind(threeOfAKind)).toBeTruthy();
  expect(hasOnePair(threeOfAKind)).toBeFalsy();
})

it('should evaluate the cardset to be truthy as it has one set of rank pair', ()=> {
  const onePair = [
    <Card>{rank: 2, suit: Suit.hearts},
    <Card>{rank: 2, suit: Suit.spades},
    <Card>{rank: 10, suit: Suit.clubs},
    <Card>{rank: 4, suit: Suit.diamonds},
    <Card>{rank: 5, suit: Suit.diamonds},
  ];
  expect(hasOnePair(onePair)).toBeTruthy();
})

it('should evaluate the cardset to be truthy as it has two set of rank pairs', ()=> {
  const twoPairs = [
    <Card>{rank: 2, suit: Suit.hearts},
    <Card>{rank: 2, suit: Suit.spades},
    <Card>{rank: 10, suit: Suit.clubs},
    <Card>{rank: 4, suit: Suit.diamonds},
    <Card>{rank: 4, suit: Suit.diamonds},
  ];
  expect(hasTwoPairs(twoPairs)).toBeTruthy();
})

it('should return a card object with the higher value', ()=> {
  const twoPairs = [
    <Card>{rank: 1, suit: Suit.hearts},
    <Card>{rank: 2, suit: Suit.spades},
    <Card>{rank: 10, suit: Suit.clubs},
    <Card>{rank: 4, suit: Suit.diamonds},
    <Card>{rank: 4, suit: Suit.diamonds},
  ];
  expect(getHighCard(twoPairs)).toEqual(<Card>{rank: 1, suit: Suit.hearts});
})

it('should not return another card than 1 of hearts', ()=> {
  const twoPairs = [
    <Card>{rank: 1, suit: Suit.hearts},
    <Card>{rank: 2, suit: Suit.spades},
    <Card>{rank: 10, suit: Suit.clubs},
    <Card>{rank: 4, suit: Suit.diamonds},
    <Card>{rank: 4, suit: Suit.clubs},
  ];
  expect(getHighCard(twoPairs)).not.toEqual(<Card>{rank: 10, suit: Suit.clubs});
  expect(getHighCard(twoPairs)).not.toEqual(<Card>{rank: 2, suit: Suit.spades});
  expect(getHighCard(twoPairs)).not.toEqual(<Card>{rank: 4, suit: Suit.diamonds});
  expect(getHighCard(twoPairs)).not.toEqual(<Card>{rank: 4, suit: Suit.clubs});
})

it('should return the value of 14 because of the four aces', ()=> {
  const fourOfAKind = [
    <Card>{rank: 1, suit: Suit.hearts},
    <Card>{rank: 1, suit: Suit.spades},
    <Card>{rank: 1, suit: Suit.clubs},
    <Card>{rank: 1, suit: Suit.diamonds},
    <Card>{rank: 4, suit: Suit.clubs},
  ];
  expect(getFourOfAKindGroupValue(fourOfAKind)).toEqual(14);
})

it('should return the value of 12 because of the three queens', ()=> {
  const threeOfAKind = [
    <Card>{rank: 12, suit: Suit.hearts},
    <Card>{rank: 12, suit: Suit.spades},
    <Card>{rank: 12, suit: Suit.clubs},
    <Card>{rank: 1, suit: Suit.diamonds},
    <Card>{rank: 4, suit: Suit.clubs},
  ];
  expect(getThreeOfAKindGroupValue(threeOfAKind)).toEqual(12);
})

it('should return the value of 8 because of the pair of eights', ()=> {
  const pair = [
    <Card>{rank: 8, suit: Suit.hearts},
    <Card>{rank: 8, suit: Suit.spades},
    <Card>{rank: 2, suit: Suit.clubs},
    <Card>{rank: 1, suit: Suit.diamonds},
    <Card>{rank: 4, suit: Suit.clubs},
  ];
  expect(getPairGroupValue(pair)).toEqual(8);
})

it('should return the value of 12 because of the three queens', ()=> {
  const twoPairs = [
    <Card>{rank: 2, suit: Suit.hearts},
    <Card>{rank: 2, suit: Suit.spades},
    <Card>{rank: 4, suit: Suit.clubs},
    <Card>{rank: 1, suit: Suit.diamonds},
    <Card>{rank: 4, suit: Suit.clubs},
  ];
  expect(getPairsGroupValues(twoPairs)).toEqual({lowPairValue: 2, highPairValue: 4});
})