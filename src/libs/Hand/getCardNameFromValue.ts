import { signedCardsSymbols } from 'src/resources';

const getCardNameFromValue = (highCardValue: number) => {
  if (highCardValue > 10 || highCardValue === 1 )  {
    return signedCardsSymbols[highCardValue];
  }
  return highCardValue.toString();
}

export default getCardNameFromValue;