import Card from '../models/card.model';
//import EvaluationResult from '../../classes/evaluationResult.class';
import _ from 'lodash';

const getCardGroupsBySuit = (hand: Card[]) => _.groupBy(hand, 'suit');
const getCardGroupsByRank = (hand: Card[]) => _.groupBy(hand, 'rank');
const hasStraight = (hand: Card[]) => _.sortBy(hand, 'rank').reduce((isStraight: boolean, currentCard: Card, i: number, arr: Card[])=>{
  if (i === 0) return isStraight && true;
  if (arr[i-1].rank + 1 === arr[i].rank) return isStraight && true;
  return isStraight && false;
}, true);

const everyCardIsSameSuit = (hand: Card[]) => Object.keys(getCardGroupsBySuit(hand)).length === 1;


const isRoyal = (sortedHand: Card[]) => {
  if (sortedHand[0].value !==14) return false;
  const sortedHandByValue = sortedHand.slice().sort((cardA: Card,cardB: Card) => cardA.value - cardB.value);
  return sortedHandByValue.reduce((isRoyal: boolean, currentCard: Card, i: number)=>{
      if (i === 0) return isRoyal && true;
      if (sortedHandByValue[i-1].value + 1 === currentCard.value) return isRoyal && true;
      return isRoyal && false;
  }, true);
}


const isRoyalFlush = (hand: Card[]): boolean => everyCardIsSameSuit(hand) && isRoyal(hand);
const isStraightFlush = (hand: Card[]): boolean => everyCardIsSameSuit(hand) && hasStraight(hand);
const isFourOfAKind = (hand: Card[]) => {
  const rankGroups = getCardGroupsByRank(hand);
  return Object.keys(rankGroups).map((key:string) => rankGroups[key])
                    .filter((cardGroup: Card[]) => cardGroup.length)
                    .filter((cardGroup: Card[]) => cardGroup.length === 4)
                    .length === 1;
}
const isStraight = (hand: Card[]) => hasStraight(hand)
// const isFullHouse = (sortedHand: Card[]) => isThreeOfAkind(sortedHand) && isPair(sortedHand);
const isFlush = (sortedHand: Card[]) => everyCardIsSameSuit(sortedHand);

// const isThreeOfAkind = (sortedHand: Card[]) => Object.values(groupedByValueSets(sortedHand)).filter((value: number) => value === 3).length === 1;
// const isTwoPairs = (sortedHand: Card[]) => Object.values(groupedByValueSets(sortedHand)).filter((value: number) => value === 2).length === 2;
// const isOnePair = (sortedHand: Card[]) => Object.values(groupedByValueSets(sortedHand)).filter((value: number) => value === 2).length === 1;


// enum Power {
//     royalFlush = 10,
//     straightFlush = 9,
//     fourOfAKind = 8,
//     fullHouse = 7,
//     flush = 6,
//     straight = 5,
//     threeOfAKind = 4,
//     twoPairs = 3,
//     onePair = 2,
//     highCard = 1
// }

//const getEvaluationResultFromHand = (hand: Card[]): EvaluationResult => new EvaluationResult(); //TODO: Implement

console.info({  isRoyalFlush, isStraightFlush , isStraight, isFlush });

export { isFourOfAKind };

//  NEVER COMMIT THIS FILE