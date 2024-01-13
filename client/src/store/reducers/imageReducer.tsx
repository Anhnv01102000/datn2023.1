const imageReducer = (state = { imageProfile: '' }, action: any) => {
    switch (action.type) {
        case "SET_IMAGE":
            return { ...state, image: action.payload };
        default:
            return state;
    }
};

export { imageReducer }