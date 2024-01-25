import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import UserTag from './UserTag'
import { FaHeart } from "react-icons/fa";
import { MdOutlineCloudDownload } from "react-icons/md";
import { likeCard } from '../../services/card.service';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCard1, getLikeCardByUser, getListCard } from '../../store/actions/cardAction';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PayPal from './PayPal';


interface Props {
    showModal: boolean
    onCloseModal: () => void
    card: any
}

const ModalDetail: React.FC<Props> = ({ showModal, onCloseModal, card }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cancelButtonRef = useRef(null)
    const [like, setLike] = useState(false)
    const userInfo = useSelector((state: any) => state.userReducer.userInfo);

    // console.log("userInfo: ", userInfo.id);
    // console.log("card: ", card);

    useEffect(() => {
        const checkLike = card.userLike.find((el: any) => el === userInfo.id);
        if (checkLike) {
            setLike(true);
        }
    }, [card]);

    const download = () => {
        const link = document.createElement('a');
        link.href = card.thumbnail;
        link.download = card.name || 'name_default';
        link.click();
    }

    const handleLikeCard = async () => {
        const params = {
            userId: userInfo.id
        }
        const res = await likeCard(card.id, params)
        if (res.data.action === "like") {
            setLike(true)
        } else {
            setLike(false)
        }
        await dispatch(getLikeCardByUser(userInfo.id) as any);
    }

    const onClickEditCard = () => {
        navigate(`/design/${card.id}`)
    }

    const onClickDeleteCard = async () => {
        const res = await dispatch(deleteCard1(card.id) as any)
        if (res.data.status === "success") {
            onCloseModal()
            toast.error("Đã xóa thiệp!", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
    return (
        <>
            <Transition.Root show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => onCloseModal()}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                                    <div className="bg-white ">
                                        <div className='flex'>
                                            <div className='flex-1'>
                                                <img
                                                    src={card.thumbnail}
                                                    alt="imageCard"
                                                    className="h-full object-cover"
                                                />
                                            </div>
                                            <div className='flex-1 bg-slate-100 p-0 m-0'>
                                                <div className='m-3'>
                                                    <UserTag
                                                        user={card.owner}
                                                    />
                                                </div>
                                                <hr />
                                                <div className='m-3'>
                                                    <p className="font-bold text-[20px]">{card.name}</p>
                                                    <p className='my-3'><label className='font-semibold italic'>Mô tả: </label>{card.description}</p>
                                                    <p><label className='font-semibold italic'>Giá thiệp: </label> {card.price.toLocaleString('en-US')} USD</p>
                                                </div>

                                                <div className="my-6 m-3">
                                                    {card.owner.id === userInfo.id
                                                        ?
                                                        <div className="flex space-x-4">
                                                            <button
                                                                type="button"
                                                                className="flex-1 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-700 text-base font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm"
                                                                onClick={() => onClickEditCard()}
                                                            >
                                                                Sửa thiệp
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="flex-1 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                                                                onClick={() => onClickDeleteCard()}
                                                            >
                                                                Xóa thiệp
                                                            </button>
                                                        </div>
                                                        :
                                                        <PayPal
                                                            card={card}
                                                            userInfo={userInfo}
                                                        />
                                                    }
                                                </div>
                                                <hr />

                                                <div className='m-3 flex'>
                                                    {like
                                                        ?
                                                        < FaHeart onClick={() => handleLikeCard()} size={24} className='mx-3 text-[red]' />
                                                        :
                                                        <FaHeart onClick={() => handleLikeCard()} size={24} className='mx-3 text-slate-500' />
                                                    }
                                                    <MdOutlineCloudDownload onClick={() => download()} size={28} className='mx-3 text-slate-500' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default ModalDetail
