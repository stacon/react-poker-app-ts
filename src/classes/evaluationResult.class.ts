import { Card } from '../libs/models'

const winningHandNames = {
  10: 'Royal Flush',
  9: 'Straight Flush',
  8: 'Four of a kind',
  7: 'Full House',
  6: 'Flush',
  5: 'Straight',
  4: 'Three of a Kind',
  3: 'Two Pairs',
  2: 'One Pair',
  1: 'High Card'
}

const getWinningHandName = (power: number) => winningHandNames[power];

class EvaluationResult {
  power: number;
  highCardValue: number;
  fourOfAKindValue?: number;
  ThreeOfAKindValue?: number;
  highPair?: Card[];
  lowPair?: Card[];
}

export {EvaluationResult, getWinningHandName}