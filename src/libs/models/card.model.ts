import Suit from '../references/suit.reference';
import OrderName from '../references/orderName.reference';

const getCardValueByOrderNumber = (order: number): number => (order !== 1) ? order : 14;

const getCardName = (order: number, suit: Suit) => `${OrderName[order]} of ${Suit[suit].toLowerCase()}`;

class Card {
  public value: number;
  public name: string;

  constructor(
    public order: number,
    public suit: Suit
  ) {
    this.value = getCardValueByOrderNumber(order);
    this.name = getCardName(order, suit)
  }
}

export default Card;