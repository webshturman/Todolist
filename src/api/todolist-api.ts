import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers: {
        'API-KEY': 'b8b0c036-4edd-4913-8c7f-79ccaeace603'
    },
})


type Created = { item: GetTodosType };//Alt-Ctrl-V

export const TodoListAPI = {
    getTodos(){
        return instance.get<Array<GetTodosType>>('todo-lists')
    },
    createTodos(title:string){
        return instance.post<CommonTodosType<Created>>('todo-lists',{title})
    },
    updateTodos(todolistId:string, title:string){
        return instance.put<CommonTodosType>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodos(todolistId:string){
        return instance.delete<CommonTodosType>(`todo-lists/${todolistId}`)
    },
}

type GetTodosType={
    id:string
    addedDate:string
    order:string
    title:string
}
type CommonTodosType<T={}> ={
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: T
}