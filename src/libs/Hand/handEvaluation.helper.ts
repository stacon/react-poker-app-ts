import _ from 'lodash';
import getEvaluationResultFromHand from './getEvaluationResultFromHand';
import { UICard, IPlayer, EvaluationResult } from 'src/types';
import getCardNameFromValue from './getCardNameFromValue';
import getWinningHandNameFromValue from './getWinningHandNameFromValue';

/**
 * Factory function for number of sets expected in 5 card array.
 * @param {Array<UICard>}hand array of 5 Card Objects
 * @param {number} kindNumber Number of cards expected (e.g. For a four cards of a kind it's 4)
 * @param {number} sets Number of sets expected (e.g. for 2 pairs set it to 2)
 */
const hasNumberOfCardsOfAKind = (hand: UICard[], kindNumber: number, sets: number): boolean => {
  const rankGroups = _.groupBy(hand, 'rank');
  return Object.keys(rankGroups).map((key: string) => rankGroups[key])
    .filter((cardGroup: UICard[]) => cardGroup.length)
    .filter((cardGroup: UICard[]) => cardGroup.length === kindNumber)
    .length === sets;
}

/**
 * This method if a factory for getting values from certain group sizes
 * @param {Array<Card>} hand array of 5 Card Objects
 * @param groupSize size of the expected group
 * @returns {number} value of a group
 */
const getGroupValue = (hand: UICard[], groupSize: number): number => _.filter(_.groupBy(hand, 'rank'), item => item.length === groupSize)[0][0].value;

const getFourOfAKindGroupValue = (hand: UICard[]): number => _.partial(getGroupValue, _, 4)(hand);
const getThreeOfAKindGroupValue = (hand: UICard[]): number => _.partial(getGroupValue, _, 3)(hand);
const getPairGroupValue = (hand: UICard[]): number => _.partial(getGroupValue, _, 2)(hand);

const getPairsGroupValues = (hand: UICard[]): PairValues => ({
  lowPairValue: _.filter(_.groupBy(hand, 'rank'), item => item.length === 2)[0][0].value,
  highPairValue: _.filter(_.groupBy(hand, 'rank'), item => item.length === 2)[1][0].value,
})

const hasStraight = (hand: UICard[]): boolean => _.sortBy(hand, 'rank').reduce((isStraight: boolean, currentCard: UICard, i: number, arr: UICard[]) => {
  if (i === 0) return isStraight && true;
  if (arr[i - 1].rank + 1 === currentCard.rank) return isStraight && true;
  return isStraight && false;
}, true);

const everyCardIsSameSuit = (hand: UICard[]): boolean => Object.keys(_.groupBy(hand, 'suit')).length === 1;

const isRoyal = (hand: UICard[]): boolean => {
  const sortedHandByValue = _.sortBy(hand, 'rank');
  if (sortedHandByValue[0].value !== 14) return false;
  return sortedHandByValue.reduce((isRoyal: boolean, currentCard: UICard, i: number) => {
    if (i === 0) return isRoyal && true;
    if (sortedHandByValue[i - 1].rank + 1 === currentCard.rank) return isRoyal && true;
    return isRoyal && false;
  }, true);
}

const hasFourOfAKind = (hand: UICard[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 4, 1)(hand);

const hasThreeOfAKind = (hand: UICard[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 3, 1)(hand);
const hasTwoPairs = (hand: UICard[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 2, 2)(hand);
const hasOnePair = (hand: UICard[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 2, 1)(hand);
const getHighCard = (hand: UICard[]): UICard => _.sortBy(hand, 'value').reverse()[0];

class PairValues {
  lowPairValue: number
  highPairValue: number
}

const mapRankToNumber = (rank: string): number => {
  let rankNumber: number;
  switch (rank) {
    case 'A':
      rankNumber = 1;
      break;
    case 'K':
      rankNumber = 13;
      break;
    case 'Q':
      rankNumber = 12;
      break;
    case 'J':
      rankNumber = 11;
      break;
    default:
      rankNumber = parseInt(rank);
      break;
  }
  return rankNumber;
}

// creates string array with notifications for players and their final hands
const UIGetPlayerHandFromEvaluationResult = (player: IPlayer): string => {
  if (player) {
    const evaluationResult: EvaluationResult | null = getEvaluationResultFromHand(player.hand);
    if (evaluationResult) {
      const finalHandName: string = getWinningHandNameFromValue(evaluationResult.power)
      const highCardName: string = getCardNameFromValue(evaluationResult.highCardValue)
      return `You have ${finalHandName} with high card ${highCardName}`;
    }
  }
  return '';
}

// computes winning hand from players
const getWinningHandFromPlayers = (players: IPlayer[]): EvaluationResult => {
  const evaluationResults: EvaluationResult[] = getEvaluationResultsFromPlayers(players);
  let winningHand: EvaluationResult;
  const reducer = (prevValue: EvaluationResult, currValue: EvaluationResult): EvaluationResult => {
    Object.keys(prevValue).forEach((key) => {
      if (!winningHand) {
        if (prevValue[key] < currValue[key]) {
          winningHand = currValue;
        }
        else if (prevValue[key] > currValue[key]) {
          winningHand = prevValue;
        }
      }
    })
    return winningHand;
  }
  return evaluationResults.reduce(reducer)

}

const UIGetWinnerFromPlayers = (players: IPlayer[]): string => {

  const evaluationResults: EvaluationResult[] = getEvaluationResultsFromPlayers(players);
  console.log(evaluationResults)

  const reducer = (prevValue: EvaluationResult, currValue: EvaluationResult): EvaluationResult => {
    let winningHand: EvaluationResult = <EvaluationResult>{};
    let winner: boolean = false;
    Object.keys(prevValue).forEach((key) => {
      if (!winner) {
        if (prevValue[key] < currValue[key]) {
          winningHand = currValue;
          winner = true;
        }
        else if (prevValue[key] > currValue[key]) {
          winningHand = prevValue;
          winner = true;
        }
      }
    })
    return winningHand;
  }
  const winningHand: EvaluationResult = evaluationResults.reduce(reducer);
  let winnerIndex: number = evaluationResults.findIndex((result) => result === winningHand);
  const finalHand: string[] = getFinalHandArrayFromPlayersArray([players[winnerIndex]])
  return `Winner is ${players[winnerIndex].name} with ${finalHand[0]}`;

}


// extracts final hands from players
const getFinalHandArrayFromPlayersArray = (players: IPlayer[]): string[] => {
  let handPowers: string[] = [];
  players.forEach((player: IPlayer) => {
    const evaluationResult: EvaluationResult | null = getEvaluationResultFromHand(player.hand);
    const finalHandName: string = getWinningHandNameFromValue(evaluationResult !== null ? evaluationResult.power : 0)
    handPowers.push(finalHandName);
  });
  return handPowers;
}

const getEvaluationResultsFromPlayers = (players: IPlayer[]): EvaluationResult[] => {
  let evaluationResults: EvaluationResult[] = [];
  players.forEach((player: IPlayer, index: number) => {
    const evaluationResult: EvaluationResult | null = getEvaluationResultFromHand(player.hand);
    evaluationResults.push(evaluationResult ? evaluationResult : <EvaluationResult>{});
  });
  return evaluationResults;
}
export {
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
  PairValues,
  mapRankToNumber,
  UIGetPlayerHandFromEvaluationResult,
  getFinalHandArrayFromPlayersArray,
  getWinningHandFromPlayers,
  UIGetWinnerFromPlayers,
  getEvaluationResultsFromPlayers
}