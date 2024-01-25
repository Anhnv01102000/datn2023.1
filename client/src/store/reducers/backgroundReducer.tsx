const backgroundReducer = (
    state = { backgrounds: [] },
    action: any
) => {
    switch (action.type) {
        case 'GET_BACKGROUND': {
            return { ...state, backgrounds: action.payload }
        }
        case 'CREATE_BACKGROUND': {
            let listBackground: any = state.backgrounds;
            if (action.payload) {
                listBackground = [...listBackground, action.payload]
            }
            return {
                ...state,
                // loading: false,
                backgrounds: listBackground
            }
        }
        case "EDIT_BACKGROUND": {
            let listBackground = state.backgrounds;
            const newList: any = listBackground.map((el: any) => {
                if ((el.id === action.payload.id)) {
                    return action.payload
                }
                return el
            })
            return {
                ...state,
                backgrounds: newList
            }
        }
        case "DELETE_BACKGROUND": {
            let listBackground = state.backgrounds;
            const newList = listBackground.filter((el: any) => (el.id !== action.payload.id))
            return {
                ...state,
                // loading: false,
                backgrounds: newList
            }
        }
        default:
            return state;
    }
}

export {
    backgroundReducer
};