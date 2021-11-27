import {instance, ResponseType} from "../api/todolist-api";


export const authAPI = {
    me(){
        return instance.get<ResponseType<authDataType>>(`auth/me`)
    },
    login(data:LoginDataType){
        return instance.post<ResponseType<{userId:number}>>('auth/login',data)
    }
}

export type authDataType = {
    id: string
    login: string
    email: string
}
export type LoginDataType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}


