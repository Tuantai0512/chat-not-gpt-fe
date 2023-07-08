import Image from "next/image"
import Avatar from "../public/l60Hf.png"
import conversation from "../styles/conversation.module.scss"
import { useState, useEffect } from "react"
import axios from "axios"

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
        getUser(friendId[0])
    }, [friendId[0]])

    return (
        props.selected ?
        <div className="flex items-center px-4 py-1 relative cursor-pointer break-all pr-[4.5rem] )} )} bg-transparent group border-b sticky">
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
            <span className="text-black px-5 dark:text-white text-2xl font-bold">{user}</span>
        </div>
        :
        <div className="flex items-center px-2 py-1 relative rounded-md cursor-pointer break-all pr-[4.5rem] )} )} bg-transparent hover:bg-gray-800 group">
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