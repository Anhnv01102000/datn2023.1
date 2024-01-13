import React, { useEffect } from 'react'
import DesignComponent from '../../components/home/Design'
import { validateAuth } from '../../store/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Design = () => {
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
                <DesignComponent />
            ) : (
                // Chuyển hướng sang login
                navigate('/login')
            )}
        </>
    )
}

export default Design