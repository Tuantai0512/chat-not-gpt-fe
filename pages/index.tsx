import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import ChatsNav from "../components/chatsNav";
import Message from "@/components/message";
import HomeStyle from "../styles/home.module.scss";
import Modal from "@/components/modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../stores/actions/userActions";
import { useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

const verifyToken = async (token: string) => {
  try {
    const res = await axios.post("http://localhost:8000/api/v1/auth", {
      token,
    });

    return res?.data;
  } catch (error) {
    return undefined;
  }
};

const getUserData = async (id: number) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/v1/users?id=${id}`);
    return res
  } catch (error) {
    console.log(error);
  }
}

export default function Home() {
  //handle user login
  const router = useRouter();
  const [user, setUser] = useState({});
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

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/message/${conversation?._id}`);
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
    try {
      let res = await axios.post('http://localhost:8000/api/v1/message', message);
      setMessages([...messages, res?.data]);
      setNewMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])


  return (
    <main className={`${HomeStyle["chats-app"]} flex`}>
      <ChatsNav userInfo={user} />
      <div className="w-3/4 dark:bg-gray-700 dark:text-white flex justify-between flex-col">
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
        <div className="flex justify-center">
          <textarea
            placeholder="Write something...."
            className="w-3/5 px-2 py-2"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button className="block px-2 py-2 border-2 rounded-lg" onClick={handleSend}>Send</button>
        </div>
        <Modal textBtn="Account settings" userInfo={user} />
      </div>
    </main>
  );
}
