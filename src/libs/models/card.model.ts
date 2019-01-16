import Suit from '../references/suit.reference';
import { RankName } from '../references';

export const getCardValueByOrderNumber = (order: number): number => (order !== 1) ? order : 14;

export const getCardName = (rank: number, suit: Suit) => {
  
  return `${RankName[rank]} of ${suit}`;
}
class Card {
  public value: number;
  public name: string;

  constructor(
    public rank: number,
    public suit: Suit
  ) {
    this.value = getCardValueByOrderNumber(rank);
    this.name = getCardName(rank, suit)
  }
}

export default Card;