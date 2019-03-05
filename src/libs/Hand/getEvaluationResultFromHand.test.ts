
import getEvaluationResultFromHand from './getEvaluationResultFromHand';
import { UICard, EvaluationResult } from 'src/types';
import { Suit } from 'src/enums';

it('should return a Royal Flush evalusationResult object', ()=>{
  const flushRoyal: UICard[] = [
    new UICard(1, Suit.hearts),
    new UICard(2, Suit.hearts),
    new UICard(3, Suit.hearts),
    new UICard(4, Suit.hearts),
    new UICard(5, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(10, 14 , 0, 0, 0)
  expect(getEvaluationResultFromHand(flushRoyal)).toEqual(expectedEvaluationResult);
})

it('should return a Straight Flush evaluationResult object', ()=>{
  const straightFlush: UICard[] = [
    new UICard(6, Suit.hearts),
    new UICard(2, Suit.hearts),
    new UICard(3, Suit.hearts),
    new UICard(4, Suit.hearts),
    new UICard(5, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(9, 6 , 0, 0, 0)
  expect(getEvaluationResultFromHand(straightFlush)).toEqual(expectedEvaluationResult);
})

it('should return a Four of a kind evaluationResult object', ()=>{
  const fourOfAKind: UICard[] = [
    new UICard(11, Suit.clubs),
    new UICard(11, Suit.spades),
    new UICard(11, Suit.diamonds),
    new UICard(11, Suit.hearts),
    new UICard(12, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(8, 12, 11, 0, 0, 0);
  expect(getEvaluationResultFromHand(fourOfAKind)).toEqual(expectedEvaluationResult);
})

it('should return a Full House evaluationResult object', ()=>{
  const fullHouse: UICard[] = [
    new UICard(3, Suit.hearts),
    new UICard(4, Suit.spades),
    new UICard(4, Suit.clubs),
    new UICard(4, Suit.hearts),
    new UICard(3, Suit.diamonds),
  ];

  const expectedEvaluationResult = new EvaluationResult(7, 4, 0, 4, 3, 0);
  expect(getEvaluationResultFromHand(fullHouse)).toEqual(expectedEvaluationResult);
})

it('should return a Flush evaluationResult object', ()=>{
  const flush: UICard[] = [
    new UICard(13, Suit.hearts),
    new UICard(1, Suit.hearts),
    new UICard(2, Suit.hearts),
    new UICard(4, Suit.hearts),
    new UICard(12, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(6, 14, 0, 0, 0, 0);
  expect(getEvaluationResultFromHand(flush)).toEqual(expectedEvaluationResult);
})

//TODO: Should this and the following be equal?
it('should return a Straight evaluationResult object', ()=>{
  const straight: UICard[] = [
    new UICard(1, Suit.spades),
    new UICard(2, Suit.diamonds),
    new UICard(3, Suit.clubs),
    new UICard(4, Suit.hearts),
    new UICard(5, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(5, 14, 0, 0, 0, 0);
  expect(getEvaluationResultFromHand(straight)).toEqual(expectedEvaluationResult);
})

//TODO: Should this and the previous be equal?
it('should return a Straight evaluationResult object', ()=>{
  const straight: UICard[] = [
    new UICard(10, Suit.spades),
    new UICard(11, Suit.diamonds),
    new UICard(12, Suit.clubs),
    new UICard(13, Suit.hearts),
    new UICard(14, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(5, 14, 0, 0, 0, 0);
  expect(getEvaluationResultFromHand(straight)).toEqual(expectedEvaluationResult);
})

it('should return a Three of a Kind evaluationResult object', ()=>{
  const threeOfAKind: UICard[] = [
    new UICard(5, Suit.spades),
    new UICard(5, Suit.diamonds),
    new UICard(5, Suit.clubs),
    new UICard(11, Suit.hearts),
    new UICard(2, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(4, 11, 0, 5, 0, 0);
  expect(getEvaluationResultFromHand(threeOfAKind)).toEqual(expectedEvaluationResult);
})

it('should return a Two Pairs evaluationResult object', ()=>{
  const twoPairs: UICard[] = [
    new UICard(5, Suit.spades),
    new UICard(5, Suit.diamonds),
    new UICard(2, Suit.clubs),
    new UICard(11, Suit.hearts),
    new UICard(2, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(3, 11, 0, 0, 5, 2);
  expect(getEvaluationResultFromHand(twoPairs)).toEqual(expectedEvaluationResult);
})

it('should return a One Pair evaluationResult object', ()=>{
  const pair: UICard[] = [
    new UICard(5, Suit.spades),
    new UICard(3, Suit.diamonds),
    new UICard(2, Suit.clubs),
    new UICard(11, Suit.hearts),
    new UICard(2, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(2, 11, 0, 0, 2, 0);
  expect(getEvaluationResultFromHand(pair)).toEqual(expectedEvaluationResult);
})

it('should return a High Card evaluationResult object', ()=>{
  const highCard: UICard[] = [
    new UICard(5, Suit.spades),
    new UICard(3, Suit.diamonds),
    new UICard(4, Suit.clubs),
    new UICard(11, Suit.hearts),
    new UICard(2, Suit.hearts),
  ];

  const expectedEvaluationResult = new EvaluationResult(1, 11, 0, 0, 0, 0);
  expect(getEvaluationResultFromHand(highCard)).toEqual(expectedEvaluationResult);
})
