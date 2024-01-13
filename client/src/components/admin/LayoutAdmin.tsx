import React from 'react';
import { RxDashboard, RxPerson } from 'react-icons/rx';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { BiLogOut } from "react-icons/bi";
import { PiSelectionBackgroundDuotone } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"

const LayoutAdmin = ({ children }: any) => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <div className='flex'>
            <div className='fixed w-24 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
                <div className='flex flex-col items-center'>
                    <div onClick={() => navigate("/")}>
                        <img
                            src={logo}
                            alt='logo'
                            width={70}
                            height={70}
                            className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
                            onClick={() => navigate("/")}
                        />
                    </div>
                    <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                    <div onClick={() => navigate("/admin")}>
                        <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                            <RxDashboard size={20} />
                        </div>
                    </div>
                    <div onClick={() => navigate("/admin/manageBackground")}>
                        <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                            <PiSelectionBackgroundDuotone size={20} />
                        </div>
                    </div>
                    <div onClick={() => navigate("/admin/manageUser")}>
                        <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                            <RxPerson size={20} />
                        </div>
                    </div>
                    <div onClick={() => navigate("/admin/manageCard")}>
                        <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                            <HiOutlineShoppingBag size={20} />
                        </div>
                    </div>
                    <div onClick={() => logout()}>
                        <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                            <BiLogOut size={20} />
                        </div>
                    </div>
                </div>
            </div>
            <main className='ml-24 w-full'>{children}</main>
        </div>
    );
};

export default LayoutAdmin;