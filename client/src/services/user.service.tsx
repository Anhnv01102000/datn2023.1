import ApiService from './api.service';
import axios from "./api.service"
const baseUrl = 'user/';

interface Params {

}

const signup = (params: Params) => {
    return axios.post("/user/signup", params)
}

const login = (params: Params) => {
    return axios.post("/user/login", params)
}

const authGoogle = (params: Params) => {
    return axios.post("/user/authGoogle", params)
}

const validateAuthToken = (params: Params) => {
    return axios.post("/user/validate", params)
}

const getUser = () => {
    return axios.get('/user/getAll')
}

const updateUserRole = (id: string, params: Params) => {
    return axios.put(`/user/updateRole/${id}`, params)
}

const updateUserProfile = (id: string, params: Params) => {
    return axios.put(`/user/updateProfile/${id}`, params)
}

const deleteUser = (id: string) => {
    return axios.delete(`/user/delete/${id}`)
}


export {
    signup,
    login,
    authGoogle,
    validateAuthToken,
    getUser,
    updateUserRole,
    deleteUser,
    updateUserProfile
}
