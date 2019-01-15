import { Card } from '../models';
import { Suit } from '../references';
import {
  everyCardIsSameSuit,
  isRoyal,
  hasStraight,
  hasFourOfAKind,
  hasThreeOfAKind,
  // hasTwoPairs,
  hasOnePair,
  // getHighCard,
  // getFourOfAKindGroupValue,
  // getThreeOfAKindGroupValue,
  // getPairGroupValue,
  // getPairsGroupValues,
} from './helpers';

it('should evaluate the cardset to be truthy cause all cards are hearts suit and it\'s straight', ()=> {
  const fiveCardsOfSameSuitAndStraight = [
    new Card('1', Suit.hearts),
    new Card('2', Suit.hearts),
    new Card('3', Suit.hearts),
    new Card('4', Suit.hearts),
    new Card('5', Suit.hearts),
  ];
  expect(everyCardIsSameSuit(fiveCardsOfSameSuitAndStraight)).toBeTruthy();
  expect(hasStraight(fiveCardsOfSameSuitAndStraight)).toBeTruthy();
})

it('should evaluate the cardset to be falsy cause one cards is of spades suit and it\'s not straight', ()=> {
  const fiveCardsNotOfSameSuitAndNotStraight = [
    new Card('1', Suit.hearts),
    new Card('2', Suit.hearts),
    new Card('2', Suit.spades),
    new Card('4', Suit.hearts),
    new Card('5', Suit.hearts),
  ];
  expect(everyCardIsSameSuit(fiveCardsNotOfSameSuitAndNotStraight)).toBeFalsy();
  expect(hasStraight(fiveCardsNotOfSameSuitAndNotStraight)).toBeFalsy();
})

it('should evaluate the cardset to be truthy as it evaluates as royal', ()=> {
  const fiveCardsAsARoyal = [
    new Card('1', Suit.hearts),
    new Card('4', Suit.hearts),
    new Card('3', Suit.spades),
    new Card('2', Suit.hearts),
    new Card('5', Suit.hearts),
  ];
  expect(isRoyal(fiveCardsAsARoyal)).toBeTruthy();
})

it('should evaluate the cardset to be falsy as it doesn\'t evaluate as royal', ()=> {
  const fiveCardsNotARoyal = [
    new Card('1', Suit.hearts),
    new Card('2', Suit.hearts),
    new Card('3', Suit.spades),
    new Card('7', Suit.hearts),
    new Card('5', Suit.hearts),
  ];
  expect(isRoyal(fiveCardsNotARoyal)).toBeFalsy();
})

it('should evaluate the cardset to be truthy as it has one set of four of a kind', ()=> {
  const fourOfAKind = [
    new Card('2', Suit.hearts),
    new Card('2', Suit.spades),
    new Card('2', Suit.clubs),
    new Card('2', Suit.diamonds),
    new Card('5', Suit.diamonds),
  ];
  expect(hasFourOfAKind(fourOfAKind)).toBeTruthy();
})

it('should evaluate the cardset to be falsy as it has one set not of four of a kind, and truthy because its three of a kind, and falsy bnecause it\'s not a pair', ()=> {
  const threeOfAKind = [
    new Card('2', Suit.hearts),
    new Card('2', Suit.spades),
    new Card('10', Suit.clubs),
    new Card('2', Suit.diamonds),
    new Card('5', Suit.diamonds),
  ];
  expect(hasFourOfAKind(threeOfAKind)).toBeFalsy();
  expect(hasThreeOfAKind(threeOfAKind)).toBeTruthy();
  expect(hasOnePair(threeOfAKind)).toBeFalsy();
})

// it('should evaluate the cardset to be truthy as it has one set of rank pair', ()=> {
//   const onePair = [
//     new Card(2, Suit.hearts),
//     new Card(2, Suit.spades),
//     new Card(10, Suit.clubs),
//     new Card(4, Suit.diamonds),
//     new Card(5, Suit.diamonds),
//   ];
//   expect(hasOnePair(onePair)).toBeTruthy();
// })

// it('should evaluate the cardset to be truthy as it has two set of rank pairs', ()=> {
//   const twoPairs = [
//     new Card(2, Suit.hearts),
//     new Card(2, Suit.spades),
//     new Card(10, Suit.clubs),
//     new Card(4, Suit.diamonds),
//     new Card(4, Suit.diamonds),
//   ];
//   expect(hasTwoPairs(twoPairs)).toBeTruthy();
// })

// it('should return a card object with the higher value', ()=> {
//   const twoPairs = [
//     new Card(1, Suit.hearts),
//     new Card(2, Suit.spades),
//     new Card(10, Suit.clubs),
//     new Card(4, Suit.diamonds),
//     new Card(4, Suit.diamonds),
//   ];
//   expect(getHighCard(twoPairs)).toEqual(new Card(1, Suit.hearts));
// })

// it('should not return another card than 1 of hearts', ()=> {
//   const twoPairs = [
//     new Card(1, Suit.hearts),
//     new Card(2, Suit.spades),
//     new Card(10, Suit.clubs),
//     new Card(4, Suit.diamonds),
//     new Card(4, Suit.clubs),
//   ];
//   expect(getHighCard(twoPairs)).not.toEqual(new Card(10, Suit.clubs));
//   expect(getHighCard(twoPairs)).not.toEqual(new Card(2, Suit.spades));
//   expect(getHighCard(twoPairs)).not.toEqual(new Card(4, Suit.diamonds));
//   expect(getHighCard(twoPairs)).not.toEqual(new Card(4, Suit.clubs));
// })

// it('should return the value of 14 because of the four aces', ()=> {
//   const fourOfAKind = [
//     new Card(1, Suit.hearts),
//     new Card(1, Suit.spades),
//     new Card(1, Suit.clubs),
//     new Card(1, Suit.diamonds),
//     new Card(4, Suit.clubs),
//   ];
//   expect(getFourOfAKindGroupValue(fourOfAKind)).toEqual(14);
// })

// it('should return the value of 12 because of the three queens', ()=> {
//   const threeOfAKind = [
//     new Card(12, Suit.hearts),
//     new Card(12, Suit.spades),
//     new Card(12, Suit.clubs),
//     new Card(1, Suit.diamonds),
//     new Card(4, Suit.clubs),
//   ];
//   expect(getThreeOfAKindGroupValue(threeOfAKind)).toEqual(12);
// })

// it('should return the value of 8 because of the pair of eights', ()=> {
//   const pair = [
//     new Card(8, Suit.hearts),
//     new Card(8, Suit.spades),
//     new Card(2, Suit.clubs),
//     new Card(1, Suit.diamonds),
//     new Card(4, Suit.clubs),
//   ];
//   expect(getPairGroupValue(pair)).toEqual(8);
// })

// it('should return the value of 12 because of the three queens', ()=> {
//   const twoPairs = [
//     new Card(2, Suit.hearts),
//     new Card(2, Suit.spades),
//     new Card(4, Suit.clubs),
//     new Card(1, Suit.diamonds),
//     new Card(4, Suit.clubs),
//   ];
//   expect(getPairsGroupValues(twoPairs)).toEqual({lowPairValue: 2, highPairValue: 4});
// })