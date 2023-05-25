import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserApp() {
    const router = useRouter();
    const userId = router.query.id
    const [user, setUser] = useState({});
    useEffect(() => {
        if(!userId) return;
        async function fetchData(id: any) {
            const res = await axios.get(`http://localhost:8000/api/v1/users?id=${id}`);
            let data = res && res.data ? res.data : {};
            setUser(data.users);
        };
        fetchData(userId)
    }, [userId]);
    console.log(user)
    const isEmptyObj = Object.keys(user).length === 0
    return ( 
        isEmptyObj === false && 
        <>
            <div>Welcome {user.firstName} {user.lastName} to my chat app</div>
        </>
    )
}