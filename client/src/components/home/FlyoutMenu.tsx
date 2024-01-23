import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import man from "../../assets/man.png"

interface Props {
    userInfo: { id: string, username: string, email: string, image: string }
}

const FlyoutMenu: React.FC<Props> = ({ userInfo }) => {
    // console.log(userInfo);

    const solutions = [
        { name: userInfo.username, email: userInfo.email, image: userInfo.image, href: `/profile/${userInfo.id}` },
    ]
    const callsToAction = [
        {
            name: 'Change Profile',
            href: `/changeProfile/${userInfo.id}`
        },
        {
            name: 'Logout',
            href: '/login'
        },
    ]
    const navigate = useNavigate()

    const handleNavigate = async (item: any) => {
        if (item.name === "Logout") {
            localStorage.clear();
            navigate(item.href)
        } else {
            navigate(item.href)
        }
    }
    return (
        <Popover className="relative">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-bold leading-6 text-gray-900">
                {
                    userInfo.image
                        ?
                        <img
                            src={userInfo.image}
                            alt='user-image'
                            width={70}
                            height={70}
                            className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
                        />
                        :
                        <img
                            src={man}
                            alt='user-image'
                            width={70}
                            height={70}
                            className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
                        />
                }

                <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-1/2 z-20 mt-5 flex max-w-max -translate-x-[82%] px-4">
                    <div className=" max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-4">
                            {solutions.map((item, key) => (
                                <div
                                    key={key}
                                    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                                    onClick={() => navigate(`${item.href}`)}
                                >
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        {item.image
                                            ?
                                            <img src={item.image} alt='avatarUser' width={50} height={50} />
                                            :
                                            <img src={man} alt='avatarUser' width={50} height={50} />
                                        }
                                    </div>
                                    <div>
                                        <div
                                            onClick={() => navigate(`${item.href}`)}
                                            className="font-semibold text-gray-900"
                                        >
                                            {item.name}
                                            <span className="absolute inset-0" />
                                        </div>
                                        <p className="mt-1 text-gray-600">{item.email}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                            {callsToAction.map((item) => (
                                <div
                                    key={item.name}
                                    className="cursor-pointer flex items-center justify-center gap-x-1 p-2 font-semibold text-gray-900 hover:bg-gray-100"
                                    onClick={() => handleNavigate(item)}
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default FlyoutMenu
