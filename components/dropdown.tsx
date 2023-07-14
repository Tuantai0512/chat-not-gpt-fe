import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { openModal } from '@/stores/actions/modalActions'
import avatarStyle from '../styles/avatar.module.scss'
import Image from "next/image"
import Avatar from '../public/l60Hf.png'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown(props: any) {
  const dispatch = useDispatch();
  const modalStatusRedux = useSelector((state: any) => state.modal);
  const { isOpen } = modalStatusRedux;
  return (
    <Menu as="div" className="relative inline-flex text-left w-full">
      <div className="w-full">
        <Menu.Button className="inline-flex w-full text-white justify-between items-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 hover:text-black">
          <div className='flex items-center'>
            {
              props?.userAvatar ? 
              <img src={`http://localhost:8000/images/${props.userAvatar}`} alt='user avatar' className={avatarStyle['avatar-dropdown']}/>
              :
              <Image
                    src={Avatar}
                    alt='user profile picture'
                    className={avatarStyle['avatar-dropdown']}
              />
            }
            {props.fullname}
          </div>
          <FontAwesomeIcon icon={faEllipsis} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 bottom-full z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => dispatch(openModal())}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                    onClick={() => {localStorage.removeItem("Token")}}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
