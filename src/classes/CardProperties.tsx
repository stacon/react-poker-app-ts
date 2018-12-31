//import { Suit } from 'src/libs/references';

export default class CardProperties {
    constructor(
        public id: number,
        public suit: string,
        public rank: string,
        public isFlipped: boolean,
        public playerId: number,
        public cardIndex: number
    ) {}
}