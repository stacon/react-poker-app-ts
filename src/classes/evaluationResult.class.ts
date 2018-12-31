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
  constructor(
    public power: number = 0,
    public highCardValue: number = 0,
    public fourOfAKindValue : number = 0,
    public ThreeOfAKindValue : number = 0,
    public highPairValue : number = 0,
    public lowPairValue : number = 0,
  ){}
}

export { EvaluationResult, getWinningHandName }