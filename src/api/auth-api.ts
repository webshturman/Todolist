import {instance, ResponseType} from "../api/todolist-api";


export const authAPI = {
    me(){
        return instance.get<ResponseType<authDataType>>(`auth/me`)
    },

}

export type authDataType = {
    id: string
    login: string
    email: string
}
