import React, { useEffect, useState } from 'react'
import UserTag from '../UserTag'
import { validateAuth } from '../../../store/actions/userAction';
import { useDispatch } from 'react-redux';
import ModalDetail from '../ModalDetail';

interface Props {
    card: any
}
const CardItem: React.FC<Props> = ({ card }) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const token: any = localStorage.getItem('token')
        dispatch(validateAuth(token) as any)
    }, [])

    const onClickCard = () => {
        setShowModal(true)
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <div className='m-3'>
                <div
                    className="relative 
                before:absolute
                before:h-full before:w-full
                before:rounded-3xl
                before:z-10
                hover:before:bg-gray-600 
                before:opacity-50
                cursor-pointer
                rounded-3xl shadow-[0_0_10px_#00000040]"
                    onClick={() => onClickCard()}
                >
                    <img
                        src={card.thumbnail}
                        alt='test'
                        width={800}
                        height={800}
                        className='rounded-3xl cursor-pointer relative z-0'
                    />
                </div>
                <h2 className='font-bold text-[18px] mb-1 mt-2 line-clamp-2'>{card.name}</h2>
                <UserTag
                    user={card.owner}
                />
            </div>

            <ModalDetail
                showModal={showModal}
                onCloseModal={onCloseModal}
                card={card}
            />
        </>
    )
}

export default CardItem