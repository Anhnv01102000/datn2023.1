import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:8888/api/"
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // const token = localStorage.getItem('access-token');
    // config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export const pixabay = () => {
    return axios.get('https://pixabay.com/api/?key=40862614-2505822d8da8f969d86393155')
}

export default instance
