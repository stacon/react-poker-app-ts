import { UICard } from 'src/types';
import getNewDeck from './getNewDeck';

it('should create a shuffled 52 card deck', () => {
  const deck: UICard[] = getNewDeck();
  expect(deck.length).toBe(52);
})