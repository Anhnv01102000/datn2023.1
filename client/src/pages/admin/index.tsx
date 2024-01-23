import React, { useEffect } from 'react'
import { useOutlet } from 'react-router-dom'
import LayoutAdmin from '../../components/admin/LayoutAdmin'
import AdminComponent from '../../components/admin'
import { useDispatch, useSelector } from 'react-redux'
import { validateAuth } from '../../store/actions/userAction'

const Admin = () => {
    const outlet = useOutlet()
    const dispatch = useDispatch()
    const token: any = localStorage.getItem('token');

    useEffect(() => {
        dispatch(validateAuth(token) as any);
    }, [])

    const userInfo = useSelector((state: any) => state.userReducer.userInfo);
    console.log(userInfo.role);
    // console.log("outlet: ", outlet);

    return (
        <>
            {userInfo && userInfo.role === 'Admin' || userInfo.role === 'Supporter' ? (
                outlet ? (outlet) : (
                    <>
                        {userInfo.role === 'Admin' && (
                            <LayoutAdmin>
                                <AdminComponent />
                            </LayoutAdmin>
                        )}
                        {userInfo.role === 'Supporter' && (
                            <div>Bạn không có quyền truy cập vào trang này</div>
                        )}
                    </>
                )
            ) : (
                <div>Bạn không có quyền truy cập vào trang này</div>
            )}
        </>
    )
}

export default Admin