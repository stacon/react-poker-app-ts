import {Card, getNewDeck} from './';

it('should create a shuffled 52 card deck', ()=> {
  const deck: Card[] = getNewDeck();
  console.log(deck);
  expect(deck.length).toBe(52);
})