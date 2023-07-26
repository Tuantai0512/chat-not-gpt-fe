import login from "/styles/login.module.scss"
import { useState } from "react"
import Link from "next/link";
import axios from "axios";

export default function Register(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errorRegister, setErrorRegister] = useState('');
    const handleSubmit = async(e: any) => {
        e.preventDefault();
        if(password == confirm){
            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND_API}create-new-user`, {
            username, password
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).catch(function (error) {
            if(error.response){
                if(error.response.data){
                    setErrorRegister(error.response.data.message);
                }
            }
        });
        let data = res && res.data ? res.data : [];
            setErrorRegister(data.message);
        }else{
            setErrorRegister('Confirm password does not match!')
        }
    }

    return(
        <div className={login.container}>
            <div className={login.title}>Create your account</div>
            <form className={login.form} onSubmit={handleSubmit}>
                <input className={login.input} type="text" placeholder="Username" value={username} name="username" onChange={(e) => {setUsername(e.target.value)}}></input>
                <input className={login.input} type="password" placeholder="Password" value={password} name="password" onChange={(e) => {setPassword(e.target.value)}}></input>
                <input className={login.input} type="password" placeholder="Confirm Password" value={confirm} name="confirm" onChange={(e) => {setConfirm(e.target.value)}}></input>
                <label style={{ color: "red" }}>{errorRegister}</label>
                <button type="submit" className={login.button}>Sign up</button>
            </form>
            <div className={login.register}>
                <p>Already have an account?<Link href="/user/login" className={login.link}>Log in</Link></p>
            </div>
        </div>
    )
}