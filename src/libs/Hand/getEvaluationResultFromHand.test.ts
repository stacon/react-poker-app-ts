
import getEvaluationResultFromHand from './getEvaluationResultFromHand';
import { UICard, EvaluationResult } from '../types';
import { Suit } from '../../../src/enums';

it('should return a Royal Flush evaluationResult object', ()=>{
  const flushRoyal: UICard[] = [
    new UICard(10, Suit.hearts),
    new UICard(11, Suit.hearts),
    new UICard(12, Suit.hearts),
    new UICard(13, Suit.hearts),
    new UICard(14, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(10, 0, 0, 0, 0, 14)
  expect(getEvaluationResultFromHand(flushRoyal)).toEqual(expectedEvaluationResult);
});

it('should return a Straight Flush evaluationResult object', ()=>{
  const straightFlush: UICard[] = [
    new UICard(6, Suit.hearts),
    new UICard(2, Suit.hearts),
    new UICard(3, Suit.hearts),
    new UICard(4, Suit.hearts),
    new UICard(5, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(9, 0, 0, 0, 0, 6)
  expect(getEvaluationResultFromHand(straightFlush)).toEqual(expectedEvaluationResult);
});

it('should return a Four of a kind evaluationResult object', ()=>{
  const fourOfAKind: UICard[] = [
    new UICard(11, Suit.clubs),
    new UICard(11, Suit.spades),
    new UICard(11, Suit.diamonds),
    new UICard(11, Suit.hearts),
    new UICard(12, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(8, 11, 0, 0, 0, 12);
  expect(getEvaluationResultFromHand(fourOfAKind)).toEqual(expectedEvaluationResult);
});

it('should return a Full House evaluationResult object', ()=>{
  const fullHouse: UICard[] = [
    new UICard(3, Suit.hearts),
    new UICard(4, Suit.spades),
    new UICard(4, Suit.clubs),
    new UICard(4, Suit.hearts),
    new UICard(3, Suit.diamonds),
  ];

  const expectedEvaluationResult = new EvaluationResult(7, 0, 4, 3, 0, 4);
  expect(getEvaluationResultFromHand(fullHouse)).toEqual(expectedEvaluationResult);
});

it('should return a Flush evaluationResult object', ()=>{
  const flush: UICard[] = [
    new UICard(13, Suit.hearts),
    new UICard(1, Suit.hearts),
    new UICard(2, Suit.hearts),
    new UICard(4, Suit.hearts),
    new UICard(12, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(6, 0, 0, 0, 0, 14);
  expect(getEvaluationResultFromHand(flush)).toEqual(expectedEvaluationResult);
});

it('should return a Straight evaluationResult object', ()=>{
  const straight: UICard[] = [
    new UICard(1, Suit.spades),
    new UICard(2, Suit.diamonds),
    new UICard(3, Suit.clubs),
    new UICard(4, Suit.hearts),
    new UICard(5, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(5, 0, 0, 0, 0, 14);
  expect(getEvaluationResultFromHand(straight)).toEqual(expectedEvaluationResult);
});

it('should return a Straight evaluationResult object', ()=>{
  const straight: UICard[] = [
    new UICard(10, Suit.spades),
    new UICard(11, Suit.diamonds),
    new UICard(12, Suit.clubs),
    new UICard(13, Suit.hearts),
    new UICard(14, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(5, 0, 0, 0, 0, 14);
  expect(getEvaluationResultFromHand(straight)).toEqual(expectedEvaluationResult);
});

it('should return a Three of a Kind evaluationResult object', ()=>{
  const threeOfAKind: UICard[] = [
    new UICard(5, Suit.spades),
    new UICard(5, Suit.diamonds),
    new UICard(5, Suit.clubs),
    new UICard(11, Suit.hearts),
    new UICard(2, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(4, 0, 5, 0, 0, 11);
  expect(getEvaluationResultFromHand(threeOfAKind)).toEqual(expectedEvaluationResult);
});

it('should return a Two Pairs evaluationResult object', ()=>{
  const twoPairs: UICard[] = [
    new UICard(5, Suit.spades),
    new UICard(5, Suit.diamonds),
    new UICard(2, Suit.clubs),
    new UICard(11, Suit.hearts),
    new UICard(2, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(3, 0, 0, 5, 2, 11);
  expect(getEvaluationResultFromHand(twoPairs)).toEqual(expectedEvaluationResult);
});

it('should return a One Pair evaluationResult object', ()=>{
  const pair: UICard[] = [
    new UICard(5, Suit.spades),
    new UICard(3, Suit.diamonds),
    new UICard(2, Suit.clubs),
    new UICard(11, Suit.hearts),
    new UICard(2, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(2, 0, 0, 2, 0, 11);
  expect(getEvaluationResultFromHand(pair)).toEqual(expectedEvaluationResult);
});

it('should return a High Card evaluationResult object', ()=>{
  const highCard: UICard[] = [
    new UICard(5, Suit.spades),
    new UICard(3, Suit.diamonds),
    new UICard(4, Suit.clubs),
    new UICard(11, Suit.hearts),
    new UICard(2, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(1, 0, 0, 0, 0, 11);
  expect(getEvaluationResultFromHand(highCard)).toEqual(expectedEvaluationResult);
});
