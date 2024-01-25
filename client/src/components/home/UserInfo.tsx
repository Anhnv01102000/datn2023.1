import React, { useState } from 'react'
import man from "../../assets/man.png"
import { useDispatch } from 'react-redux';
import { getLikeCardByUser, getListCardByUser } from '../../store/actions/cardAction';

interface Props {
    userInfo: any;
    activeButton: string;
    onClickButton: (buttonType: string) => void;
}
const UserInfo: React.FC<Props> = (
    { userInfo, activeButton, onClickButton }
) => {
    const handleClickButton = (buttonType: string) => {
        onClickButton(buttonType);
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
                    onClick={() => handleClickButton('owner')}
                    className={` p-2 px-3 font-semibold mt-5 rounded-full focus:outline-none ${activeButton === 'owner' ? 'bg-black text-white' : ''}`}
                >
                    Thiệp của tôi
                </button>
                <button
                    onClick={() => handleClickButton('liked')}
                    className={` p-2 px-3 font-semibold mt-5 rounded-full focus:outline-none ${activeButton === 'liked' ? 'bg-black text-white' : ''}`}
                >
                    Đã thích
                </button>
            </div>
        </div>
    )
}

export default UserInfo