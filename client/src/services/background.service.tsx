import axios from "./api.service"

interface Params {
    // Định nghĩa kiểu cho tham số nếu cần
}

const createNewBackground = (params: Params) => {
    return axios.post('/background/create', params)
}

const getBackground = () => {
    return axios.get('/background/getAll')
}

const updateBackground = (id: string, params: Params) => {
    return axios.put(`/background/update/${id}`, params)
}

const deleteBackground = (id: string) => {
    return axios.delete(`/background/delete/${id}`)
}

export {
    createNewBackground,
    getBackground,
    updateBackground,
    deleteBackground
}
