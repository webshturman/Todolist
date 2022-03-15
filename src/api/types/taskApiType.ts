export type UpdateTasksModelType ={
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type GetTaskType={
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
