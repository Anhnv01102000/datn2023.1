import React, { useEffect, useState } from 'react'
import Header from './Header'
import { validateAuth } from '../../store/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import man from "../../assets/man.png"
import { uploadImageByS3 } from '../../store/actions/imageAction';
import { updateUserProfile } from '../../services/user.service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ChangeProfileComponent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token: any = localStorage.getItem('token');
    useEffect(() => {
        dispatch(validateAuth(token) as any);
    }, [])

    const userInfo = useSelector((state: any) => state.userReducer.userInfo);

    const [username, setUsername] = useState(userInfo.username || '');
    const [password, setPassword] = useState(userInfo.password || '');
    const [description, setDescription] = useState(userInfo.description || '');
    const [image, setImage] = useState(userInfo.image || '');

    const uploadImage = async (e: any) => {
        console.log(e.target);
        const upload: any = await dispatch(uploadImageByS3(e.target) as any)
        setImage(upload.data.data.Location)
    }

    const updateProfile = async () => {
        console.log(image);
        const params = {
            username: username,
            password: password,
            description: description,
            image: image
        }
        const res = await updateUserProfile(userInfo.id, params)
        console.log(res);
        if (res.data.status === "success") {
            const newToken = res.data.token
            localStorage.setItem('token', newToken);
            toast.success("Cập nhật trang cá nhân thành công", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
    return (
        <>
            <Header
                userInfo={userInfo}
            />
            <div className='flex items-center justify-center'>
                <div className='grid grid-flow-row'>
                    <h2 className='font-bold text-3xl text-center mb-3'>Chỉnh sửa hồ sơ</h2>
                    <p className='text-center my-2'>Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm vào đây hiển thị cho bất kỳ ai có thể xem hồ sơ của bạn.</p>
                    <div className='my-2'>
                        <p className='font-semibold'>Ảnh:</p>
                        <div className='flex flex-row items-center'>
                            {
                                userInfo.image
                                    ?
                                    <img
                                        src={userInfo.image}
                                        alt='AvatarUser'
                                        width={60}
                                        height={60}
                                        className='mr-3'
                                    />
                                    :
                                    <img
                                        src={man}
                                        alt='AvatarUser'
                                        width={60}
                                        height={60}
                                        className='mr-3'
                                    />
                            }
                            <form>
                                <label className="block">
                                    <input
                                        type="file"
                                        className="block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-black file:text-white
                                            file:cursor-pointer"
                                        accept="image/*"
                                        onChange={(e) => uploadImage(e)}
                                    />
                                </label>
                            </form>
                        </div>
                    </div>
                    <div className='my-2'>
                        <p className='font-semibold'>UserName:</p>
                        <input
                            type="text"
                            value={username}
                            className='border-2 border-[#e9e9e9] rounded-2xl p-3 gap-3 w-2/3 focus:outline-none'
                            onChange={(e: any) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        <p className='font-semibold'>Mật khẩu:</p>
                        <input
                            type="text"
                            value={password}
                            className='border-2 border-[#e9e9e9] rounded-2xl p-3 gap-3 w-2/3 focus:outline-none'
                            onChange={(e: any) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='my-2'>
                        <p className='font-semibold'>Giới thiệu:</p>
                        <input
                            type="text"
                            value={description}
                            className='border-2 border-[#e9e9e9] rounded-2xl p-3 gap-3 w-2/3 focus:outline-none'
                            onChange={(e: any) => setDescription(e.target.value)}
                        />
                    </div>
                    <button
                        className='bg-black text-white p-2 px-4 rounded-3xl max-w-max my-2'
                        onClick={() => updateProfile()}
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
        </>
    )
}

export default ChangeProfileComponent