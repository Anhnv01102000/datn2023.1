import { AppDispatch } from ".."
import { createNewBackground, deleteBackground, getBackground, updateBackground } from "../../services/background.service";

const getListBackground = () => async (dispatch: AppDispatch) => {
    const response = await getBackground()

    if (response.data.status === "success") {
        dispatch({
            type: 'GET_BACKGROUND',
            payload: response.data.data
        })
    }
}

const createBackground = (data: any) => async (dispatch: AppDispatch) => {
    const response = await createNewBackground(data)

    if (response.data.status === "success") {
        dispatch({
            type: 'CREATE_BACKGROUND',
            payload: response.data.data || []
        })
    }
}

const editBackground = (id: string, data: any) => async (dispatch: AppDispatch) => {
    const response = await updateBackground(id, data)

    if (response.data.status === "success") {
        dispatch({
            type: "EDIT_BACKGROUND",
            payload: response.data.data || []
        })
    }
}

const deleteBackground1 = (id: string) => async (dispatch: AppDispatch) => {
    const response = await deleteBackground(id)

    if (response.data.status === "success") {
        dispatch({
            type: "DELETE_BACKGROUND",
            payload: response.data.data || []
        })
    }
}

export {
    getListBackground,
    createBackground,
    editBackground,
    deleteBackground1
}