import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import ChatsNav from "../components/chatsNav";
import Message from "@/components/message";
import HomeStyle from "../styles/home.module.scss";
import Modal from "@/components/modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToken, saveData } from "../stores/actions/userActions";

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
  const router = useRouter();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const userInfoRedux = useSelector((state: any) => state.user);
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

  return (
    <main className={`${HomeStyle["chats-app"]} flex`}>
      <ChatsNav userInfo={user} />
      <div className="w-3/4 dark:bg-gray-700 dark:text-white flex justify-between flex-col">
        <div className="message-box">
          <Message own={false} />
          <Message own={true} />
          <Message own={false} />
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Send a message"
            className="w-3/5 px-2 py-2"
          />
          <button className="block px-2 py-2 border-2 rounded-lg">Send</button>
        </div>
        <Modal textBtn="Account settings" userInfo={user} />
      </div>
    </main>
  );
}
