import { Card } from '../libs/models'

class EvaluationResult {
  power: number;
  name: string;
  highCardValue: number;
  fourOfAKindValue?: number;
  ThreeOfAKindValue?: number;
  highPair?: Card[];
  lowPair?: Card[];
}

export default EvaluationResult