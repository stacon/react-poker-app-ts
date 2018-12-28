export interface IState {
  hand: ICard[],
};

export interface IPlayer {
  name: string,
  hand: ICard[],
  reveal_Cards?: boolean
};

export interface ICard {
  id: number,
  suit: string,
  rank: number,
  isFlipped: boolean
};