export default class CardProperties {
    constructor(
        public id: number,
        public suit: string,
        public rank: string,
        public isFlipped: boolean
    ) {}
}