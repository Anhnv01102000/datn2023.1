const cardReducer = (
    state = { cardEdit: "", cardInfo: "", cards: [], cardByUser: [], cardLikeByUser: [] },
    action: any
) => {
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
            let listCardByUser = state.cardByUser
            const newList = listCard.map((el: any) => {
                if ((el.id === action.payload.id)) {
                    return action.payload
                }
                return el
            })
            const newListCardByUser = listCardByUser.map((el: any) => {
                if ((el.id === action.payload.id)) {
                    return action.payload
                }
                return el
            })
            return {
                ...state,
                cards: newList,
                cardByUser: newListCardByUser
            }
        }
        case "DELETE_CARD": {
            let listCard = state.cards;
            let listCardByUser = state.cardByUser
            const newList = listCard.filter((el: any) => (el.id !== action.payload.id))
            const newListCardByUser = listCardByUser.filter((el: any) => (el.id !== action.payload.id))
            return {
                ...state,
                cards: newList,
                cardByUser: newListCardByUser
            }
        }
        case 'GET_CARD_BY_USER': {
            return { ...state, cardByUser: action.payload }
        }
        case 'GET_CARD_LIKE_BY_USER': {
            return { ...state, cardLikeByUser: action.payload }
        }
        default:
            return state;
    }
};

export { cardReducer }