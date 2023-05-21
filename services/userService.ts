import axios from "axios";

export const handleLogin = (username: string, password: string) => {
    return axios.post('/api/v1/login')
}