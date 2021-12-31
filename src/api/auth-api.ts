import {ResponseType} from "../api/todolist-api";
import { instance } from "./instance";
import {authDataType, LoginDataType} from "./types/authApiTypes";


export const authAPI = {
    me(){
        return instance.get<ResponseType<authDataType>>(`auth/me`)
    },
    login(data:LoginDataType){
        return instance.post<ResponseType<{userId:number}>>('auth/login',data)
    },
    logOut(){
        return instance.delete<ResponseType>('auth/login')
    }
}

