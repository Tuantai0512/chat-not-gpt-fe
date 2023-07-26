import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router';
import { useTheme } from "next-themes";
import { Mukta } from '@next/font/google'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faUser, faEnvelope, faPhone, faVenusMars, faPencil, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from '@/stores/actions/modalActions'
import { removeToken, editNameRedux, editEmailRedux } from '@/stores/actions/userActions';
import axios from 'axios';
import PrevAvatar from './previewAvatar';

const mukta = Mukta({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-primary'
})

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Modal(props: any) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const [editName, setEditName] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [editEmail, setEditEmail] = useState(false);
    const [email, setEmail] = useState('');
    const [editPhoneNumber, setEditPhoneNumber] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [editGender, setEditGender] = useState(false);
    const [gender, setGender] = useState('0');
    const cancelButtonRef = useRef(null)
    const dispatch = useDispatch();
    const modalStatusRedux = useSelector((state: any) => state.modal);
    const userInfoRedux = useSelector((state: any) => state.user);
    const { isOpen } = modalStatusRedux

    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const handleDelete = async (id: number) => {
        try {
            let res = await axios.delete(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}/delete-user?id=${id}`);
            localStorage.removeItem("Token");
            dispatch(removeToken());
            return res
        } catch {
            return undefined
        }
    }

    const handleEditName = async (id: number, firstName: string, lastName: string) => {
        try {
            let res = await axios.put(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}edit-user`, {
                id, firstName, lastName
            })
            setEditName(false)
            dispatch(editNameRedux(firstName, lastName));
            return res
        } catch (e) {
            console.log(e);
        }
    }

    const handleEditEmail = async (id: number, email: string) => {
        try {
            let res = await axios.put(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}edit-user`, {
                id, email
            })
            setEditEmail(false)
            dispatch(editEmailRedux(email));
            return res
        } catch (e) {
            console.log(e);
        }
    }

    const handleEditPhoneNumber = async (id: number, phoneNumber: string) => {
        try {
            let res = await axios.put(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}edit-user`, {
                id, phoneNumber
            })
            setEditPhoneNumber(false)
            dispatch(editEmailRedux(phoneNumber));
            return res
        } catch (e) {
            console.log(e);
        }
    }

    const handleEditGender = async (id: number, gender: string) => {
        try {
            let res = await axios.put(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}edit-user`, {
                id, gender
            })
            setEditGender(false)
            dispatch(editEmailRedux(gender));
            return res
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => dispatch(closeModal())}>
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

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center sm:items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                                <div className="bg-gray-50 dark:bg-gray-900 dark:text-white px-4 py-3 sm:flex sm:flex-row flex justify-between items-center border-b-2 border-gray-300 dark:border-gray-500">
                                    <span>{props.textBtn}</span>
                                    <button
                                        type="button"
                                        className="p-2 inline-flex w-max justify-center rounded-md bg-transparent text-sm font-semibold text-gray-900 dark:text-white ring-inset hover:bg-gray-50 dark:hover:bg-transparent sm:mt-0 sm:w-auto"
                                        onClick={() => dispatch(closeModal())}
                                        ref={cancelButtonRef}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </div>
                                <div className="bg-white dark:bg-gray-700 dark:text-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-full sm:w-1/5 flex-shrink-0 items-center justify-center">
                                            <ul className='flex sm:flex-col w-full'>
                                                <li
                                                    className={classNames(activeTab == 0 ? "bg-slate-400 text-white" : "bg-transparent", "mt-3 px-4 py-2 inline-flex w-full justify-center rounded-md text-sm font-semibold text-gray-900 dark:text-white ring-inset hover:cursor-pointer sm:mt-0 sm:w-auto")}
                                                    onClick={() => setActiveTab(0)}
                                                >Profile</li>
                                                <li
                                                    className={classNames(activeTab == 1 ? "bg-slate-400 text-white" : "bg-transparent", "mt-3 px-4 py-2 inline-flex w-full justify-center rounded-md text-sm font-semibold text-gray-900 dark:text-white ring-inset hover:cursor-pointer sm:mt-0 sm:w-auto")}
                                                    onClick={() => setActiveTab(1)}
                                                >Setting</li>
                                            </ul>
                                        </div>
                                        {
                                            activeTab === 0 &&
                                            <div className="mt-3 sm:w-4/5 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                                    My profile
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500 dark:text-white">
                                                        <div>
                                                            <PrevAvatar uid={props.userInfo.id} userAvatar={props.userInfo.Avatar} />
                                                            <div className='flex'>
                                                                {
                                                                    editName === false ?
                                                                        <p className='py-1 flex justify-between items-center w-full'>
                                                                            <span>
                                                                                <FontAwesomeIcon icon={faUser} className='pr-2' />
                                                                                {`${props.userInfo.firstName} ${props.userInfo.lastName}`}
                                                                            </span>
                                                                            <button className='px-2 py-1 border-2 rounded-lg bg-gray-200 rounded-full dark:text-gray-600' onClick={() => setEditName(true)}><FontAwesomeIcon icon={faPencil} /></button>
                                                                        </p>
                                                                        :
                                                                        <div className='py-1 flex justify-between items-center w-full'>
                                                                            <div className='flex items-center'>
                                                                                <FontAwesomeIcon icon={faUser} className='pr-2' />
                                                                                <div className='flex flex-col sm:flex-row'>
                                                                                    <input className='bg-transparent outline-none py-2' type="text" placeholder='First Name' name='firstName' onChange={(e) => setFirstName(e.target.value)} />
                                                                                    <input className='bg-transparent outline-none py-2' type="text" placeholder='Last Name' name='lastName' onChange={(e) => setLastName(e.target.value)} />
                                                                                </div>
                                                                            </div>
                                                                            <span>
                                                                                <button className='px-2 py-1 border-2 rounded-lg bg-gray-200 rounded-full mr-3 dark:text-gray-600' onClick={() => setEditName(false)}><FontAwesomeIcon icon={faXmark} /></button>
                                                                                <button className='px-2 py-1 border-2 rounded-lg bg-gray-200 rounded-full dark:text-gray-600' onClick={() => handleEditName(props.userInfo.id, firstName, lastName)}><FontAwesomeIcon icon={faCheck} /></button>
                                                                            </span>
                                                                        </div>
                                                                }
                                                            </div>
                                                            <div>
                                                                {
                                                                    editEmail === false ?
                                                                        <p className='py-1 flex justify-between items-center'>
                                                                            <span>
                                                                                <FontAwesomeIcon icon={faEnvelope} className='pr-2' />
                                                                                {props.userInfo.email}
                                                                            </span>
                                                                            <button className='px-2 py-1 border-2 rounded-lg bg-gray-200 rounded-full dark:text-gray-600' onClick={() => setEditEmail(true)}><FontAwesomeIcon icon={faPencil} /></button>
                                                                        </p>
                                                                        :
                                                                        <span className='py-1 flex justify-between items-center'>
                                                                            <FontAwesomeIcon icon={faEnvelope} className='pr-2' />
                                                                            <input className='w-full mr-2 bg-transparent outline-none' type="text" placeholder='Email' name='email' onChange={(e) => setEmail(e.target.value)} />
                                                                            <span className='flex'>
                                                                                <button className='px-2 py-1 border-2 rounded-lg bg-gray-200 rounded-full mr-3 dark:text-gray-600' onClick={() => setEditEmail(false)}><FontAwesomeIcon icon={faXmark} /></button>
                                                                                <button className='px-2 py-1 border-2 rounded-lg bg-gray-200 rounded-full dark:text-gray-600' onClick={() => handleEditEmail(props.userInfo.id, email)}><FontAwesomeIcon icon={faCheck} /></button>
                                                                            </span>
                                                                        </span>
                                                                }
                                                            </div>
                                                            <div>
                                                                {
                                                                    editPhoneNumber === false ?
                                                                        <p className='py-1 flex justify-between items-center'>
                                                                            <span>
                                                                                <FontAwesomeIcon icon={faPhone} className='pr-2' />
                                                                                {props.userInfo.phoneNumber}
                                                                            </span>
                                                                            <button className='px-2 py-1 border-2 rounded-lg bg-gray-200 rounded-full dark:text-gray-600' onClick={() => setEditPhoneNumber(true)}><FontAwesomeIcon icon={faPencil} /></button>
                                                                        </p>
                                                                        :
                                                                        <div className='py-1 flex justify-between items-center'>
                                                                            <FontAwesomeIcon icon={faPhone} className='pr-2' />
                                                                            <input className='w-full mr-2 bg-transparent outline-none' type="text" placeholder='Mobile' name='phoneNumber' onChange={(e) => setPhoneNumber(e.target.value)} />
                                                                            <span className='flex'>
                                                                                <button className='px-2 py-1 border-2 rounded-lg bg-gray-200 rounded-full mr-3 dark:text-gray-600' onClick={() => setEditPhoneNumber(false)}><FontAwesomeIcon icon={faXmark} /></button>
                                                                                <button className='px-2 py-1 border-2 rounded-lg bg-gray-200 rounded-full dark:text-gray-600' onClick={() => handleEditPhoneNumber(props.userInfo.id, phoneNumber)}><FontAwesomeIcon icon={faCheck} /></button>
                                                                            </span>
                                                                        </div>
                                                                }
                                                            </div>
                                                            <div>
                                                                {
                                                                    editGender === false ?
                                                                        <p className='py-1 flex justify-between items-center'>
                                                                            <span>
                                                                                <FontAwesomeIcon icon={faVenusMars} className='pr-2' />
                                                                                {props.userInfo.gender === true ? 'Male' : 'Female'}
                                                                            </span>
                                                                            <button className='px-2 py-1 border-2 rounded-lg bg-gray-200 rounded-full dark:text-gray-600' onClick={() => setEditGender(true)}><FontAwesomeIcon icon={faPencil} /></button>
                                                                        </p>
                                                                        :
                                                                        <div className='py-1 flex justify-between items-center'>
                                                                            <span>
                                                                                <FontAwesomeIcon icon={faVenusMars} className='pr-2' />
                                                                                <select
                                                                                    value={gender}
                                                                                    onChange={(e) => setGender(e.target.value)}
                                                                                    className='bg-transparent border-black-600 dark:border-white-600 border-2 rounded-lg'
                                                                                >
                                                                                    <option className='dark:bg-gray-700' value='true'>Male</option>
                                                                                    <option className='dark:bg-gray-700' value='false'>Female</option>
                                                                                </select>
                                                                            </span>
                                                                            <span>
                                                                                <button className='px-2 py-1 border-2 rounded-lg bg-gray-200 rounded-full mr-3 dark:text-gray-600' onClick={() => setEditGender(false)}><FontAwesomeIcon icon={faXmark} /></button>
                                                                                <button className='px-2 py-1 border-2 rounded-lg bg-gray-200 rounded-full dark:text-gray-600' onClick={() => handleEditGender(props.userInfo.id, gender)}><FontAwesomeIcon icon={faCheck} /></button>
                                                                            </span>
                                                                        </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                        {
                                            activeTab === 1 &&
                                            <div className="mt-3 text-center sm:w-4/5 sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                                    Setting
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500 dark:text-white">
                                                        <div className='flex justify-between pt-2 pb-2 items-center'>
                                                            Theme
                                                            <select
                                                                value={theme}
                                                                onChange={(e) => setTheme(e.target.value)}
                                                                className='bg-transparent border-black-600 dark:border-white-600 border-2 px-2 py-2 rounded-lg'
                                                            >
                                                                <option value="light" className='text-black'>Light</option>
                                                                <option value="dark" className='text-black'>Dark</option>
                                                            </select>
                                                        </div>
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-white">
                                                        <div className='flex justify-between pt-2 items-center border-t-2 border-gray-300 dark:border-gray-500'>
                                                            Delete account
                                                            <button className='px-4 py-2 bg-red-600 text-white rounded-lg' onClick={() => handleDelete(props.userInfo.id)}>Delete</button>
                                                        </div>
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
