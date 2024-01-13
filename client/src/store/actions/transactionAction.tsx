import { AppDispatch } from ".."
import { getAllTransaction } from "../../services/transaction.service"

const getListTransaction = () => async (dispatch: AppDispatch) => {
    const response = await getAllTransaction()
    if (response.data.status === "success") {
        dispatch({
            type: 'GET_TRANSACTION',
            payload: response.data.data
        })
    }
    return response
}

export {
    getListTransaction
}