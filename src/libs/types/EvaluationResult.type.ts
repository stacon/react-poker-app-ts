/**
 * Evaluation result is the model that represents a full hands state.
 * Power is the first comparable attribute of two winning hands.
 * The rest of this model's attributes hold the respected values in case of same power result, for further comparison
 */
class EvaluationResult {
  constructor(
    /** First level of comparison, the hightest level of power is the winning one */
    public power: number = 0,
    public fourOfAKindValue : number = 0,
    public ThreeOfAKindValue : number = 0,
    public highPairValue : number = 0,
    public lowPairValue : number = 0,
    public highCardValue: number = 0,
  ){}
}

export default EvaluationResult;