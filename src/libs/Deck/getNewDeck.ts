import shuffle from 'shuffle-array';
import _ from 'lodash';
import { Card } from '../types';
import { Suit } from '../../../src/enums';

/**
 * Generates a 13 card array for one suit (eg. Ace to King of Spades)
 * @param {Suit} suit
 * @returns {Card[]} 13 card array of the same suit 
 */
// const generateSuitDeck = (suit: Suit): Card[] => {
//   let suitDeck: Card[] = [];
//   let rank = 1
  
//   while (rank < 14) {
//     suitDeck = [...suitDeck, <Card> {suit, rank}];
//     rank++
//   }
//   return suitDeck;
// }

const generateSuitDeck = (suit: Suit): Card[] => ( _.times(13).reduce((deck, rank) => [...deck, <Card>{suit, rank}], []));

const generateDeck = (shuffled: boolean = false): Card[] => {
  const generatedDeck = Object.keys(Suit).map(i => Suit[i]).reduce((deck: Card[], suitName: Suit) => [...deck, ...generateSuitDeck(suitName)], []);
  return (shuffled) ? shuffle(generatedDeck, { 'copy': true }) : generatedDeck;
}

const getNewDeck = (): Card[] => generateDeck(true);

export default getNewDeck;