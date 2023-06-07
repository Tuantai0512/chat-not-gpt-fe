import chats from "../styles/chats.module.scss"
import { useState, useEffect } from "react"
import Dropdown from '@/components/dropdown';
import Modal from '@/components/modal';

export default function ChatsNav(props: any) {
    const [search, setSearch] = useState('')
    return(
        <div className={`w-1/4 h-screen flex-col justify-between ${chats['chats-nav']}`}>
            <input className={`${chats['chats-search-user']} `} type="text" placeholder="Search" value={search} name="username" onChange={(e) => { setSearch(e.target.value) }}></input>
            <div className={`${chats['chats-list-user']}`}></div>
            <div className={`${chats['chats-profile']} flex items-center justify-between`}>
                <Dropdown fullname={`${props.userInfo.firstName} ${props.userInfo.lastName}`}/>
            </div>
        </div>
    )
}