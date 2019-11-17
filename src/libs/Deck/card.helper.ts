import { Suit } from 'src/enums';
import { RankName } from '../references';

/**
 * @param {number} rank Rank represents the order of the card (eg. 1 for Ace and 13 for King)
 * @returns {number} the card's value (eg. 14 for Ace and 2 for Two and 13 for King)
 */
export const getCardValueByRankNumber = (rank: number): number => (rank !== 1) ? rank : 14;

/**
 * @param {number} rank
 * @param {Suit} suit
 * @returns {string} the string name of the card (eg. Ace of Spades)
 */
export const getCardName = (rank: number, suit: Suit) => {
  return `${RankName[rank]} of ${suit}`;
}