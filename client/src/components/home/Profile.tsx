import React, { useEffect, useState } from 'react'
import UserInfo from '../../components/home/UserInfo'
import { validateAuth } from '../../store/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import CardList from '../../components/home/Card/CardList'
import Header from '../../components/home/Header'
import { getLikeCardByUser, getListCard, getListCardByUser } from '../../store/actions/cardAction'

const Profile = () => {
    const dispatch = useDispatch()
    // const [listCard, setListCard] = useState([]);
    const [activeButton, setActiveButton] = useState('owner');
    const userInfo = useSelector((state: any) => state.userReducer.userInfo);
    const cardsByUser = useSelector((state: any) => state.cardReducer.cardByUser);
    const cardLikeByUser = useSelector((state: any) => state.cardReducer.cardLikeByUser);

    useEffect(() => {
        fetchData(activeButton);
    }, [activeButton, dispatch, userInfo.id]);

    const fetchData = async (buttonType: string) => {
        const token: any = localStorage.getItem('token')
        await dispatch(validateAuth(token) as any)
        if (userInfo.id) {
            // let response;
            if (buttonType === 'owner') {
                // response = await dispatch(getListCardByUser(userInfo.id) as any);
                await dispatch(getListCardByUser(userInfo.id) as any);
            } else {
                // response = await dispatch(getLikeCardByUser(userInfo.id) as any);
                await dispatch(getLikeCardByUser(userInfo.id) as any);
            }
            // setListCard(response.data.data);
        }
    };

    const handleClickButton = (buttonType: string) => {
        setActiveButton(buttonType);
    };

    console.log("activeButton: ", activeButton);
    const listCard = activeButton === 'owner' ? cardsByUser : cardLikeByUser;

    return (
        <>
            <Header
                userInfo={userInfo}
            />
            <UserInfo
                userInfo={userInfo}
                activeButton={activeButton}
                onClickButton={handleClickButton}
            />
            <CardList
                listCard={listCard}
            />

        </>
    )
}

export default Profile