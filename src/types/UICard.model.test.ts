import { UICard } from 'src/types';
import { Suit } from 'src/enums';

it('should create this Ace of Spades', ()=>{
    const aceOfSpades: UICard = new UICard(1, Suit.spades);
    expect(aceOfSpades.name).toBe('Ace of Spades');
    expect(aceOfSpades.value).toBe(14);
    expect(aceOfSpades.suit).toBe(Suit.spades);
    expect(aceOfSpades.rank).toBe(1);
});

it('should create this King of Hearts', ()=>{
    const kingOfHearts: UICard = new UICard(13, Suit.hearts);
    expect(kingOfHearts.name).toBe('King of Hearts');
    expect(kingOfHearts.value).toBe(13);
    expect(kingOfHearts.suit).toBe(Suit.hearts);
    expect(kingOfHearts.rank).toBe(13);
});

it('should create this Five of Clubs', ()=>{
    const fiveOfClubs: UICard = new UICard(5, Suit.clubs);
    expect(fiveOfClubs.name).toBe('Five of Clubs');
    expect(fiveOfClubs.value).toBe(5);
    expect(fiveOfClubs.suit).toBe(Suit.clubs);
    expect(fiveOfClubs.rank).toBe(5);
});