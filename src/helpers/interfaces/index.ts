import { Suit } from '../../libs/references';


export interface IPlayer {
  index: number;
  name: string;
  hand: ICard[];
  reveal_Cards?: boolean;
};

export interface ICard {
  id: number;
  suit: Suit;
  rank: string;
  isFlipped: boolean;
  cardIndex?: number;
};