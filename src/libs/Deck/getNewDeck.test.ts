import { Card } from '../types';
import getNewDeck from './getNewDeck';

it('should create a shuffled 52 card deck', () => {
  const deck: Card[] = getNewDeck();
  expect(deck.length).toBe(52);
})