import axios from "./api.service"

interface Params {
    // Định nghĩa kiểu cho tham số nếu cần
}

const uploadImageS3 = (params: Params) => {
    return axios.post('/image/upload', params)
}

const getRemoteImage = (params: Params) => {
    return axios.post('/image/get-remote-image', params)
}


export { uploadImageS3, getRemoteImage }
