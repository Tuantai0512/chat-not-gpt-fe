import login from "/styles/login.module.scss"
import { useState } from "react"
import Link from "next/link";

export default function Register(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Username: ',username);        
        console.log('Password: ',password);
        console.log('Confirm Password: ',confirm);
    }

    return(
        <div className={login.container}>
            <div className={login.title}>Create your account</div>
            <form className={login.form} onSubmit={handleSubmit}>
                <input className={login.input} type="text" placeholder="Username" value={username} name="username" onChange={(e) => {setUsername(e.target.value)}}></input>
                <input className={login.input} type="password" placeholder="Password" value={password} name="password" onChange={(e) => {setPassword(e.target.value)}}></input>
                <input className={login.input} type="password" placeholder="Confirm Password" value={confirm} name="confirm" onChange={(e) => {setConfirm(e.target.value)}}></input>
                <button type="submit" className={login.button}>Sign up</button>
            </form>
            <div className={login.register}>
                <p>Already have an account?<Link href="/user/login" className={login.link}>Log in</Link></p>
            </div>
        </div>
    )
}