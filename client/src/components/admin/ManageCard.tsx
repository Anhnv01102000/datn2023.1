import React, { useEffect, useState } from 'react'
import { Button, Form, Image, Input, Modal, Select, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import { HiSearch } from 'react-icons/hi';
import { getListCard } from '../../store/actions/cardAction';
import { getListUser } from '../../store/actions/userAction';

interface DataType {
    key: React.Key;
    name: string;
    price: number;
    thumbnail: string;
    numberLike: number
    createdAt: any
}

const ManageCardComponent = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        fetchCards()
    }, [])

    const fetchCards = async () => {
        dispatch(getListCard() as any)
        dispatch(getListUser() as any)
    }
    const cards = useSelector((state: any) => state.cardReducer.cards)
    const users = useSelector((state: any) => state.userReducer.users)
    // console.log(cards);

    const getOwnerName = (owner: any) => {
        const findOwner = users.find((el: any) => el.id === owner.id);
        return findOwner ? findOwner.username : 'Unknown';
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            align: 'center',
        },
        {
            title: 'Tên thiệp',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: 250
        },
        {
            title: 'Ảnh thiệp',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            align: 'center',
            width: 150,
            render: image => <Image src={image} preview={true} />
        },
        {
            title: 'Người sở hữu',
            dataIndex: 'owner',
            key: 'owner',
            align: 'center',
            width: 200,
            render: owner => getOwnerName(owner),
            filters: users.map((el: any) => ({ text: el.username, value: el.id })),
            onFilter: (value: any, record: any) => record.owner.id === value,
        },
        {
            title: 'Giá thiệp',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            width: 120,
            render: price => {
                return price.toLocaleString("en") + " USD";
            },
            sorter: (a, b) => a.price - b.price
        },
        {
            title: 'Lượt thích',
            dataIndex: 'numberLike',
            key: 'numberLike',
            align: 'center',
            width: 120,
            sorter: (a, b) => a.numberLike - b.numberLike
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            width: 120,
            render: createdAt => (new Date(createdAt).toLocaleDateString("en-GB")),
            sorter: (a, b) => a.createdAt - b.createdAt
        },
    ];

    const [input, setInput] = useState('')
    const filterData = () => {
        if (input === '') return cards
        console.log(cards?.map((el: any) => el.id.toLowerCase().includes(input.toLowerCase())));
        return cards.filter(
            ({ id }: any) => id.toLowerCase().includes(input.toLowerCase())
        )
    }

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleEditRow = (record: any) => {
        console.log(record);
        form.resetFields();
        form.setFieldsValue(record);
        setIsModalOpen(true);
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex justify-between px-6 pt-6'>
                <h2 className='font-bold text-xl'>Card</h2>
                <h2 className='font-bold text-xl'>Welcome !!! </h2>
            </div>
            <div className='p-4'>
                <div className='m-6 flex justify-end items-center'>
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
                    rowKey={"id"}
                    columns={columns}
                    dataSource={filterData()}
                    bordered
                    pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['3', '5', '10'] }}
                />
            </div>
        </div>
    )
}

export default ManageCardComponent