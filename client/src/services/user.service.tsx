import ApiService from './api.service';
import axios from "./api.service"
const baseUrl = 'user/';

interface Params {

}

interface Response {
    // Define the shape of your 'Response' object
    // For example:
    // data: any;
    // message: string;
    // You can specify the actual types that 'Response' should have
    data: any
}

const UserService = {
    // /**
    //  * Get user info
    //  * @param {Params} params
    //  * @returns {Response} response
    //  */
    // async getUserInfo(params: Params): Promise<Response> {
    //   return await axios.get(`/${baseUrl}username/${params}`);
    // },

    /**
     * Signup
     * @param {Params} params
     * @returns {Response} response
     */
    async signup(params: Params): Promise<Response> {
        return ApiService.post(baseUrl + 'signup', params);
    },

    /**
     * Login
     * @param {Params} params
     * @returns {Response} response
     */
    async login(params: Params): Promise<Response> {
        return ApiService.post(baseUrl + 'login', params);
    },

    async updateProfile(params: Params): Promise<Response> {
        return ApiService.put(baseUrl + 'update', params);
    },

    /**
     *
     * @param {*} params :token
     * @returns info user
     */
    async validateAuthToken(params: Params): Promise<Response> {
        return ApiService.post(baseUrl + 'validate', params);
    },

    logout() {
        localStorage.removeItem('tokens');
    },

    /**
     * Send request to retrieve password
     * @param {Params} params
     * @returns {Response} response
     */
    async forgotPassword(params: Params): Promise<Response> {
        return ApiService.post(baseUrl + 'password/forgot', params);
    },
    /**
     * Send request to change password
     * @param {Params} params
     * @returns {Response} response
     */
    async changePassword(params: Params): Promise<Response> {
        return ApiService.post(baseUrl + 'password/change', params);
    },
    /**
     * Confirm verification code to change password
     * @param {Params} params
     * @returns {Response} response
     */
};

const getUser = () => {
    return axios.get('/user/getAll')
}

const updateUserRole = (id: string, params: Params) => {
    return axios.put(`/user/update/${id}`, params)
}

const deleteUser = (id: string) => {
    return axios.delete(`/user/delete/${id}`)
}

export default UserService;

export {
    getUser,
    updateUserRole,
    deleteUser
}
