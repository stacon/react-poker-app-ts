export interface IState {
  players: IPlayer[];
};

export interface IPlayer {
  index: number;
  name: string;
  hand: ICard[];
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