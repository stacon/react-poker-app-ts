import shuffle from 'shuffle-array';
import { UICard } from 'src/types';
import { Suit } from 'src/enums';

const generateSuitDeck = (suit: Suit): UICard[] => {
  let suitDeck: UICard[] = [];
  let i = 1
  while (i < 14) {
    suitDeck = [...suitDeck, new UICard(i, suit)];
    i++
  }
  return suitDeck;
}

const generateDeck = (shuffled: boolean = false): UICard[] => {
  const generatedDeck = Object.keys(Suit).map(i => Suit[i]).reduce((deck: UICard[], suitName: Suit) => [...deck, ...generateSuitDeck(suitName)], []);
  return (shuffled) ? shuffle(generatedDeck, { 'copy': true }) : generatedDeck;
}

const getNewDeck = (): UICard[] => generateDeck(true);

export default getNewDeck;