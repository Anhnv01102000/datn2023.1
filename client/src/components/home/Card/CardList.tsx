import React from 'react'
import CardItem from './CardItem'

interface Props {
    listCard: Array<any>
}
const CardList: React.FC<Props> = ({ listCard }) => {
    console.log(listCard);
    return (
        <>
            <div
                className='mt-7 px-2 grid lg:grid-cols-4 md:px-5 mb-4 mx-auto'>
                {listCard.map((item, key) => (
                    <CardItem
                        key={key}
                        card={item}
                    />
                ))}
            </div>
        </>
    )
}

export default CardList