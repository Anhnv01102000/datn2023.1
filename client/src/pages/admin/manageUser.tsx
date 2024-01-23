import React, { useEffect } from 'react'
import LayoutAdmin from '../../components/admin/LayoutAdmin'
import ManageUserComponent from '../../components/admin/ManageUser'
import { useDispatch, useSelector } from 'react-redux'
import { validateAuth } from '../../store/actions/userAction'

const ManageUser = () => {
    const dispatch = useDispatch()
    const token: any = localStorage.getItem('token');

    useEffect(() => {
        dispatch(validateAuth(token) as any);
    }, [])

    const userInfo = useSelector((state: any) => state.userReducer.userInfo);
    console.log(userInfo);

    return (
        <>
            {userInfo && userInfo.role === 'Admin' ? (
                <>
                    <LayoutAdmin>
                        <ManageUserComponent />
                    </LayoutAdmin>
                </>
            ) : (
                // Hiển thị hoặc chuyển hướng đến trang không có quyền truy cập nếu người dùng không phải là admin
                <div>Bạn không có quyền truy cập trang này</div>
            )}
        </>
    );
}

export default ManageUser