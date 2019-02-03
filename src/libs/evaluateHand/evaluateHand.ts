import Card from '../models/card.model';

import { EvaluationResult } from '../models';
import { everyCardIsSameSuit, isRoyal, hasStraight, hasThreeOfAKind, hasOnePair, getHighCard, hasFourOfAKind, hasTwoPairs, getFourOfAKindGroupValue, getThreeOfAKindGroupValue, getPairGroupValue, getPairsGroupValues, PairValues } from './helpers';



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
    evalResult.fourOfAKindValue = getFourOfAKindGroupValue(hand)
  }
  else if(isFullHouse(hand)) {
    evalResult.power = 7
    evalResult.ThreeOfAKindValue = getThreeOfAKindGroupValue(hand);
    evalResult.highPairValue = getPairGroupValue(hand)
  }
  else if(isFlush(hand)) {
    evalResult.power = 6
  }
  else if(isStraight(hand)) {
    evalResult.power = 5
  }
  else if(hasThreeOfAKind(hand)) {
    evalResult.power = 4
    evalResult.ThreeOfAKindValue = getThreeOfAKindGroupValue(hand);
  }
  else if(hasTwoPairs(hand)) {
    const pairValues: PairValues = getPairsGroupValues(hand);

    evalResult.power = 3
    evalResult.highPairValue = pairValues.highPairValue;
    evalResult.lowPairValue = pairValues.lowPairValue;
  }
  else if(hasOnePair(hand)) {
    evalResult.power = 2
    evalResult.highPairValue = getPairGroupValue(hand)
  }
  else {
    evalResult.power = 1
  }

  return evalResult
}

export { getEvaluationResultFromHand };

