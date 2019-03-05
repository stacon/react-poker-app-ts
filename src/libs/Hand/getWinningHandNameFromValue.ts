import { winningHandNames } from 'src/resources';

const getWinningHandNameFromValue = (power: number) => winningHandNames[power];

export default getWinningHandNameFromValue;