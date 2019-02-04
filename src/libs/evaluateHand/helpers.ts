import { Card } from "../models";
import _ from 'lodash';
import { ICard, IPlayer } from '../../helpers/interfaces';
import { getWinningHandName as getFinalHandName } from '../models/evaluationResult.model';
import { EvaluationResult } from './../models';
import { getEvaluationResultFromHand } from './evaluateHand';

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
const getGroupValue = (hand: Card[], groupSize: number): number => _.filter(_.groupBy(hand, 'rank'), item => item.length === groupSize)[0][0].value;

const getFourOfAKindGroupValue = (hand: Card[]): number => _.partial(getGroupValue, _, 4)(hand);
const getThreeOfAKindGroupValue = (hand: Card[]): number => _.partial(getGroupValue, _, 3)(hand);
const getPairGroupValue = (hand: Card[]): number => _.partial(getGroupValue, _, 2)(hand);

const getPairsGroupValues = (hand: Card[]): PairValues => ({
  lowPairValue: _.filter(_.groupBy(hand, 'rank'), item => item.length === 2)[0][0].value,
  highPairValue: _.filter(_.groupBy(hand, 'rank'), item => item.length === 2)[1][0].value,
})

const hasStraight = (hand: Card[]): boolean => _.sortBy(hand, 'rank').reduce((isStraight: boolean, currentCard: Card, i: number, arr: Card[]) => {
  if (i === 0) return isStraight && true;
  if (arr[i - 1].rank + 1 === currentCard.rank) return isStraight && true;
  return isStraight && false;
}, true);

const everyCardIsSameSuit = (hand: Card[]): boolean => Object.keys(_.groupBy(hand, 'suit')).length === 1;

const isRoyal = (hand: Card[]): boolean => {
  const sortedHandByValue = _.sortBy(hand, 'rank');
  if (sortedHandByValue[0].value !== 14) return false;
  return sortedHandByValue.reduce((isRoyal: boolean, currentCard: Card, i: number) => {
    if (i === 0) return isRoyal && true;
    if (sortedHandByValue[i - 1].rank + 1 === currentCard.rank) return isRoyal && true;
    return isRoyal && false;
  }, true);
}

const hasFourOfAKind = (hand: Card[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 4, 1)(hand);

const hasThreeOfAKind = (hand: Card[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 3, 1)(hand);
const hasTwoPairs = (hand: Card[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 2, 2)(hand);
const hasOnePair = (hand: Card[]): boolean => _.partial(hasNumberOfCardsOfAKind, _, 2, 1)(hand);
const getHighCard = (hand: Card[]): Card => _.sortBy(hand, 'value').reverse()[0];

class PairValues {
  lowPairValue: number
  highPairValue: number
}

const mapICardToCard = (iCards: ICard[]): Card[] => {
  let cards: Card[] = [];
  iCards.forEach((iCard: ICard) => {
    const card: Card = new Card(mapRankToNumber(iCard.rank), iCard.suit);
    cards.push(card);
  })
  return cards;
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

//creates string array with notifications for players and their final hands
// const UIGetStringArrayFromFinalHands = (players: IPlayer[]): string[] => {
//   let evaluationResults: string[] = [];
//   players.forEach((player: IPlayer) => {
//     const evaluationResult: EvaluationResult | null = getEvaluationResultFromHand(mapICardToCard(player.hand));
//     if (evaluationResult) {
//       const finalHandName: string = getFinalHandName(evaluationResult.power)
//       const highCardName: string = getHighCardName(evaluationResult.highCardValue)
//       evaluationResults.push(`${player.name} has a ${finalHandName} with high card ${highCardName}`)
//     }
//     else {
//       evaluationResults.push('');
//     }
//   })
//   return evaluationResults;
// }

// computes winning hand from players
// const getWinningHandFromPlayers = (players: IPlayer[]): EvaluationResult => {

//   const evaluationResults: EvaluationResult[] = getEvaluationResultsFromPlayers(players);
//   let winningHand: EvaluationResult;
//   const reducer = (prevValue: EvaluationResult, currValue: EvaluationResult): EvaluationResult => {
//     Object.keys(prevValue).forEach((key) => {
//       if (!winningHand) {
//         if (prevValue[key] < currValue[key]) {
//           winningHand = currValue;
//         }
//         else if (prevValue[key] > currValue[key]) {
//           winningHand = prevValue;
//         }
//       }
//     })
//     return winningHand;
//   }
//   return evaluationResults.reduce(reducer)

// }

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


//extracts final hands from players
const getFinalHandArrayFromPlayersArray = (players: IPlayer[]): string[] => {
  let handPowers: string[] = [];
  players.forEach((player: IPlayer) => {
    const evaluationResult: EvaluationResult | null = getEvaluationResultFromHand(mapICardToCard(player.hand));
    const finalHandName: string = getFinalHandName(evaluationResult !== null ? evaluationResult.power : 0)
    handPowers.push(finalHandName);
  });
  return handPowers;
}

const getEvaluationResultsFromPlayers = (players: IPlayer[]): EvaluationResult[] => {
  let evaluationResults: EvaluationResult[] = [];
  players.forEach((player: IPlayer, index: number) => {
    const evaluationResult: EvaluationResult | null = getEvaluationResultFromHand(mapICardToCard(player.hand));
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
  mapICardToCard,
  // UIGetStringArrayFromFinalHands,
  getFinalHandArrayFromPlayersArray,
  // getWinningHandFromPlayers,
  UIGetWinnerFromPlayers,
  getEvaluationResultsFromPlayers
}