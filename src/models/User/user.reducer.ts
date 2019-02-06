export interface UserState {
  name: string,
  balance: number
}

const initialState = {
  name: 'Sergio',
  balance: 1000.00
}

export default function (state: UserState = initialState, action: any) {
  switch (action.type) {
    default: {
      return state;
    }
  };
};