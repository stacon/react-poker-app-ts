import { Suit } from 'src/libs/references';

export default class CardProperties {
    constructor(
        public suit: Suit,
        public rank: number
    ) {}
}