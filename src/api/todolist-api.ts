import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers: {
        'API-KEY': 'b8b0c036-4edd-4913-8c7f-79ccaeace603'
    },
})


type Created = { item: TodolistType };//Alt-Ctrl-V

export const TodoListAPI = {
    getTodos(){
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodos(title:string){
        return instance.post<ResponseType<Created>>('todo-lists',{title})
    },
    updateTodos(title:string, todolistId:string){
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodos(todolistId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
}

export type TodolistType={
    id:string
    addedDate?:string
    order?:string
    title:string
}
export type ResponseType<T={}> ={
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: T
}