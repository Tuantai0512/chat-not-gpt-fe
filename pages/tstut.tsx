import { listeners } from "process";
import { useRouter } from "next/router";
import axios from "axios";
import Link from 'next/link'
import Head from "next/head";
import tstut from '/styles/tstut.module.scss'

export default function About() {

    const router = useRouter();

    // Function type
    const sum = (x:number, y:number) => {
        return x + y;
    }

    // Array Type
    const stringArray : string[] = ['tai','tien'];
    stringArray.push('1234'); 

    // String Type
    const name: string = `Hậu cực kỳ "occho"`;

    // Object Type
    let objectTs:{
        name:string,
        age:number
    } = {
        name:`Tai`,
        age:25
    }
    
    // Tuple Type
    const tupleTs: [string, number, boolean?] = [`tai`, 25, true];

    // Enum Type
    enum API_STATUS { 
        PENDING = `PENDING`, 
        FULFILLED = `FULFILLED`, 
        REJECTED = `REJECTED`
    }

    // Void Type (Output: undefined)
    const VoidEx = ():void => {
        console.log('Hau trum du ka')
    }

    const handleOnClick = () => {
        router.push('/')
    }

    return (
        <>
            <Head>
                <title>TypeScript tutorial</title>
            </Head>
            <div>Total: {sum(5,10)}</div>
            <div>Array: {JSON.stringify(stringArray)}</div>
            <div>name: {name}</div>
            <div>object: {JSON.stringify(objectTs)}</div>  
            <div>Tuple: {JSON.stringify(tupleTs)}</div>
            <div>Enum: Status
                <ul>
                    <li>- {API_STATUS.PENDING}</li> 
                    <li>- {API_STATUS.FULFILLED}</li>    
                    <li>- {API_STATUS.REJECTED}</li>    
                </ul>    
            </div>
            <Link href={'/'} className={tstut["a-link"]}>Homepage Link</Link>
            <button onClick={handleOnClick} className={tstut["a-link-btn"]}>Go to Homepage</button>
        </>
    )
} 