import React, { useEffect } from 'react'
import { useOutlet } from 'react-router-dom'
import LayoutAdmin from '../../components/admin/LayoutAdmin'
import ManageCardComponent from '../../components/admin/ManageCard'
import { useDispatch, useSelector } from 'react-redux'
import { validateAuth } from '../../store/actions/userAction'

const ManageCard = () => {
    const outlet = useOutlet()
    const dispatch = useDispatch()
    const token: any = localStorage.getItem('token');

    useEffect(() => {
        dispatch(validateAuth(token) as any);
    }, [])

    const userInfo = useSelector((state: any) => state.userReducer.userInfo);
    console.log(userInfo);

    return (
        <>
            {userInfo && userInfo.role === 'Admin' || userInfo.role === 'Owner' ? (
                outlet ? outlet : (
                    <>
                        <LayoutAdmin>
                            <ManageCardComponent />
                        </LayoutAdmin>
                    </>
                )
            ) : (
                // Hiển thị hoặc chuyển hướng đến trang không có quyền truy cập nếu người dùng không phải là admin
                <div>Bạn không có quyền truy cập trang này</div>
            )}
        </>
    );
}

export default ManageCard