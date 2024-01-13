import axios from "axios";
import { AppDispatch } from ".."
import UserService, { deleteUser, getUser, updateUserRole } from "../../services/user.service";

const validateAuth = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const validate = await UserService.validateAuthToken({ token });

        if (validate.data) {
            dispatch({
                type: 'SET_USER_INFO',
                payload: validate.data.data
            })
        }
    } catch (error) {
        console.error('Error validating auth:', error);
    }
};

const getListUser = () => async (dispatch: AppDispatch) => {
    const response = await getUser()

    if (response.data.status === "success") {
        dispatch({
            type: 'GET_USER',
            payload: response.data.data
        })
    }
}

const editUserRole = (id: string, data: any) => async (dispatch: AppDispatch) => {
    const response = await updateUserRole(id, data)

    if (response.data.status === "success") {
        dispatch({
            type: "EDIT_USER_ROLE",
            payload: response.data.data || []
        })
    }
}

const deleteUser1 = (id: string) => async (dispatch: AppDispatch) => {
    const response = await deleteUser(id)

    if (response.data.status === "success") {
        dispatch({
            type: "DELETE_USER",
            payload: response.data.data || []
        })
    }
}
export {
    validateAuth,
    getListUser,
    editUserRole,
    deleteUser1
}