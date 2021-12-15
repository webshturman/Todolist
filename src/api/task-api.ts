import { instance } from "./instance";
import {ResponseType} from "./todolist-api";


export const TaskAPI = {
    getTsk(todolistID:string){
        return instance.get<GetTaskType>(`todo-lists/${todolistID}/tasks`)
    },
    createTsk(todolistID:string,title:string){
        return instance.post<ResponseType<{item:TaskObjectType}>>(`todo-lists/${todolistID}/tasks`,{title})
    },
    updateTsk(todolistID:string,taskID:string,model:UpdateTasksModelType){
        return instance.put<ResponseType<{item:TaskObjectType}>>(`todo-lists/${todolistID}/tasks/${taskID}`,model)
    },
    deleteTsk(taskID:string, todolistID:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
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
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

export type TaskStateType = {
    [key: string]: Array<TaskObjectType>
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