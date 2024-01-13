import React from 'react'
import man from "../../assets/man.png"

interface Props {
    user: { username: string, email: string, image: string }
}
const UserTag: React.FC<Props> = ({ user }) => {
    return (
        <div className=''>
            <div className='flex gap-3 items-center'>
                {
                    user?.image
                        ?
                        <img
                            src={user.image}
                            alt='userImage'
                            width={45}
                            height={45}
                            className='rounded-full'
                        />
                        :
                        <img
                            src={man}
                            alt='userImage'
                            width={45}
                            height={45}
                            className='rounded-full'
                        />
                }
                <div>
                    <h2 className='text-[14px] font-medium'>{user?.username}</h2>
                    <h2 className='text-[12px]'>{user?.email}</h2>
                </div>
            </div>
        </div>
    )
}

export default UserTag