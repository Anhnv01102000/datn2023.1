import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { Button, Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import { getListTransaction } from '../../store/actions/transactionAction';
import { HiSearch } from 'react-icons/hi';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const AdminComponent = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        fetchTransactions()
    }, [])

    const fetchTransactions = async () => {
        dispatch(getListTransaction() as any)
    }

    const transactions = useSelector((state: any) => state.transactionReducer.transactions)
    console.log(transactions);

    const columns: ColumnsType<DataType> = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'id',
            key: 'Name',
            fixed: 'left',
            align: 'center',
        },
        {
            title: 'Tên thiệp',
            dataIndex: 'cardId',
            key: 'cardId',
            align: 'center',
            render: (cardId) => {
                return cardId.name
            }
        },
        {
            title: 'Người mua',
            dataIndex: 'payer',
            key: 'payer',
            align: 'center',
            render: (payer) => {
                return payer.username
            }
        },
        {
            title: 'Người bán',
            dataIndex: 'seller',
            key: 'seller',
            align: 'center',
            render: (seller) => {
                return seller.username
            }
        },
        {
            title: 'Thông tin thanh toán',
            dataIndex: 'paymentInfo',
            key: 'paymentInfo',
            align: 'center',
            render: (paymentInfo) => {
                return (
                    <ul style={{ textAlign: 'left', listStyleType: 'none', padding: 0 }}>
                        <li><label className='font-bold'>Mã giao dịch: </label>{paymentInfo.id}</li>
                        <li><label className='font-bold'>Email giao dịch: </label>{paymentInfo.email}</li>
                        <li><label className='font-bold'>Người giao dịch: </label>{paymentInfo.name.given_name} {paymentInfo.name.surname}</li>
                        <li><label className='font-bold'>Tổng tiền: </label>{paymentInfo.total} USD</li>
                        <li><label className='font-bold'>Nội dung giao dịch: </label>{paymentInfo.description}</li>
                    </ul>
                )
            }
        },
    ];

    const [input, setInput] = useState('')
    const filterData = () => {
        if (input === '') return transactions
        console.log(transactions?.map((el: any) => el.id.toLowerCase().includes(input.toLowerCase())));
        return transactions.filter(
            ({ id }: any) => id.toLowerCase().includes(input.toLowerCase())
        )
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex justify-between px-6 pt-6'>
                <h2 className='font-bold text-xl'>Dashboard</h2>
                <h2 className='font-bold text-xl'>Welcome !!! </h2>
            </div>
            <Dashboard />
            <div className='p-4'>
                <div className='mb-4 font-bold text-xl'>Recent Orders</div>
                <div className='m-6 flex justify-end'>
                    <div className='bg-[#e9e9e9] p-3 gap-3 rounded-full w-[300px] flex justify-center items-center'>
                        <HiSearch className='text-[25px] text-gray-500' />
                        <input
                            type="text"
                            placeholder='Search'
                            className='bg-transparent w-full focus:outline-none'
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                </div>
                <Table
                    rowKey={"_id"}
                    columns={columns}
                    dataSource={filterData()}
                    bordered
                    pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['3', '5', '10'] }}
                />
            </div>
        </div>
    )
}

export default AdminComponent