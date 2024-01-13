import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import testImage from "../../assets/man.png"

interface Props {
    saveDesign: () => void;
    previewDesign: () => void;
    onMoveHome: () => void
}

const HeaderDesign: React.FC<Props> = ({
    saveDesign,
    previewDesign,
    onMoveHome
}) => {
    return (
        <div className="header">
            <header className="bg-current p-1">
                <nav className="flex justify-between items-center max-w-full mx-5">
                    <div
                        className="text-white font-semibold cursor-pointer min-h-[5vh] flex justify-between items-center gap-3"
                        onClick={() => onMoveHome()}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className='text-xs' />
                        <div>Home</div>
                    </div>
                    {/* <div className="flex items-center gap-6">
                        <button className="bg-white text-black font-semibold px-5 py-2 rounded-full hover:bg-[#87acec]">Sign in</button>
                    </div> */}
                    <div className="flex h-full gap-4 items-center">
                        <button
                            onClick={() => saveDesign()}
                            className="text-white cursor-pointe p-1 px-4 rounded-lg border-[1px] hover:bg-white hover:text-black"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => previewDesign()}
                            className="text-white cursor-pointe p-1 px-4 rounded-lg border-[1px] hover:bg-white hover:text-black"
                        >
                            Preview
                        </button>
                        <img
                            src={testImage}
                            alt='user-image'
                            width={60}
                            height={60}
                            className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
                        />
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default HeaderDesign