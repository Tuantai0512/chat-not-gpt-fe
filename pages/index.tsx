import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import ChatsNav from "../components/chatsNav";
import Message from "@/components/message";
import HomeStyle from "../styles/home.module.scss";
import Modal from "@/components/modal";
import Conversation from "@/components/conversations";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../stores/actions/userActions";
import { useRef } from "react";
import { io, Socket } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faBars } from "@fortawesome/free-solid-svg-icons";
import { data } from "autoprefixer";

const inter = Inter({ subsets: ["latin"] });

const verifyToken = async (token: string) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}auth`, {
      token,
    });

    return res?.data;
  } catch (error) {
    return undefined;
  }
};

const getUserData = async (id: number) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}users?id=${id}`);
    return res
  } catch (error) {
    console.log(error);
  }
}

interface IUser {
  id: string | number
}

interface IArrivalMessage {
  sender: any,
  text: any
}

export default function Home() {
  //handle user login
  const router = useRouter();
  const [user, setUser] = useState<IUser>({ id: '00000' });
  const dispatch = useDispatch();
  const userInfoRedux = useSelector((state: any) => state.user);
  const currentChat = useSelector((state: any) => state.currentChat);
  const { conversation } = currentChat;
  useEffect(() => {
    const token = localStorage.getItem("Token");
    dispatch(addToken(token));
    if (token) {
      verifyToken(token).then((user) => {
        if (!user) {
          router.push("/user/login");
          return;
        }
        getUserData(user.id).then((dataUser) => {
          setUser(dataUser?.data?.users);
        })
      });
    } else {
      router.push("/user/login");
    }
  }, [userInfoRedux.token, userInfoRedux.data]);

  //handle chat message
  const [messages, setMessages] = useState<any | never[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState<IArrivalMessage>({ sender:null, text:null});


  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}message/${conversation?._id}`);
        setMessages(res?.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMessage();
  }, [conversation?._id])

  const handleSend = async () => {
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: conversation?._id
    };

    const receiverId = conversation?.members.find((member: any) => member !== user.id.toString());

    socket?.emit('sendMessage', {
      senderId: user.id.toString(),
      receiverId: parseInt(receiverId),
      text: newMessage
    })

    try {
      let res = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}message`, message);
      setMessages([...messages, res?.data]);
      setNewMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  interface CounterTracker {
    increment: number;
    decrement: number;
  }
  

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  //handle socket.io

  const [socket, setSocket] = useState<Socket>(io());
  useEffect(() => {
    setSocket(io(process.env.NEXT_PUBLIC_URL_SOCKET!));
  }, [])

  socket?.on('getMessage', (data: any) => {
    setArrivalMessage({
      sender: data.senderId,
      text: data.text
    })
  })

  useEffect(() => {
    arrivalMessage && conversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev: any) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  const [ onlineContact, setOnlineContact] = useState([]);

  useEffect(() => {
    socket?.emit('addUser', user.id);
    socket?.on('getUser', (users: any) => {
      setOnlineContact(users);
    })
  }, [user])

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  }
  
  const [newConversation, setNewConversation] = useState({});

  socket?.on('getNewConversation', (data: any) => {
    setNewConversation(data)
  })
  //send new conversation socket
  const sendNewConversation = (newConv: any, receiverId: number | string) => {
    socket?.emit('newConversation',{receiverId ,newConv});
  }

  //handle display chat nav mobile

  const showChatNav = () => {
    const chatNav = document.getElementById('chats-nav')!;
    const closeIcon = document.getElementById('close-icon')!;
    chatNav.style.cssText = 'left: 0; animation: .5s slide-right;'
    closeIcon.style.display = 'block'
  }

  return (
    <main className={`${HomeStyle["chats-app"]} flex`}>
      <ChatsNav userInfo={user} onlineContact={onlineContact} sendNewConversation={sendNewConversation} newConversation={newConversation}/>
      <div className="sm:w-3/4 w-full dark:bg-gray-700 dark:text-white flex justify-between flex-col">
      <div id="mobile-nav" className="sm:hidden border-b-2 "><FontAwesomeIcon icon={faBars} className={HomeStyle["bars-icon"]} onClick={showChatNav}/></div>
      {conversation && <Conversation conversation={conversation} currentUser={user.id.toString()} online={onlineContact} selected={true}/>}
        {
          conversation ?
            <div className={HomeStyle['message-box']}>
              {
                messages.length !== 0 ?
                  messages.map((message: object) => (
                    <div ref={scrollRef}>
                      <Message message={message} own={user.id.toString()} />
                    </div>
                  ))
                  :
                  <span className={`${HomeStyle.noConversationText}`}>Enter the first message to conversation.</span>
              }
            </div>
            :
            <span className={`${HomeStyle.noConversationText}`}>Open a conversation to start a chat.</span>
        }
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Write something...."
            className="w-full sm:w-3/5 pl-4 pr-12 py-2 mb-2 mx-2 flex items-center border-2 bg-transparent rounded-full"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            onKeyDown={handleKeyDown}
          />
          <button className={HomeStyle['send-icon']} onClick={handleSend}><FontAwesomeIcon icon={faPaperPlane} /></button>
        </div>
        <Modal textBtn="Account settings" userInfo={user} />
      </div>
    </main>
  );
}
