const userReducer = (state = { userInfo: '', users: [] },
    action: any) => {
    switch (action.type) {
        case "SET_USER_INFO":
            return { ...state, userInfo: action.payload };
        case 'GET_USER': {
            return { ...state, users: action.payload }
        }
        case "EDIT_USER_ROLE": {
            let listUser = state.users;
            const newList: any = listUser.map((el: any) => {
                if ((el.id === action.payload.id)) {
                    return action.payload
                }
                return el
            })
            return {
                ...state,
                users: newList
            }
        }

        case "DELETE_USER": {
            let listUser = state.users;
            const newList = listUser.filter((el: any) => (el.id !== action.payload.id))
            return {
                ...state,
                users: newList
            }
        }

        default:
            return state;
    }
};

export { userReducer }