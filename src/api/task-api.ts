import { instance } from "./instance";
import {ResponseType} from "./todolist-api";
import {GetTaskType, TaskObjectType, UpdateTasksModelType } from "./types/taskApiType";


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
