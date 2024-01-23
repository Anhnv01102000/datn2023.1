import React, { useEffect, useState } from 'react'
import { Button, Form, Image, Input, Modal, Select, Space, Table, Tag, Upload } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import { HiSearch } from 'react-icons/hi';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { deleteUser1, editUserRole, getListUser } from '../../store/actions/userAction';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const ManageUserComponent = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        dispatch(getListUser() as any)
    }
    const users = useSelector((state: any) => state.userReducer.users)
    console.log(users);
    const role = [
        {
            id: 1,
            name: "Supporter"
        },
        {
            id: 2,
            name: "User"
        }
    ]
    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            align: 'center',
        },
        {
            title: 'Tên User',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
        },
        {
            title: 'Email User',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            width: 200,
        },
        {
            title: 'Phân quyền User',
            dataIndex: 'role',
            key: 'role',
            align: 'center',
            width: 200,
            render: role => {
                let color = "geekblue"
                if (role === "Supporter") {
                    color = "green"
                }
                if (role === "Admin") {
                    color = "volcano"
                }
                return (
                    <Tag color={color}>
                        {role?.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            align: "center",
            render: (_, record) => (
                <Space size={'large'}>
                    <Button onClick={() => handleEditRow(record)}>Edit</Button>
                    <Button type="primary" onClick={() => showConfirm(record)} danger>Delete</Button>
                </Space>
            ),
        },
    ];

    const [input, setInput] = useState('')
    const filterData = () => {
        if (input === '') return users
        console.log(users?.map((el: any) => el.id.toLowerCase().includes(input.toLowerCase())));
        return users.filter(
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

    const onFinish = async (values: any) => {
        const params = {
            role: values.role,
        }
        console.log(params);
        dispatch(editUserRole(values.id, params) as any)
    };

    const { confirm } = Modal;

    const showConfirm = (record: any) => {
        confirm({
            title: 'Bạn có muốn xóa User này không?',
            icon: <ExclamationCircleFilled />,
            async onOk() {
                dispatch(deleteUser1(record.id) as any)
            },
            onCancel() {
                console.log('Cancel');
            },
            okButtonProps: {
                style: {
                    backgroundColor: "#1677ff"
                }
            }
        });
    };

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex justify-between px-6 pt-6'>
                <h2 className='font-bold text-xl'>User</h2>
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
                <Modal title={'Phân quyền User'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okType={'primary'} footer={null}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="ID"
                            name="id"
                            rules={[{ required: true, message: 'Please input your account ID!' }]}
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item name="username" label="Tên User" rules={[{ required: true }]}>
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item name="email" label="Email User" rules={[{ required: true }]}>
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item name="role" label="Phân quyền">
                            <Select placeholder="Please select a category">
                                {role.map((el: any) => (
                                    <Select.Option key={el.id} value={el.name}>{el.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item >
                            <Space size={'small'}>
                                <Button onClick={() => setIsModalOpen(false)} htmlType="submit">
                                    Submit
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal >
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

export default ManageUserComponent