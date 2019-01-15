import Suit from '../references/suit.reference';
import {RankName} from '../references';
import { ICard } from '../../helpers/interfaces';

const getCardValueByOrderNumber = (order: string): number => (parseInt(order) !== 1) ? parseInt(order) : 14;

const getCardName = (rank: string, suit: Suit) => `${RankName[rank]} of ${suit}`;

class Card implements ICard {
  id: number;
  isFlipped: boolean;
  playerId: number;
  cardIndex?: number;
  public value: number;
  public name: string;

  constructor(
    public rank: string,
    public suit: Suit
  ) {
    this.value = getCardValueByOrderNumber(rank);
    this.name = getCardName(rank, suit)
  }
}

export default Card;