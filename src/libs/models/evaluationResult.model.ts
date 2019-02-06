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

const cards = {
  14: 'A',
  13: 'K',
  12: 'Q',
  11: 'J',
  1: 'A'
}

const getWinningHandName = (power: number) => winningHandNames[power];
const getHighCardName = (highCardValue: number) => {
  if (highCardValue > 10 || highCardValue === 1 )  {
    return cards[highCardValue];
  }
  return highCardValue.toString();
}

class EvaluationResult {
  constructor(
    public power: number = 0,
    public fourOfAKindValue : number = 0,
    public ThreeOfAKindValue : number = 0,
    public highPairValue : number = 0,
    public lowPairValue : number = 0,
    public highCardValue: number = 0,
  ){}
}

export default EvaluationResult

export { getWinningHandName, getHighCardName }