const cardReducer = (
    state = { cardEdit: "", cardInfo: "", cards: [] },
    action: any) => {
    switch (action.type) {
        case "SET_EDIT_CARD":
            return { ...state, cardEdit: action.payload };
        case 'RESET_CARD_EDIT':
            return { ...state, cardEdit: '' };
        case 'SET_INFO_CARD':
            return { ...state, cardInfo: action.payload };
        case 'RESET_CARD_INFO':
            return { ...state, cardInfo: '' };

        case 'GET_CARD': {
            return { ...state, cards: action.payload }
        }
        case 'CREATE_CARD': {
            let listCard: any = state.cards;
            if (action.payload) {
                listCard = [...listCard, action.payload]
            }
            return {
                ...state,
                cards: listCard
            }
        }
        case "EDIT_CARD": {
            let listCard = state.cards;
            const newList: any = listCard.map((el: any) => {
                if ((el.id === action.payload.id)) {
                    return action.payload
                }
                return el
            })
            return {
                ...state,
                cards: newList
            }
        }
        case "DELETE_CARD": {
            let listCard = state.cards;
            const newList = listCard.filter((el: any) => (el.id !== action.payload.id))
            return {
                ...state,
                cards: newList
            }
        }
        case 'GET_CARD_BY_USER': {
            return { ...state, cards: action.payload }
        }
        case 'GET_LIKE_CARD_BY_USER': {
            return { ...state, cards: action.payload }
        }
        default:
            return state;
    }
};

export { cardReducer }