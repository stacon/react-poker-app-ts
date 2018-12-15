import { Card } from '.';
import { Suit } from '../references';


describe('Cards should be created as expected', ()=>{
  it('should create this ace of Spades'), ()=>{
    const aceOfSpades: Card = new Card(1, Suit.spades);
    expect(aceOfSpades.name).toBe('Ace of Spades');
  }
})