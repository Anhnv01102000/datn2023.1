import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface Options {
    id: number;
    type: string;
}

interface Props {
    showModal: boolean;
    type: string;
    imgPreview: string
    cardInfo: any
    CloseModal: () => void;
    saveDesign: (payload: { name: string, description: string, price: number, status: any }) => void
}

const ModalPreview: React.FC<Props> = (
    { showModal, type, imgPreview, CloseModal, saveDesign, cardInfo }
) => {
    // console.log("cardInfo: ", cardInfo);

    const userInfo = useSelector((state: any) => state.userReducer.userInfo);
    const email = userInfo.email
    const [nameCard, setNameCard] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');

    const options: Options[] = [
        {
            id: 1,
            type: 'Public',
        },
        {
            id: 2,
            type: 'Private',
        },
    ];

    const [selected, setSelected] = useState<Options>(options[0]);


    useEffect(() => {
        if (cardInfo !== "") {
            setNameCard(cardInfo.name);
            setDescription(cardInfo.description);
            const select = options.find(value => value.type === cardInfo.role)
            if (select) {
                setSelected(select);
            } else {
                setSelected(options[0]);
            }
            setPrice(cardInfo.price)
        }
    }, [cardInfo]);

    const onCloseModal = () => {
        CloseModal();
    };

    const onClickSaveCard = () => {
        saveDesign({
            name: nameCard,
            description: description,
            price: price,
            status: selected,
        });
    };

    const downloadCard = () => {
        const link = document.createElement('a');
        link.href = imgPreview;
        link.download = cardInfo.name || 'name_default';
        link.click();
    };

    const onClickDownloadCard = () => {
        downloadCard()
    }

    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onCloseModal}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                {/* Content Preview */}
                                {type === 'preview' && (
                                    <div className="w-full p-3 flex items-center justify-center">
                                        {/* Preview image */}
                                        <img
                                            alt=""
                                            className="w-auto border-2 max-w-none object-cover rounded-lg shadow-2xl"
                                            src={imgPreview}
                                        />
                                    </div>
                                )}

                                {/* Content Save */}
                                {type === 'save' && (
                                    <div
                                        className="w-full p-3 py-6 flex items-center justify-center gap-3"
                                    >
                                        <form>
                                            <div className="">
                                                <div className="border-b border-gray-900/10 ">
                                                    <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                                                        <div className="col-span-full">
                                                            <label
                                                                htmlFor="first-name"
                                                                className="block text-sm font-medium leading-6"
                                                            >
                                                                Name Card
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    required
                                                                    type="text"
                                                                    name="first-name"
                                                                    id="first-name"
                                                                    autoComplete="given-name"
                                                                    className="block w-full rounded-md p-2 border py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                                                    value={nameCard}
                                                                    onChange={(e) => setNameCard(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-span-full">
                                                            <label
                                                                htmlFor="about"
                                                                className="block text-sm font-medium leading-6"
                                                            >
                                                                Description
                                                            </label>
                                                            <div className="mt-2">
                                                                <textarea
                                                                    required
                                                                    id="about"
                                                                    name="about"
                                                                    rows={3}
                                                                    className="block w-full rounded-md p-2 border py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                                                    value={description}
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-span-full">
                                                            <label
                                                                htmlFor="price"
                                                                className="block text-sm font-medium leading-6"
                                                            >
                                                                Giá thiết kế
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    required
                                                                    type="number"
                                                                    name="price"
                                                                    id="price"
                                                                    autoComplete="0"
                                                                    className="block w-full rounded-md p-2 border py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                                                    value={price}
                                                                    onChange={(e: any) => setPrice(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-span-full">
                                                            <p className='block text-sm font-medium leading-6'>Do you want to make your card public?</p>
                                                            <Listbox value={selected} onChange={setSelected}>
                                                                <div className="relative mt-2">
                                                                    <Listbox.Button className="relative border w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6">
                                                                        <span className="flex items-center">
                                                                            <span className="ml-3 block truncate">{selected?.type}</span>
                                                                        </span>
                                                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                        </span>
                                                                    </Listbox.Button>

                                                                    <Transition
                                                                        as={React.Fragment}
                                                                        leave="transition ease-in duration-100"
                                                                        leaveFrom="opacity-100"
                                                                        leaveTo="opacity-0"
                                                                    >
                                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                            {options.map((option) => (
                                                                                <Listbox.Option key={option.id} value={option}>
                                                                                    {({ active, selected }) => (
                                                                                        <li
                                                                                            className={`${active ? 'bg-gray-600 text-white' : 'text-gray-900'
                                                                                                } relative cursor-default select-none py-2 pl-3 pr-9`}
                                                                                        >
                                                                                            <div className="flex items-center">
                                                                                                <span
                                                                                                    className={`${selected ? 'font-semibold' : 'font-normal'
                                                                                                        } ml-3 block truncate`}
                                                                                                >
                                                                                                    {option.type}
                                                                                                </span>
                                                                                            </div>

                                                                                            {selected && (
                                                                                                <span
                                                                                                    className={`${active ? 'text-white' : 'text-indigo-600'
                                                                                                        } absolute inset-y-0 right-0 flex items-center pr-4`}
                                                                                                >
                                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                                </span>
                                                                                            )}
                                                                                        </li>
                                                                                    )}
                                                                                </Listbox.Option>
                                                                            ))}
                                                                        </Listbox.Options>
                                                                    </Transition>
                                                                </div>
                                                            </Listbox>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <img
                                            alt=""
                                            className="w-[52%] border-2 object-cover rounded-lg shadow-2xl"
                                            src={imgPreview}
                                        />
                                    </div>
                                )}

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={() => onCloseModal()}
                                    >
                                        Cancel
                                    </button>

                                    {type === 'save' && (
                                        <button
                                            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => onClickSaveCard()}
                                        >
                                            Save
                                        </button>
                                    )}

                                    {type === 'preview' && (
                                        <button
                                            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => onClickDownloadCard()}
                                        >
                                            Download
                                        </button>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div >
            </Dialog >
        </Transition.Root >
    );
};

export default ModalPreview;
