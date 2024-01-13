import axios from "./api.service"

interface Params {
    // Định nghĩa kiểu cho tham số nếu cần
}

const createNewTransaction = (params: Params) => {
    return axios.post('/transaction/create', params)
}

const getAllTransaction = () => {
    return axios.get('/transaction/getAll')
}

const getTransactionsBySeller = (id: string) => {
    return axios.get(`/transaction/transactionsBySeller/${id}`)
}

export {
    createNewTransaction,
    getAllTransaction,
    getTransactionsBySeller
}