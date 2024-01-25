import axios from './api.service';

interface Params {
    // Định nghĩa kiểu cho tham số nếu cần
}

interface Response {
    // Định nghĩa kiểu cho giá trị trả về nếu cần
}

const createImageAsset = (params: Params) => {
    return axios.post('imageassets/upload', params)
}

const getAllImageAsset = (params: any) => {
    console.log(params);
    return axios.get(`imageassets/all/?email=${params.email}`, params)
}

export { createImageAsset, getAllImageAsset }
