import chats from "../styles/chats.module.scss"
import { useState, useEffect } from "react"
import Dropdown from '@/components/dropdown';
import Conversation from "./conversations";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveCurrentChat } from "@/stores/actions/currentChatAction";

export default function ChatsNav(props: any) {
    const [search, setSearch] = useState('')

    const [conversations, setConversations] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const getConversations = async (userId: string) => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/conversation/${userId}`);
                setConversations(res?.data)
            } catch (err) {
                console.log(err)
            }
        }
        getConversations(props.userInfo.id)
    }, [props.userInfo.id])

    return (
        <div className={`w-1/4 h-screen flex-col bg-gray-900 justify-between ${chats['chats-nav']}`}>
            <input className={`${chats['chats-search-user']} `} type="text" placeholder="Search" value={search} name="username" onChange={(e) => { setSearch(e.target.value) }}></input>
            <div className={`${chats['chats-list-user']}`}>
                <span className="text-white my-2 block">Contacts</span>
                {
                    conversations.map((conversation) => (
                        <div onClick={() => dispatch(saveCurrentChat(conversation))}>
                            <Conversation conversation={conversation} currentUser={props.userInfo.id.toString()} />
                        </div>
                    ))
                }
            </div>
            <div className={`${chats['chats-profile']} flex items-center justify-between`}>
                <Dropdown fullname={`${props.userInfo.firstName} ${props.userInfo.lastName}`} />
            </div>
        </div>
    )
}