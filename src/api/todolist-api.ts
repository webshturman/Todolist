import { instance } from "./instance"

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

type Created = { item: TodolistType };//Alt-Ctrl-V