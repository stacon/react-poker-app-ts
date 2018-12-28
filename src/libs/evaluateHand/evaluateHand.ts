import Card from '../models/card.model';

import { EvaluationResult } from '../../classes/evaluationResult.class';
import { everyCardIsSameSuit, isRoyal, hasStraight, hasThreeOfAKind, hasOnePair, getHighCard, hasFourOfAKind, hasTwoPairs } from './helpers';



const isRoyalFlush = (hand: Card[]): boolean => everyCardIsSameSuit(hand) && isRoyal(hand);
const isStraightFlush = (hand: Card[]): boolean => everyCardIsSameSuit(hand) && hasStraight(hand);
const isStraight = (hand: Card[]) => hasStraight(hand);
const isFullHouse = (sortedHand: Card[]) => hasThreeOfAKind(sortedHand) && hasOnePair(sortedHand);
const isFlush = (sortedHand: Card[]) => everyCardIsSameSuit(sortedHand);


/**
 * From an array of 5 card you can get an evaluation result
 * @param {Array<Card>} hand
 * @returns {EvaluationResult}
 */
const getEvaluationResultFromHand = (hand: Card[]): EvaluationResult | null => {
  if (hand.length !== 5) { console.error(`Number of cards expected is 5. Got ${hand.length}`); return null;}
  const evalResult: EvaluationResult = new EvaluationResult();
  evalResult.highCardValue = getHighCard(hand).value

  if (isRoyalFlush(hand)) {
    evalResult.power = 10
  }
  else if(isStraightFlush(hand)) {
    evalResult.power = 9
  }
  else if(hasFourOfAKind(hand)) {
    evalResult.power = 8
  }
  else if(isFullHouse(hand)) {
    evalResult.power = 7
  }
  else if(isFlush(hand)) {
    evalResult.power = 6
  }
  else if(isStraight(hand)) {
    evalResult.power = 5
  }
  else if(hasThreeOfAKind(hand)) {
    evalResult.power = 4
  }
  else if(hasTwoPairs(hand)) {
    evalResult.power = 3
  }
  else if(hasOnePair(hand)) {
    evalResult.power = 2
  }
  else {
    evalResult.power = 1
  }

  return evalResult
}

export { getEvaluationResultFromHand };

