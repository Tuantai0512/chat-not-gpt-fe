import Image from "next/image"
import Avatar from "../public/l60Hf.png"
import conversation from "../styles/conversation.module.scss"
import { useState, useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import HomeStyle from "../styles/home.module.scss";

export default function Conversation(props: any) {

    const [user, setUser] = useState<null | string>(null);

    const [avatar, setAvatar] = useState('')

    const friendId = props.conversation.members.find((member: string) => member !== props.currentUser)

    const checkOnline = props.online.some((user: any) => user.userId === parseInt(friendId));

    useEffect(() => {
        const getUser = async (friendId: string) => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/users/?id=${friendId}`);
                setUser(`${res?.data?.users?.firstName} ${res?.data?.users?.lastName}`);
                setAvatar(res?.data?.users?.Avatar)
            } catch (err) {
                console.log(err)
            }
        }
        getUser(friendId)
    }, [friendId])

    const showChatNav = () => {
        const chatNav = document.getElementById('chats-nav');
        const closeIcon = document.getElementById('close-icon');
        chatNav.style.cssText = 'left: 0; animation: .5s slide-right;'
        closeIcon.style.display = 'block'
    }

    return (
        props.selected ?
        <div className="flex items-center px-4 py-1 pl-0 sm:pl-4 relative cursor-pointer break-all bg-transparent group border-b sticky">
            <FontAwesomeIcon icon={faBars} className={`${HomeStyle["bars-icon"]} pr-0 sm:hidden`} onClick={showChatNav}/>
            {
                avatar ? <img src={`http://localhost:8000/images/${avatar}`} alt="friendAvatar" className={conversation["conversation-img-selected"]}/>
                :
                <Image
                    src={Avatar}
                    alt='user profile picture'
                    className={conversation["conversation-img-selected"]}
                />
            }
                <div className={`${conversation["online-icon-selected"]} ${checkOnline ? ' bg-green-400' : ' bg-neutral-400'}`}></div>
            <span className="text-black px-5 dark:text-white text-md sm:text-md font-bold">{user}</span>
        </div>
        :
        <div className="flex items-center px-2 py-1 relative rounded-md cursor-pointer break-all bg-transparent hover:bg-gray-800 group">
            {
                avatar ? <img src={`http://localhost:8000/images/${avatar}`} alt="friendAvatar" className={conversation["conversation-img"]}/>
                :
                <Image
                    src={Avatar}
                    alt='user profile picture'
                    className={conversation["conversation-img"]}
                />
            }
                <div className={`${conversation["online-icon"]} ${checkOnline ? ' bg-green-400' : ' bg-neutral-400'}`}></div>
            <span className="text-white px-2">{user}</span>
        </div>
    )
}