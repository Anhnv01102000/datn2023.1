import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListUser } from '../../store/actions/userAction'
import { getListTransaction } from '../../store/actions/transactionAction'
import { getListBackground } from '../../store/actions/backgroundAction'

const Dashboard = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getListUser() as any)
        dispatch(getListTransaction() as any)
        dispatch(getListBackground() as any)
    }, [])

    const users = useSelector((state: any) => state.userReducer.users)
    const backgrounds = useSelector((state: any) => state.backgroundReducer.backgrounds)
    const transactions = useSelector((state: any) => state.transactionReducer.transactions)
    const totals = transactions.map((el: any) => parseInt(el.paymentInfo.total))

    return (
        <div className='grid grid-cols-4 gap-4 p-4'>
            <div className='col-span-1 bg-white w-full border p-4 rounded-lg'>
                <div className='flex flex-col justify-center items-center w-full pb-4'>
                    <p className='text-gray-600'>Số lượng người dùng</p>
                    <p className='text-2xl font-bold'>{users.length}</p>
                </div>
            </div>
            <div className='col-span-1 bg-white w-full border p-4 rounded-lg'>
                <div className='flex flex-col justify-center items-center w-full pb-4'>
                    <p className='text-gray-600'>Số lượng background</p>
                    <p className='text-2xl font-bold'>{backgrounds.length}</p>
                </div>
            </div>
            <div className='col-span-1 bg-white w-full border p-4 rounded-lg'>
                <div className='flex flex-col justify-center items-center w-full pb-4'>
                    <p className='text-gray-600'>Số lượng đơn hàng</p>
                    <p className='text-2xl font-bold'>{transactions.length}</p>
                </div>
            </div>
            <div className='col-span-1 bg-white w-full border p-4 rounded-lg'>
                <div className='flex flex-col justify-center items-center w-full pb-4'>
                    <p className='text-gray-600'>Tổng doanh thu</p>
                    <p className='text-2xl font-bold'>${totals.reduce((sum: number, current: number) => sum + current, 0)}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard