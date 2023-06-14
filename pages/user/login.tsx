import login from "/styles/login.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../stores/actions/userActions";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfoRedux = useSelector((state: any) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios
      .post(
        "http://localhost:8000/api/v1/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .catch(function (error) {
        if (error.response) {
          if (error.response.data) {
            setError(error.response.data.message);
          }
        }
      });
    let data = res && res.data ? res.data : [];
    if (data.errCode == 2 || data.errCode == 3) {
      setError(data.message);
    } else if (data.errCode == 0) {
      dispatch(addToken(data.token));
      router.push(`/`);
    }
  };
  useEffect(() => {
    if (!userInfoRedux?.token) return;

    localStorage.setItem("Token", userInfoRedux.token);
  }, [userInfoRedux]);

  return (
    <div className={login.container}>
      <div className={login.title}>User Login</div>
      <form className={login.form} onSubmit={handleSubmit}>
        <input
          className={login.input}
          type="text"
          placeholder="Username"
          value={username}
          name="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <input
          className={login.input}
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <label style={{ color: "red" }}>{error}</label>
        <a href="/" className={login.link}>
          Forgot password?
        </a>
        <button type="submit" className={login.button}>
          Login
        </button>
      </form>
      <div className={login.register}>
        <p>
          Don't have an account?
          <Link href="/user/register" className={login.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
