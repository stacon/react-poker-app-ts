import {Suit} from '../references';
import Card from './card.model';
import shuffle from 'shuffle-array';

// const dealCards = (deck: Card[], number: number) => deck.splice(0, number);
// const dealFiveCards = (deck: Card[]) => dealCards(deck, 5);

const generateSuitDeck = (suit: Suit): Card[] => {
  let suitDeck: Card[] = [];
  let i = 1
  while (i < 14) {
    suitDeck = [...suitDeck, new Card(i, suit)];
    i++
  }
  return suitDeck;
}

const generateDeck = (shuffled: boolean = false) => {
  const generatedDeck = Object.keys(Suit).map(i => Suit[i]).reduce((deck: Card[], suitName: Suit) => [...deck, ...generateSuitDeck(suitName)], []);
  return (shuffled) ? shuffle(generatedDeck, { 'copy': true }) : generatedDeck;
}

const getNewDeck = () => generateDeck(true);

export default getNewDeck;