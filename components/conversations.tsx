import Image from "next/image"
import Avatar from "../public/l60Hf.png"
import conversation from "../styles/conversation.module.scss"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Conversation(props: any) {

    const [user, setUser] = useState<null | string>(null);

    const friendId = props.conversation.members.find((member: string) => member !== props.currentUser)

    const checkOnline = props.online.some((user: any) => user.userId === parseInt(friendId));

    useEffect(() => {
        const getUser = async (friendId: string) => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/users/?id=${friendId}`);
                setUser(`${res?.data?.users?.firstName} ${res?.data?.users?.lastName}`)
            } catch (err) {
                console.log(err)
            }
        }
        getUser(friendId[0])
    }, [friendId[0]])

    return (
        <div className="flex items-center px-2 py-1 relative rounded-md cursor-pointer break-all pr-[4.5rem] )} )} bg-transparent hover:bg-gray-800 group">
            <Image
                src={Avatar}
                alt='user profile picture'
                className={conversation["conversation-img"]}
            />
                <div className={`${conversation["online-icon"]} ${checkOnline ? ' bg-green-400' : ' bg-neutral-400'}`}></div>
            <span className="text-white px-2">{user}</span>
        </div>
    )
}