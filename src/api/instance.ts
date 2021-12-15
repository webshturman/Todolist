import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers: {
        'API-KEY': 'b8b0c036-4edd-4913-8c7f-79ccaeace603'
    },
})


