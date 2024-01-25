const transactionReducer = (
    state = { transactions: [] },
    action: any
) => {
    switch (action.type) {
        case 'GET_TRANSACTION': {
            return { ...state, transactions: action.payload }
        }
        default:
            return state;
    }
};

export { transactionReducer }