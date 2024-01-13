import React, { useEffect, useState } from 'react'
import UserInfo from '../../components/home/UserInfo'
import { validateAuth } from '../../store/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import CardList from '../../components/home/Card/CardList'
import Header from '../../components/home/Header'
import { getLikeCardByUser, getListCardByUser } from '../../store/actions/cardAction'

const Profile = () => {
    const dispatch = useDispatch()
    const [listCard, setListCard] = useState([]);
    const [activeButton, setActiveButton] = useState('owner');
    const userInfo = useSelector((state: any) => state.userReducer.userInfo);

    const getCardByUser = (cards: any) => {
        setListCard(cards);
    };

    const getLikedCardByUser = (likedCards: any) => {
        setListCard(likedCards);
    };

    useEffect(() => {
        const fetchData = async () => {
            const token: any = localStorage.getItem('token')
            await dispatch(validateAuth(token) as any)

            let response;
            if (userInfo.id) {
                if (activeButton === 'owner') {
                    response = await dispatch(getListCardByUser(userInfo.id) as any)
                } else {
                    response = await dispatch(getLikeCardByUser(userInfo.id) as any)
                }
                setListCard(response.data.data);
            }
        };
        fetchData();
    }, [activeButton, dispatch, userInfo.id]);

    return (
        <>
            <Header
                userInfo={userInfo}
            />
            <UserInfo
                userInfo={userInfo}
                onGetCardByUser={getCardByUser}
                onGetLikedCardByUser={getLikedCardByUser}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
            />
            <CardList
                listCard={listCard}
            />

        </>
    )
}

export default Profile