import React, { useEffect, useState } from 'react'
import { Button, Form, Image, Input, Modal, Space, Table, Upload } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import { HiSearch } from 'react-icons/hi';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { createBackground, deleteBackground1, editBackground, getListBackground } from '../../store/actions/backgroundAction';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const ManageBackgroundComponent = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchBackgrounds = async () => {
            await dispatch(getListBackground() as any)
        }
        fetchBackgrounds()
    }, [])

    const backgrounds = useSelector((state: any) => state.backgroundReducer.backgrounds)
    console.log(backgrounds);

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            align: 'center',
        },
        {
            title: 'Tên Background',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'Ảnh Background',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            width: 200,
            render: image => <Image src={image} preview={true} />
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
        if (input === '') return backgrounds
        console.log(backgrounds?.map((el: any) => el.id.toLowerCase().includes(input.toLowerCase())));
        return backgrounds.filter(
            ({ id }: any) => id.toLowerCase().includes(input.toLowerCase())
        )
    }

    // Modal
    enum STATUS {
        EDIT,
        CREATE
    }

    const normFile = (e: any) => {
        console.log('event: ', e.fileList);
        // console.log(e?.file?.response);
        if (e?.file?.response?.status === "success") {
            return e?.file?.response?.data?.Location
        }
    };

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(STATUS.CREATE)

    const openCreateModal = () => {
        setIsModalOpen(true);
        setStatus(STATUS.CREATE);
        form.resetFields();
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleEditRow = (record: any) => {
        console.log(record);
        setStatus(STATUS.EDIT);
        form.resetFields();
        form.setFieldsValue(record);
        setIsModalOpen(true);
    }


    const onFinish = async (values: any) => {
        console.log(values);
        const image = await values?.image;

        const params = {
            name: values.name,
            image: image
        }

        console.log(params);

        if (status === STATUS.CREATE) {
            dispatch(createBackground(params) as any)
        } else {
            dispatch(editBackground(values.id, params) as any)
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
    };

    const { confirm } = Modal;

    const showConfirm = (record: any) => {
        confirm({
            title: 'Bạn có muốn xóa Background này không?',
            icon: <ExclamationCircleFilled />,
            async onOk() {
                dispatch(deleteBackground1(record.id) as any)
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
                <h2 className='font-bold text-xl'>Background</h2>
                <h2 className='font-bold text-xl'>Welcome !!! </h2>
            </div>
            <div className='p-4'>
                <div className='m-6 flex justify-between items-center'>
                    <button className='p-2 border rounded-lg bg-slate-600 text-white' onClick={openCreateModal}>
                        Thêm Background
                    </button>
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
                <Modal title={status === STATUS.CREATE ? 'Thêm Background mới' : 'Cập nhật Background'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okType={'primary'} footer={null}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        {
                            !(status === STATUS.CREATE) && (
                                <Form.Item
                                    label="ID"
                                    name="id"
                                    rules={[{ required: true, message: 'Please input your account ID!' }]}
                                >
                                    <Input disabled={true} />
                                </Form.Item>
                            )
                        }
                        <Form.Item name="name" label="Tên Background" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        {status === STATUS.CREATE && (
                            <Form.Item
                                name="image"
                                label="Ảnh Background"
                                rules={[{ required: true }]}
                                getValueFromEvent={normFile}
                            >
                                <Upload
                                    action="http://localhost:8888/api/image/upload"
                                    name='file'
                                    listType="picture-card"
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        )}
                        <Form.Item >
                            <Space size={'small'}>
                                <Button onClick={() => setIsModalOpen(false)} htmlType="submit">
                                    Submit
                                </Button>
                                <Button type="primary" htmlType="button" onClick={onReset} danger>
                                    Reset
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal >
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

export default ManageBackgroundComponent