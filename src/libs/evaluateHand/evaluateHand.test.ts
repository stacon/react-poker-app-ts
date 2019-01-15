import { Card } from "../models";
import { Suit } from "../references";
import { getEvaluationResultFromHand } from './evaluateHand';
import { EvaluationResult } from '../../classes/evaluationResult.class';

it('should return a Royal Flush evalusationResult object', ()=>{
  const flushRoyal: Card[] = [
    new Card('1', Suit.hearts),
    new Card('2', Suit.hearts),
    new Card('3', Suit.hearts),
    new Card('4', Suit.hearts),
    new Card('5', Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(10, 14 , 0, 0, 0)
  expect(getEvaluationResultFromHand(flushRoyal)).toEqual(expectedEvaluationResult);
})

it('should return a Straight Flush evaluationResult object', ()=>{
  const straightFlush: Card[] = [
    new Card('6', Suit.hearts),
    new Card('2', Suit.hearts),
    new Card('3', Suit.hearts),
    new Card('4', Suit.hearts),
    new Card('5', Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(9, 6 , 0, 0, 0)
  expect(getEvaluationResultFromHand(straightFlush)).toEqual(expectedEvaluationResult);
})

it('should return a Four of a kind evaluationResult object', ()=>{
  const fourOfAKind: Card[] = [
    new Card('11', Suit.clubs),
    new Card('11', Suit.spades),
    new Card('11', Suit.diamonds),
    new Card('11', Suit.hearts),
    new Card('12', Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(8, 12, 11, 0, 0, 0);
  expect(getEvaluationResultFromHand(fourOfAKind)).toEqual(expectedEvaluationResult);
})

it('should return a Full House evaluationResult object', ()=>{
  const fullHouse: Card[] = [
    new Card('3', Suit.hearts),
    new Card('4', Suit.spades),
    new Card('4', Suit.clubs),
    new Card('4', Suit.hearts),
    new Card('3', Suit.diamonds),
  ];

  const expectedEvaluationResult = new EvaluationResult(7, 4, 0, 4, 3, 0);
  expect(getEvaluationResultFromHand(fullHouse)).toEqual(expectedEvaluationResult);
})

it('should return a Flush evaluationResult object', ()=>{
  const flush: Card[] = [
    new Card('13', Suit.hearts),
    new Card('1', Suit.hearts),
    new Card('2', Suit.hearts),
    new Card('4', Suit.hearts),
    new Card('12', Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(6, 14, 0, 0, 0, 0);
  expect(getEvaluationResultFromHand(flush)).toEqual(expectedEvaluationResult);
})

//TODO: Should this and the following be equal?
it('should return a Straight evaluationResult object', ()=>{
  const straight: Card[] = [
    new Card('1', Suit.spades),
    new Card('2', Suit.diamonds),
    new Card('3', Suit.clubs),
    new Card('4', Suit.hearts),
    new Card('5', Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(5, 14, 0, 0, 0, 0);
  expect(getEvaluationResultFromHand(straight)).toEqual(expectedEvaluationResult);
})

//TODO: Should this and the previous be equal?
it('should return a Straight evaluationResult object', ()=>{
  const straight: Card[] = [
    new Card('10', Suit.spades),
    new Card('11', Suit.diamonds),
    new Card('12', Suit.clubs),
    new Card('13', Suit.hearts),
    new Card('14', Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(5, 14, 0, 0, 0, 0);
  expect(getEvaluationResultFromHand(straight)).toEqual(expectedEvaluationResult);
})

// it('should return a Three of a Kind evaluationResult object', ()=>{
//   const threeOfAKind: Card[] = [
//     new Card(5, Suit.spades),
//     new Card(5, Suit.diamonds),
//     new Card(5, Suit.clubs),
//     new Card(11, Suit.hearts),
//     new Card(2, Suit.hearts),
//   ];

//   const expectedEvaluationResult = new EvaluationResult(4, 11, 0, 5, 0, 0);
//   expect(getEvaluationResultFromHand(threeOfAKind)).toEqual(expectedEvaluationResult);
// })

// it('should return a Two Pairs evaluationResult object', ()=>{
//   const twoPairs: Card[] = [
//     new Card(5, Suit.spades),
//     new Card(5, Suit.diamonds),
//     new Card(2, Suit.clubs),
//     new Card(11, Suit.hearts),
//     new Card(2, Suit.hearts),
//   ];

//   const expectedEvaluationResult = new EvaluationResult(3, 11, 0, 0, 5, 2);
//   expect(getEvaluationResultFromHand(twoPairs)).toEqual(expectedEvaluationResult);
// })

// it('should return a One Pair evaluationResult object', ()=>{
//   const pair: Card[] = [
//     new Card(5, Suit.spades),
//     new Card(3, Suit.diamonds),
//     new Card(2, Suit.clubs),
//     new Card(11, Suit.hearts),
//     new Card(2, Suit.hearts),
//   ];

//   const expectedEvaluationResult = new EvaluationResult(2, 11, 0, 0, 2, 0);
//   expect(getEvaluationResultFromHand(pair)).toEqual(expectedEvaluationResult);
// })

// it('should return a High Card evaluationResult object', ()=>{
//   const highCard: Card[] = [
//     new Card(5, Suit.spades),
//     new Card(3, Suit.diamonds),
//     new Card(4, Suit.clubs),
//     new Card(11, Suit.hearts),
//     new Card(2, Suit.hearts),
//   ];

//   const expectedEvaluationResult = new EvaluationResult(1, 11, 0, 0, 0, 0);
//   expect(getEvaluationResultFromHand(highCard)).toEqual(expectedEvaluationResult);
// })
