import { Card } from '../models';
import { Suit } from '../references';
import { isFourOfAKind } from './evaluateHand';


// it('should evaluate the cardset as true', ()=> {
//   const fiveCardsOfSameSuit = [
//     new Card(1, Suit.hearts),
//     new Card(2, Suit.hearts),
//     new Card(2, Suit.hearts),
//     new Card(4, Suit.hearts),
//     new Card(5, Suit.hearts),
//   ];
//   expect(everyCardIsSameSuit(fiveCardsOfSameSuit)).toBeTruthy();
// })

it('should evaluate the cardset as true', ()=> {
  const hasFourOfAKindHand: Card[] = [
    new Card(1, Suit.hearts),
    new Card(1, Suit.diamonds),
    new Card(2, Suit.hearts),
    new Card(1, Suit.spades),
    new Card(1, Suit.clubs),
  ];
  expect(isFourOfAKind(hasFourOfAKindHand)).toBeTruthy();
})

// it('should evaluate the cardset as true', ()=> {
//   const fiveCardsOfSameSuit = [
//     new Card(1, Suit.hearts),
//     new Card(2, Suit.hearts),
//     new Card(2, Suit.hearts),
//     new Card(4, Suit.hearts),
//     new Card(5, Suit.hearts),
//   ];
//   expect(everyCardIsSameSuit(fiveCardsOfSameSuit)).toBeTruthy();
// })
