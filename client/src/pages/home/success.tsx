import React, { useEffect } from 'react'
import { validateAuth } from '../../store/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/home/Header'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const token: any = localStorage.getItem('token')
        if (token) {
            dispatch(validateAuth(token) as any)
        }
    }, [])

    const userInfo = useSelector((state: any) => state.userReducer.userInfo);

    return (
        <>
            {userInfo ? (
                <div className="flex flex-col h-screen">
                    <Header userInfo={userInfo} />

                    <div className="flex flex-col items-center justify-center flex-grow">
                        <p className="text-lg font-bold">Bạn đã thanh toán thành công</p>
                        <p>Vui lòng kiểm tra lại trong phần
                            <label onClick={() => navigate(`/profile/${userInfo.id}`)} className='text-sky-500 cursor-pointer font-semibold'> thiệp của tôi</label>
                        </p>
                    </div>
                </div>
            ) : (
                // Chuyển hướng sang login
                navigate('/login')
            )}
        </>
    )
}

export default Success