import axios from "./api.service"

interface Params {
    // Định nghĩa kiểu cho tham số nếu cần
}

const createNewCard = (params: Params) => {
    return axios.post('/card/create', params)
}

const updateCard = (id: string, params: Params) => {
    return axios.put(`/card/update/${id}`, params)
}

const getAllCard = () => {
    return axios.get('/card/getAll')
}

const getCardByUser = (id: string) => {
    return axios.get(`/card/getCardByUser/${id}`)
}

const getCardById = (id: string) => {
    return axios.get(`/card/getCardById/${id}`)
}

const likeCard = (id: string, params: Params) => {
    return axios.put(`/card/likeCard/${id}`, params)
}

const deleteCard = (id: string) => {
    return axios.delete(`/card/delete/${id}`)
}

const getLikedCardByUser = (userId: string) => {
    return axios.get(`/card/liked-cards/${userId}`)
}

const changeOwnerCard = (id: string, params: Params) => {
    return axios.put(`/card/change-owner/${id}`, params)
}


export {
    createNewCard,
    updateCard,
    getAllCard,
    getCardByUser,
    getCardById,
    likeCard,
    deleteCard,
    getLikedCardByUser,
    changeOwnerCard
}
