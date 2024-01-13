import React, { useState } from 'react'
import man from "../../assets/man.png"
import { useDispatch } from 'react-redux';
import { getLikeCardByUser, getListCardByUser } from '../../store/actions/cardAction';

interface Props {
    userInfo: any
    onGetCardByUser: (cards: any[]) => void;
    onGetLikedCardByUser: (cards: any[]) => void;
    activeButton: string;
    setActiveButton: (button: string) => void;
}
const UserInfo: React.FC<Props> = (
    { userInfo, onGetCardByUser, onGetLikedCardByUser, activeButton, setActiveButton }
) => {
    const dispatch = useDispatch()

    const handleGetCardByUser = async () => {
        setActiveButton('owner');
        const res = await dispatch(getListCardByUser(userInfo.id) as any)
        if (res.data.status === "success") {
            onGetCardByUser(res.data.data);
        }
    };

    const handleGetLikedCardByUser = async () => {
        setActiveButton('liked');
        const res = await dispatch(getLikeCardByUser(userInfo.id) as any)
        if (res.data.status === "success") {
            onGetLikedCardByUser(res.data.data);
        }
    };
    return (
        <div className='flex flex-col items-center px-3 my-6'>
            {
                userInfo.image
                    ?
                    <img
                        src={userInfo.image}
                        alt='userImage'
                        width={100}
                        height={100}
                        className='rounded-full '
                    />
                    :
                    <img
                        src={man}
                        alt='userImage'
                        width={100}
                        height={100}
                        className='rounded-full '
                    />

            }


            <h2 className='text-[30px] font-semibold'>{userInfo.name}</h2>
            <h2 className='text-gray-400'>{userInfo.email}</h2>
            <h2 className=''>{userInfo.description}</h2>
            <div className='flex gap-4'>
                <button
                    onClick={() => handleGetCardByUser()}
                    className={` p-2 px-3 font-semibold mt-5 rounded-full focus:outline-none ${activeButton === 'owner' ? 'bg-black text-white' : ''}`}
                >
                    Thiệp của tôi
                </button>
                <button
                    onClick={() => handleGetLikedCardByUser()}
                    className={` p-2 px-3 font-semibold mt-5 rounded-full focus:outline-none ${activeButton === 'liked' ? 'bg-black text-white' : ''}`}
                >
                    Đã thích
                </button>
            </div>
        </div>
    )
}

export default UserInfo