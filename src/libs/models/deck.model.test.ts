import { getNewDeck } from './';
import { UICard } from 'src/components/Views/Game/Card/Card';

it('should create a shuffled 52 card deck', () => {
  const deck: UICard[] = getNewDeck();
  expect(deck.length).toBe(52);
})