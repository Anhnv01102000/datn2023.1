const imageAssetReducer = (
    state = { imageAssets: [] },
    action: any
) => {
    switch (action.type) {
        case 'GET_IMAGE_ASSET': {
            return { ...state, imageAssets: action.payload }
        }
        case 'CREATE_IMAGE_ASSET': {
            let listImageAsset: any = state.imageAssets;
            if (action.payload) {
                listImageAsset = [...listImageAsset, action.payload]
            }
            return {
                ...state,
                imageAssets: listImageAsset
            }
        }
        default:
            return state;
    }
}

export {
    imageAssetReducer
};