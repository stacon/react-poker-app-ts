import { UICard } from '.';

class IPlayer {
  public hand: UICard[];
  constructor(
    public pid: string,
    public name: string,
    public balance: number,
    public roundPot: number = 0,
  ) {
    this.hand = [];
  }
}

export default IPlayer;