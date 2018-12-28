export const selectedCard = (id: number, isFlipped: boolean) : { [key:string] : any } => { // Action Creator
  return { // Action
    type: "CARD_FLIPPED",
    payload: { id, isFlipped }
  };
};