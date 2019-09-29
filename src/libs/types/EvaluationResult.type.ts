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

export default EvaluationResult;