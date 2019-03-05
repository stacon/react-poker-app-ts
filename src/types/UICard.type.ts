
import { RankName } from 'src/libs/references';
import { Suit } from 'src/enums';

class UICard {
  public value: number;
  public name: string;
  public flipped: boolean;
  public selected: boolean;

  constructor(
    public rank: number,
    public suit: Suit
  ) {
    this.flipped = false;
    this.selected = false;
    this.value = getCardValueByOrderNumber(rank);
    this.name = getCardName(rank, suit)
  }
}

export const getCardValueByOrderNumber = (order: number): number => (order !== 1) ? order : 14;
export const getCardName = (rank: number, suit: Suit) => {
  return `${RankName[rank]} of ${suit}`;
}

export default UICard;