import React, { useEffect, useState } from 'react'
import { useNavigate, useOutlet } from 'react-router-dom'
import Header from '../../components/home/Header'
import CardList from '../../components/home/Card/CardList'
import { validateAuth } from '../../store/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { getListCard } from '../../store/actions/cardAction'

const Home = () => {
    const navigate = useNavigate()
    const outlet = useOutlet()
    const dispatch = useDispatch()
    const userInfo = useSelector((state: any) => state.userReducer.userInfo);
    const listCard = useSelector((state: any) => state.cardReducer.cards);

    useEffect(() => {
        const token: any = localStorage.getItem('token')
        if (token) {
            dispatch(validateAuth(token) as any)
        }
        fetchCard()
    }, [])


    const fetchCard = async () => {
        await dispatch(getListCard() as any)
    }
    return (
        <>
            {userInfo ? (
                outlet ? outlet : (
                    <>
                        <Header
                            userInfo={userInfo}
                        />
                        <CardList
                            listCard={listCard}
                        />
                    </>
                )
            ) : (
                // Chuyển hướng sang login
                navigate('/login')
            )}
        </>





    )
}

export default Home