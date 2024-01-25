import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { authGoogle, login } from '../services/user.service';
import image from "../assets/login.avif"

const LoginComponent = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const loginEmail = async () => {
        const response: any = await login(formData)
        console.log(response.data);
        if (response.data.status === 'success') {
            localStorage.setItem('token', response.data.token)
            // store.dispatch(validateAuth(response.data.token))
            navigate('/')
        } else {
            toast.error(`${response.data.reason}`, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    const loginGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log('Login successful:', tokenResponse);
            // Lấy thông tin người dùng bằng cách sử dụng access_token
            try {
                const profile = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });

                console.log('User profile:', profile);
                // Lưu thông tin người dùng vào db
                if (profile.status === 200) {
                    const params = {
                        email: profile.data.email,
                        username: profile.data.name
                    }
                    const response: any = await authGoogle(params)
                    // console.log("response: ", response);
                    if (response.data.status === 'success') {
                        localStorage.setItem('token', response.data.token)
                        // store.dispatch(validateAuth(response.data.token))
                        navigate('/')
                    }
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        },
        // Các options khác (clientId, redirectUri, ...)
    });
    return (
        <div>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl border-2 shadow-2xl max-w-3xl p-5 items-center">
                    <div className="md:w-1/2 px-8 md:px-16">
                        <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
                        <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>

                        <form onSubmit={(e) => { e.preventDefault(); loginEmail(); }} className="flex flex-col gap-4">
                            <input onChange={(e) => handleChange(e)} className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" />
                            <input onChange={(e) => handleChange(e)} className="p-2 mt-8 rounded-xl border" type="password" name="password" placeholder="Password" />
                            <button type="submit" className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
                        </form>

                        <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                            <hr className="border-gray-400" />
                            <p className="text-center text-sm">OR</p>
                            <hr className="border-gray-400" />
                        </div>

                        <button
                            onClick={() => loginGoogle()}
                            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
                        >
                            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                            </svg>
                            Login with Google
                        </button>

                        <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                            <a href="#">Forgot your password?</a>
                        </div>

                        <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                            <p>Don't have an account?</p>
                            <button onClick={() => navigate("/signup")} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Sign Up</button>
                        </div>
                    </div>
                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl" src={image} />
                    </div>
                </div>
            </section >
        </div>
    )
}

export default LoginComponent