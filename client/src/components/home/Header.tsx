import { HiSearch, HiBell, HiChat } from 'react-icons/hi'
import FlyoutMenu from './FlyoutMenu'
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"
import { useDispatch } from 'react-redux';
import { getListCard } from '../../store/actions/cardAction';

interface Props {
    userInfo: { id: string, username: string, email: string, image: string }
}

const Header: React.FC<Props> = ({ userInfo }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onMoveHome = () => {
        dispatch(getListCard() as any)
        navigate("/")
    }
    return (
        <div className='flex justify-between gap-3 md:gap-2 items-center p-6 '>
            <img
                src={logo}
                alt='logo'
                width={70}
                height={70}
                className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
                onClick={() => onMoveHome()}
            />
            <button
                className='bg-black text-white p-2 px-4 rounded-full hidden md:block'
                onClick={() => navigate("/admin")}
            >
                Admin
            </button>
            <button
                className='font-bold p-2 px-4 rounded-full'
                onClick={() => navigate(`/design`)}
            >
                Create
            </button>
            <div className='bg-[#e9e9e9] p-3 gap-3 items-center rounded-full w-full hidden md:flex'>
                <HiSearch className='text-[25px] text-gray-500' />
                <input type="text" placeholder='Search' className='bg-transparent w-full focus:outline-none' />
            </div>
            <HiBell className='text-[25px] md:text-[50px] text-gray-500 cursor-pointer' />
            {/* <div className='text-center'>
                <FaWallet className='text-[20px] text-gray-500 cursor-pointer' />
                <p >30.000.000</p>
            </div> */}
            <FlyoutMenu
                userInfo={userInfo}
            />
        </div>
    )
}

export default Header