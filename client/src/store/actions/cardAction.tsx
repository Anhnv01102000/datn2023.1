import axios from "axios";
import { AppDispatch } from ".."
import { createNewCard, deleteCard, getAllCard, getCardById, getCardByUser, getLikedCardByUser, updateCard } from "../../services/card.service";

const cardEditById = (payload: any) => async (dispatch: AppDispatch) => {
    console.log(payload);
    const card = await getCardById(payload);
    // console.log('card', card);

    const cardCanvas = {
        version: '5.3.0',
        objects: card.data.data.objects,
        background: 'white',
    };
    // console.log("cardCanvas: ", cardCanvas);
    dispatch({ type: 'SET_EDIT_CARD', payload: cardCanvas });
};

const cardInfoById = (payload: any) => async (dispatch: AppDispatch) => {
    console.log(payload);
    const card = await getCardById(payload);
    // console.log('card', card.data.data);
    dispatch({ type: 'SET_INFO_CARD', payload: card.data.data });
};

const resetCardEdit = () => ({
    type: 'RESET_CARD_EDIT',
});

const resetCardInfo = () => ({
    type: 'RESET_CARD_INFO',
});

const createCard = (data: any) => async (dispatch: AppDispatch) => {
    const response = await createNewCard(data)
    if (response.data.status === "success") {
        dispatch({
            type: 'CREATE_CARD',
            payload: response.data.data || []
        })
    }
    return response
}

const getListCard = () => async (dispatch: AppDispatch) => {
    const response = await getAllCard()
    if (response.data.status === "success") {
        dispatch({
            type: 'GET_CARD',
            payload: response.data.data
        })
    }
    return response
}

const deleteCard1 = (id: string) => async (dispatch: AppDispatch) => {
    const response = await deleteCard(id)
    if (response.data.status === "success") {
        dispatch({
            type: "DELETE_CARD",
            payload: response.data.data || []
        })
    }
    return response
}

const editCard = (id: string, data: any) => async (dispatch: AppDispatch) => {
    const response = await updateCard(id, data)
    if (response.status) {
        dispatch({
            type: "EDIT_CARD",
            payload: response.data.data || []
        })
    }
    return response
}

const getListCardByUser = (id: string) => async (dispatch: AppDispatch) => {
    const response = await getCardByUser(id)
    if (response.data.status === "success") {
        dispatch({
            type: 'GET_CARD_BY_USER',
            payload: response.data.data
        })
    }
    return response
}

const getLikeCardByUser = (id: string) => async (dispatch: AppDispatch) => {
    const response = await getLikedCardByUser(id)
    if (response.data.status === "success") {
        dispatch({
            type: 'GET_LIKE_CARD_BY_USER',
            payload: response.data.data
        })
    }
    return response
}

export {
    cardEditById,
    cardInfoById,
    resetCardEdit,
    resetCardInfo,
    createCard,
    deleteCard1,
    getListCard,
    editCard,
    getListCardByUser,
    getLikeCardByUser
}