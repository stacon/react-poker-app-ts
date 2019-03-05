import { UICard } from '.';

class IPlayer {
  public hand: UICard[];
  constructor(
    public name: string,
    public balance: number
  ) {
    this.hand = [];
  }
}

export default IPlayer;