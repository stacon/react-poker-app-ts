export const selectedCard = (playerId: number , cardId: number, isFlipped: boolean, cardIndex: number) : { [key:string] : any } => { // Action Creator
  return { // Action
    type: "CARD_FLIPPED",
    payload: { playerId, cardId, cardIndex ,isFlipped }
  };
};