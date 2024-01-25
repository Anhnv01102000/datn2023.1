import { AppDispatch } from ".."
import { createImageAsset, getAllImageAsset } from "../../services/imageAssets.service"

const getListImageAsset = (data: any) => async (dispatch: AppDispatch) => {
    console.log(data);

    const response = await getAllImageAsset(data)

    if (response.data.status === "success") {
        dispatch({
            type: 'GET_IMAGE_ASSET',
            payload: response.data.data
        })
    }
}

const createNewImageAsset = (data: any) => async (dispatch: AppDispatch) => {
    const response = await createImageAsset(data)

    if (response.data.status === "success") {
        dispatch({
            type: 'CREATE_IMAGE_ASSET',
            payload: response.data.data || []
        })
    }
}

export {
    getListImageAsset,
    createNewImageAsset
}