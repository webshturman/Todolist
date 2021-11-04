import axios from "axios";

export const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers: {
        'API-KEY': 'b8b0c036-4edd-4913-8c7f-79ccaeace603'
    }
})
export const TaskAPI = {
    getTsk(todolistID:string){
        return instance.get<GetTaskType>(`todo-lists/${todolistID}/tasks`)
    },
    createTsk(todolistID:string,title:string){
        return instance.post<CommonTaskType<{item:TaskObjectType}>>(`todo-lists/${todolistID}/tasks`,{title})
    },
    updateTsk(todolistID:string,taskID:string,model:UpdateTasksModelType){
        return instance.put<CommonTaskType<{item:TaskObjectType}>>(`todo-lists/${todolistID}/tasks/${taskID}`,model)
    },
    deleteTsk(taskID:string, todolistID:string){
        return instance.delete<CommonTaskType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    },
}


export type UpdateTasksModelType ={
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type GetTaskType={
    items:Array<TaskObjectType>
    totalCount:number
    error: string
}
export type TaskObjectType={
    description: string
    title: string
    // completed: boolean
    status: TaskStatuses
    priority:TaskPriorities
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}
type CommonTaskType<T={}>={
    data:T
    resultCode:number
    messages: Array<string>
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}