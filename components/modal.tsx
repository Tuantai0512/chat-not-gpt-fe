import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useTheme } from "next-themes";
import { Mukta } from '@next/font/google'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from '@/stores/actions/modalActions'


const mukta = Mukta({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-primary'
})

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Modal(props: any) {
    const [activeTab, setActiveTab] = useState(0);
    const cancelButtonRef = useRef(null)
    const dispatch = useDispatch();
    const modalStatusRedux = useSelector((state: any) => state.modal);
    const userInfoRedux = useSelector((state: any) => state.user);
    const { userInfo } = userInfoRedux;
    const { isOpen } = modalStatusRedux
    
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    console.log(theme);

    return (
        <Transition.Root show={isOpen} as={Fragment} className={`${mukta.variable} font-sans`}>
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
                                <div className="bg-gray-50 dark:bg-gray-900 dark:text-white px-4 py-3 sm:flex sm:flex-row flex justify-between items-center">
                                    <span>{props.textBtn}</span>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-transparent text-sm font-semibold text-gray-900 dark:text-white ring-inset hover:bg-gray-50 dark:hover:bg-transparent sm:mt-0 sm:w-auto"
                                        onClick={() => dispatch(closeModal())}
                                        ref={cancelButtonRef}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </div>
                                <div className="bg-white dark:bg-gray-700 dark:text-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-full w-1/5 flex-shrink-0 items-center justify-center">
                                            <ul className='flex flex-col w-full'>
                                                <li 
                                                className={classNames( activeTab == 0 ? "bg-slate-400 text-white" : "bg-transparent" ,"mt-3 px-4 py-2 inline-flex w-full justify-center rounded-md text-sm font-semibold text-gray-900 dark:text-white ring-inset hover:cursor-pointer sm:mt-0 sm:w-auto")}
                                                onClick={() =>setActiveTab(0)}
                                                >Profile</li>
                                                <li 
                                                className={classNames( activeTab == 1 ? "bg-slate-400 text-white" : "bg-transparent" ,"mt-3 px-4 py-2 inline-flex w-full justify-center rounded-md text-sm font-semibold text-gray-900 dark:text-white ring-inset hover:cursor-pointer sm:mt-0 sm:w-auto")}
                                                onClick={() =>setActiveTab(1)}
                                                >Setting</li>
                                            </ul>
                                        </div>
                                        {
                                            activeTab === 0 && 
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                                    My profile
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500 dark:text-white">
                                                        Are you sure you want to deactivate your account? All of your data will be permanently
                                                        removed. This action cannot be undone.
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                        {
                                            activeTab === 1 && 
                                            <div className="mt-3 text-center w-4/5 sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                                    Setting
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500 dark:text-white">
                                                        <div>
                                                            Theme
                                                            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                                                                <option value="light">Light</option>
                                                                <option value="dark">Dark</option>
                                                            </select>
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
