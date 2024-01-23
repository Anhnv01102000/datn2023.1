import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'
import Header from '../../components/home/Header'
import CardList from '../../components/home/Card/CardList'
import { validateAuth } from '../../store/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { getListCard } from '../../store/actions/cardAction'

const Search = () => {
    const navigate = useNavigate()
    const outlet = useOutlet()
    const dispatch = useDispatch()
    const userInfo = useSelector((state: any) => state.userReducer.userInfo);

    useEffect(() => {
        const token: any = localStorage.getItem('token')
        if (token) {
            dispatch(validateAuth(token) as any)
        }
    }, [])

    const location = useLocation();
    const searchData = location.state?.searchData;

    console.log(searchData);

    return (
        <>
            {userInfo ? (
                outlet ? outlet : (
                    <>
                        <Header
                            userInfo={userInfo}
                        />
                        <CardList
                            listCard={searchData}
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

export default Search