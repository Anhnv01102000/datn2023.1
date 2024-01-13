import React, { useEffect } from 'react'
import ProfileComponent from '../../components/home/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { validateAuth } from '../../store/actions/userAction'

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token: any = localStorage.getItem('token');
    useEffect(() => {
        dispatch(validateAuth(token) as any);
    }, [])

    const userInfo = useSelector((state: any) => state.userReducer.userInfo);
    return (
        <>
            {userInfo ? (
                <ProfileComponent />
            ) : (
                // Chuyển hướng sang login
                navigate('/login')
            )}
        </>
    )
}

export default Profile