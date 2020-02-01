
import getEvaluationResultFromHand from './getEvaluationResultFromHand';
import { Card } from '../types';
import { Suit } from '../../../src/enums';
import EvaluationResult from '../types/EvaluationResult.type';

it('should return a Royal Flush evaluationResult object', ()=>{
  const flushRoyal: Card[] = [
    {rank: 10, suit: Suit.hearts},
    {rank: 11, suit: Suit.hearts},
    {rank: 12, suit: Suit.hearts},
    {rank: 13, suit: Suit.hearts},
    {rank: 14, suit: Suit.hearts},
  ];

  const expectedEvaluationResult = new EvaluationResult(10, 0, 0, 0, 0, 14)
  expect(getEvaluationResultFromHand(flushRoyal)).toEqual(expectedEvaluationResult);
});

it('should return a Straight Flush evaluationResult object', ()=>{
  const straightFlush: Card[] = [
    {rank: 6, suit: Suit.hearts},
    {rank: 2, suit: Suit.hearts},
    {rank: 3, suit: Suit.hearts},
    {rank: 4, suit: Suit.hearts},
    {rank: 5, suit: Suit.hearts},
  ];

  const expectedEvaluationResult = new EvaluationResult(9, 0, 0, 0, 0, 6)
  expect(getEvaluationResultFromHand(straightFlush)).toEqual(expectedEvaluationResult);
});

it('should return a Four of a kind evaluationResult object', ()=>{
  const fourOfAKind: Card[] = [
    {rank: 11, suit: Suit.clubs},
    {rank: 11, suit: Suit.spades},
    {rank: 11, suit: Suit.diamonds},
    {rank: 11, suit: Suit.hearts},
    {rank: 12, suit: Suit.hearts},
  ];

  const expectedEvaluationResult = new EvaluationResult(8, 11, 0, 0, 0, 12);
  expect(getEvaluationResultFromHand(fourOfAKind)).toEqual(expectedEvaluationResult);
});

it('should return a Full House evaluationResult object', ()=>{
  const fullHouse: Card[] = [
    {rank: 3, suit: Suit.hearts},
    {rank: 4, suit: Suit.spades},
    {rank: 4, suit: Suit.clubs},
    {rank: 4, suit: Suit.hearts},
    {rank: 3, suit: Suit.diamonds},
  ];

  const expectedEvaluationResult = new EvaluationResult(7, 0, 4, 3, 0, 4);
  expect(getEvaluationResultFromHand(fullHouse)).toEqual(expectedEvaluationResult);
});

it('should return a Flush evaluationResult object', ()=>{
  const flush: Card[] = [
    {rank: 13, suit: Suit.hearts},
    {rank: 1, suit: Suit.hearts},
    {rank: 2, suit: Suit.hearts},
    {rank: 4, suit: Suit.hearts},
    {rank: 12, suit: Suit.hearts},
  ];

  const expectedEvaluationResult = new EvaluationResult(6, 0, 0, 0, 0, 14);
  expect(getEvaluationResultFromHand(flush)).toEqual(expectedEvaluationResult);
});

it('should return a Straight evaluationResult object', ()=>{
  const straight: Card[] = [
    {rank: 1, suit: Suit.spades},
    {rank: 2, suit: Suit.diamonds},
    {rank: 3, suit: Suit.clubs},
    {rank: 4, suit: Suit.hearts},
    {rank: 5, suit: Suit.hearts},
  ];

  const expectedEvaluationResult = new EvaluationResult(5, 0, 0, 0, 0, 14);
  expect(getEvaluationResultFromHand(straight)).toEqual(expectedEvaluationResult);
});

it('should return a Straight evaluationResult object', ()=>{
  const straight: Card[] = [
    {rank: 10, suit: Suit.spades},
    {rank: 11, suit: Suit.diamonds},
    {rank: 12, suit: Suit.clubs},
    {rank: 13, suit: Suit.hearts},
    {rank: 14, suit: Suit.hearts},
  ];

  const expectedEvaluationResult = new EvaluationResult(5, 0, 0, 0, 0, 14);
  expect(getEvaluationResultFromHand(straight)).toEqual(expectedEvaluationResult);
});

it('should return a Three of a Kind evaluationResult object', ()=>{
  const threeOfAKind: Card[] = [
    {rank: 5, suit: Suit.spades},
    {rank: 5, suit: Suit.diamonds},
    {rank: 5, suit: Suit.clubs},
    {rank: 11, suit: Suit.hearts},
    {rank: 2, suit: Suit.hearts},
  ];

  const expectedEvaluationResult = new EvaluationResult(4, 0, 5, 0, 0, 11);
  expect(getEvaluationResultFromHand(threeOfAKind)).toEqual(expectedEvaluationResult);
});

it('should return a Two Pairs evaluationResult object', ()=>{
  const twoPairs: Card[] = [
    {rank: 5, suit: Suit.spades},
    {rank: 5, suit: Suit.diamonds},
    {rank: 2, suit: Suit.clubs},
    {rank: 11, suit: Suit.hearts},
    {rank: 2, suit: Suit.hearts},
  ];

  const expectedEvaluationResult = new EvaluationResult(3, 0, 0, 5, 2, 11);
  expect(getEvaluationResultFromHand(twoPairs)).toEqual(expectedEvaluationResult);
});

it('should return a One Pair evaluationResult object', ()=>{
  const pair: Card[] = [
    {rank: 5, suit: Suit.spades},
    {rank: 3, suit: Suit.diamonds},
    {rank: 2, suit: Suit.clubs},
    {rank: 11, suit: Suit.hearts},
    {rank: 2, suit: Suit.hearts},
  ];

  const expectedEvaluationResult = new EvaluationResult(2, 0, 0, 2, 0, 11);
  expect(getEvaluationResultFromHand(pair)).toEqual(expectedEvaluationResult);
});

it('should return a High Card evaluationResult object', ()=>{
  const highCard: Card[] = [
    {rank: 5, suit: Suit.spades},
    {rank: 3, suit: Suit.diamonds},
    {rank: 4, suit: Suit.clubs},
    {rank: 11, suit: Suit.hearts},
    {rank: 2, suit: Suit.hearts},
  ];

  const expectedEvaluationResult = new EvaluationResult(1, 0, 0, 0, 0, 11);
  expect(getEvaluationResultFromHand(highCard)).toEqual(expectedEvaluationResult);
});
