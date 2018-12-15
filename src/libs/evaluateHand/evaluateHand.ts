import Card from '../models/card.model';
import EvaluationResult from '../../classes/evaluationResult.class';
import _ from 'lodash';

const getCardGroupsBySuit = (hand: Card[]) => _.groupBy(hand, 'suit');
const getCardGroupsByRank = (hand: Card[]) => _.groupBy(hand, 'rank');
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

const isStraight = (sortedHand: Card[]) => sortedHand.reduce((isStraight: boolean, currentCard: Card, i: number, arr: Card[])=>{
  if (i === 0) return isStraight && true;
  if (arr[i-1].rank + 1 === arr[i].rank) return isStraight && true;
  return isStraight && false;
}, true);

const isRoyalFlush = (sortedHand: Card[]): boolean => everyCardIsSameSuit(sortedHand) && isRoyal(sortedHand);
const isStraightFlush = (sortedHand: Card[]): boolean => everyCardIsSameSuit(sortedHand) && isStraight(sortedHand);
const isFourOfAKind = (hand: Card[]) => {
  const rankGroups = Object.keys(getCardGroupsByRank(hand));
  // console.log(rankGroups.map((key:string) => rankGroups[key]));
  return rankGroups.map((key:string) => rankGroups[key])
                    .filter((cardGroup: Card[]) => cardGroup.length)
                    .filter((cardGroup: Card[]) => cardGroup.length === 4)
                    .length === 1;
}
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

const getEvaluationResultFromHand = (hand: Card[]): EvaluationResult => new EvaluationResult(); //TODO: Implement

export { isFourOfAKind };