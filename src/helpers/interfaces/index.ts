import { Card } from '../../libs/models';

export interface IState {
  players: IPlayer[];
};

export interface IPlayer {
  index: number;
  name: string;
  hand: Card[];
  reveal_Cards?: boolean;
};

export interface ICard {
  id: number;
  suit: string;
  rank: string;
  isFlipped: boolean;
  playerId: number;
  cardIndex?: number;
};