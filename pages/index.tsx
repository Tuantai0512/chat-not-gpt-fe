import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import ChatsNav from "../components/chatsNav";
import HomeStyle from "../styles/home.module.scss";
import Modal from "@/components/modal";
import axios from "axios";
import { useDispatch ,useSelector } from "react-redux";
import { addToken} from "../stores/actions/userActions";

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
        setUser(user);
      });
    } else {
      router.push("/user/login");
    }
  }, [userInfoRedux.token]);

  return (
    <main className={`${HomeStyle["chats-app"]} flex`}>
      <ChatsNav userInfo={user} />
      <div className="w-3/4 dark:bg-gray-700 dark:text-white">
        <div>Welcome to my chat app</div>
        <Modal textBtn="Account settings" userInfo={user}/>
      </div>
    </main>
  );
}
