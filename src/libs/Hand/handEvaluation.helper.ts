import _ from 'lodash';
import getEvaluationResultFromHand from './getEvaluationResultFromHand';
import { Card, IPlayer, EvaluationResult } from '../types';
import getWinningHandNameFromPower from './getWinningHandNameFromValue';
import WinnerResult from '../types/WinnerResult.type';
import { getCardValueByRankNumber } from '../Deck/card.helper';

/**
 * Factory function for number of sets expected in 5 card array.
 * @param {Array<Card>}hand array of 5 Card Objects
 * @param {number} kindNumber Number of cards expected (e.g. For a four cards of a kind it's 4)
 * @param {number} sets Number of sets expected (e.g. for 2 pairs set it to 2)
 */
const hasNumberOfCardsOfAKind = (hand: Card[], kindNumber: number, sets: number): boolean => {
  const rankGroups = _.groupBy(hand, 'rank');
  return Object.keys(rankGroups).map((key: string) => rankGroups[key])
    .filter((cardGroup: Card[]) => cardGroup.length)
    .filter((cardGroup: Card[]) => cardGroup.length === kindNumber)
    .length === sets;
}

/**
 * This method if a factory for getting values from certain group sizes
 * @param {Array<Card>} hand array of 5 Card Objects
 * @param groupSize size of the expected group
 * @returns {number} value of a group
 */
const getGroupValue = (hand: Card[], groupSize: number): number => getCardValueByRankNumber(_.filter(_.groupBy(hand, 'rank'), item => item.length === groupSize)[0][0].rank);

const getFourOfAKindGroupValue = (hand: Card[]): number => _.partial(getGroupValue, _, 4)(hand);
const getThreeOfAKindGroupValue = (hand: Card[]): number => _.partial(getGroupValue, _, 3)(hand);
const getPairGroupValue = (hand: Card[]): number => _.partial(getGroupValue, _, 2)(hand);

const getPairsGroupValues = (hand: Card[]): PairValues => ({
  lowPairValue: getCardValueByRankNumber(_.filter(_.groupBy(hand, 'rank'), item => item.length === 2)[0][0].rank),
  highPairValue: getCardValueByRankNumber(_.filter(_.groupBy(hand, 'rank'), item => item.length === 2)[1][0].rank),
})

const hasStraight = (hand: Card[]): boolean => _.sortBy(hand, 'rank').reduce((isStraight: boolean, currentCard: Card, i: number, arr: Card[]) => {
  if (i === 0) return isStraight && true;
  if (arr[i - 1].rank + 1 === currentCard.rank) return isStraight && true;
  return isStraight && false;
}, true);

const everyCardIsSameSuit = (hand: Card[]): boolean => Object.keys(_.groupBy(hand, 'suit')).length === 1;

const isRoyal = (hand: Card[]): boolean => {
  const sortedHandByValue = _.sortBy(hand, 'rank');
  if (getCardValueByRankNumber(sortedHandByValue[4].rank) !== 14) return false;
  return sortedHandByValue.reduce((acc, cur) => acc + getCardValueByRankNumber(cur.rank), 0) === 60 && hasStraight(hand);
}

const hasFourOfAKind = (hand: Card[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 4, 1)(hand);

const hasThreeOfAKind = (hand: Card[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 3, 1)(hand);
const hasTwoPairs = (hand: Card[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 2, 2)(hand);
const hasOnePair = (hand: Card[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 2, 1)(hand);
const getHighCard = (hand: Card[]): Card => _.sortBy(hand, 'value').reverse()[0];


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

// TODO: Needs refactoring
const getWinnerResult = (players: IPlayer[]): WinnerResult => {

  const evaluationResults: EvaluationResult[] = getEvaluationResultsFromPlayers(players);

  // evaluationResults.reduce((accResult, curResult,i) => () ,{winningPlayer: null, winningHandName: null})

  const reducer = (prevValue: EvaluationResult, currValue: EvaluationResult): EvaluationResult => {
    let winningHand: EvaluationResult = new EvaluationResult();
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
  const winningHandName: string = getFinalHandName(players[winnerIndex].hand)
  return {
    winningPlayer: players[winnerIndex],
    winningHandName,
  }
}


// Returns the hand name from Player
const getFinalHandName = (hand: Card[]): string => {
  const evaluationResult: EvaluationResult = getEvaluationResultFromHand(hand);
  return getWinningHandNameFromPower(evaluationResult.power);
}

const getEvaluationResultsFromPlayers = (players: IPlayer[]): EvaluationResult[] => {
  let evaluationResults: EvaluationResult[] = [];
  players.forEach((player: IPlayer, ) => {
    const evaluationResult: EvaluationResult = getEvaluationResultFromHand(player.hand);
    evaluationResults.push(evaluationResult ? evaluationResult : <EvaluationResult>{});
  });
  return evaluationResults;
}

type PairValues = {
  lowPairValue: number
  highPairValue: number
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
  getWinnerResult,
  getEvaluationResultsFromPlayers
}