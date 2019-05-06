// #region Actions
export const BALANCE_CHANGED_SUCCESSFULLY = 'BALANCE_CHANGED_SUCCESSFULLY';

// #endregion Actions

export const userBalanceChangedSuccessfully = (payload: { balance: number}) => ({
    type: BALANCE_CHANGED_SUCCESSFULLY,
    payload
})