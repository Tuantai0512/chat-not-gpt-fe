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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function ChatsNav(props: any) {
    interface IUser {
        id: string | number,
        Avatar: string,
        firstName: string,
        lastName: string
    }

    const [search, setSearch] = useState('')

    const [result, setResult] = useState([]);

    const [conversations, setConversations] = useState([]);

    const [newConversations, setNewConversations] = useState(null);

    useEffect(() => {
        setNewConversations(props.newConversation);
    }, [props.newConversation])

    const dispatch = useDispatch();

    const getConversations = async (userId: string) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}conversation/${userId}`);
            setConversations(res?.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getConversations(props.userInfo.id)
    }, [props.userInfo.id, newConversations])

    const handleSearchUser = async (event: any) => {
        if (event.key === 'Enter') {
            const searchUI = document.getElementById('search-result');
            if (searchUI)
                if (search) {
                    searchUI.style.display = "block";
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}search-users/${search}`)
                    setResult(res?.data);
                } else {
                    searchUI.style.display = "none";
                }
        }
    }

    const addConversation = async (senderId: (string | number), receiverId: (string | number)) => {
        let checkReceiverId = false;
        const searchUI = document.getElementById('search-result')!;
        conversations.forEach((conversation: any) => {
            if (conversation.members.includes(receiverId.toString())) {
                checkReceiverId = true
            }
        });
        if (checkReceiverId) {
            console.log('Conversation already exist!')
        } else {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}conversation`, {
                senderId: senderId.toString(), receiverId: receiverId.toString()
            });
            getConversations(props.userInfo.id);
            props.sendNewConversation(res?.data, receiverId);
            searchUI.style.display = "none";
        }
    }

    const hideChatNav = () => {
        const chatNav = document.getElementById('chats-nav')!;
        const closeIcon = document.getElementById('close-icon')!;
        chatNav.style.cssText = 'left: -300px; animation: .5s slide-left;'
        closeIcon.style.display = 'none'
    }

    const handleConversationSelected = (conversation: any) => {
        dispatch(saveCurrentChat(conversation));
        hideChatNav();
        const mbNav = document.getElementById('mobile-nav')!;
        mbNav.style.display = 'none'
    }

    return (
        <div id="chats-nav" className={`w-1/4 h-screen hidden flex-col bg-gray-900 justify-between ${chats['chats-nav']} sm:flex`}>
            <FontAwesomeIcon icon={faXmark} id="close-icon" className={`${chats['close-icon']} dark:text-white`} onClick={hideChatNav}/>
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
                            result && result.map((user: IUser) => {
                                if (user.id !== props.userInfo.id)
                                    return (
                                        <li className="flex items-center px-2 py-1 relative rounded-md cursor-pointer break-all pr-[4.5rem] )} )} bg-transparent hover:bg-gray-800 group" onClick={() => addConversation(props.userInfo.id, user.id)}>
                                            {user.Avatar ?
                                                <img src={`${process.env.NEXT_PUBLIC_URL_BACKEND}images/${user.Avatar}`} alt="friendAvatar" className={conversation["conversation-img"]} />
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
                                <li onClick={() => handleConversationSelected(conversation)}>
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