import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserService from '../services/user.service';
import { toast } from 'react-toastify';

const SignUpComponent = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    console.log(formData);

    const signUp = async () => {
        const response = await UserService.signup(formData);
        if (response.data.status === "success") {
            toast.success("Đăng ký tài khoản thành công!", {
                position: toast.POSITION.TOP_CENTER,
            });
            navigate("/login")
        } else {
            toast.error(`${response.data.reason}`, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
    return (
        <div>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl border-2 shadow-2xl max-w-3xl p-5 items-center">
                    <div className="md:w-1/2 px-8 md:px-16">
                        <h2 className="font-bold text-2xl text-[#002D74]">Sign Up</h2>
                        <form onSubmit={(e) => { e.preventDefault(); signUp(); }} className="flex flex-col gap-4">
                            <input onChange={(e) => handleChange(e)} className="p-2 mt-4 rounded-xl border" type="email" name="email" placeholder="Email" />
                            <input onChange={(e) => handleChange(e)} className="p-2 mt-4 rounded-xl border" type="password" name="password" placeholder="Password" />
                            <input onChange={(e) => handleChange(e)} className="p-2 mt-4 rounded-xl border" type="password" name="confirmPassword" placeholder="Confirm Password" />
                            <input onChange={(e) => handleChange(e)} className="p-2 mt-4 rounded-xl border" type="text" name="username" placeholder="Username" />
                            <button type="submit" className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Sign Up</button>
                        </form>

                        <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                            <p>You have an account!</p>
                            <button onClick={() => navigate("/login")} type="submit" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Login</button>
                        </div>
                    </div>
                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" />
                    </div>
                </div>
            </section >
        </div>
    )
}

export default SignUpComponent