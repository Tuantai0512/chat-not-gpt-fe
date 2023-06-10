import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import ChatsNav from "../components/chatsNav";
import HomeStyle from "../styles/home.module.scss";
import Modal from "@/components/modal";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   const router = useRouter();
//   let token = '';
//   let [user, setUser] = useState({});
//   try {
//     token = localStorage.getItem("Token") || '';
//   } catch (error) {
//     console.log(error)
//   }
//   console.log(token);
//   let verifyToken = async (token: string) => {
//     let res = await axios.post('http://localhost:8000/api/v1/auth', { token: token.slice(1, token.length - 1) });
//     let userData = res && res.data ? res.data : [];
//     setUser(userData);
//     return userData
//   };
//   if (token) {
//     useEffect(() => {
//       verifyToken(token);
//     }, [token])
//     console.log(user);
//   }
//   const isEmptyObj = Object.keys(user).length === 0;
//   return (
//     !isEmptyObj &&
//     <main className={`${HomeStyle['chats-app']} flex`}>
//       <ChatsNav userInfo={user} />
//       <div>
//         <div>Welcome to my chat app</div>
//         <Modal textBtn="Account settings" />
//       </div>
//     </main>
//   )
// }

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
  useEffect(() => {
    const token = localStorage.getItem("Token");

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
  }, []);

  return (
    <main className={`${HomeStyle["chats-app"]} flex`}>
      <ChatsNav userInfo={user} />
      <div className="w-3/4 dark:bg-gray-700 dark:text-white">
        <div>Welcome to my chat app</div>
        <Modal textBtn="Account settings" />
      </div>
    </main>
  );
}
