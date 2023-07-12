import chats from "../styles/chats.module.scss"
import conversation from "../styles/conversation.module.scss"
import { useState, useEffect } from "react"
import Dropdown from '@/components/dropdown';
import Conversation from "./conversations";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveCurrentChat } from "@/stores/actions/currentChatAction";
import Avatar from "../public/l60Hf.png"
import Image from "next/image";


export default function ChatsNav(props: any) {
    const [search, setSearch] = useState('')

    const [result, setResult] = useState([]);

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


    const handleSearchUser = async (event: any) => {
        if (event.key === 'Enter') {
            const searchUI = document.getElementById('search-result');
            if (searchUI)
                if (search) {
                    searchUI.style.display = "block";
                } else {
                    searchUI.style.display = "none";
                }
            const res = await axios.get(`http://localhost:8000/api/v1/search-users/${search}`)
            setResult(res?.data);
        }
    }


    return (
        <div className={`w-1/4 h-screen flex flex-col bg-gray-900 justify-between ${chats['chats-nav']}`}>
            <div className="overflow-auto">
                <input
                    className={`${chats['chats-search-user']} `}
                    type="text" placeholder="Search"
                    value={search}
                    name="username"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearchUser}
                />
                <div id="search-result" className={`${chats['chats-search-result']}`}>
                    <span className="text-white my-2 block">Result</span>
                    <ul className="">
                        {
                            result && result.map((user) => {
                                if(user.id !== props.userInfo.id)
                                return (
                                    <li className="flex items-center px-2 py-1 relative rounded-md cursor-pointer break-all pr-[4.5rem] )} )} bg-transparent hover:bg-gray-800 group">
                                        { user.Avatar ?
                                            <img src={`http://localhost:8000/images/${user.Avatar}`} alt="friendAvatar" className={conversation["conversation-img"]}/>
                                            : 
                                            <Image
                                                src={Avatar}
                                                alt="Avatar"
                                                className={conversation["conversation-img"]}
                                            />
                                        }
                                        <span className="text-white px-2">{user?.firstName} {user?.lastName}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={`${chats['chats-list-user']}`}>
                    <span className="text-white my-2 block">Contacts</span>
                    <ul>
                        {
                            conversations.map((conversation) => (
                                <li onClick={() => dispatch(saveCurrentChat(conversation))}>
                                    <Conversation conversation={conversation} currentUser={props.userInfo.id.toString()} online={props.onlineContact} selected={false} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className={`${chats['chats-profile']} flex items-center justify-between`}>
                <Dropdown fullname={`${props.userInfo.firstName} ${props.userInfo.lastName}`} userAvatar={props.userInfo.Avatar} />
            </div>
        </div>
    )
}