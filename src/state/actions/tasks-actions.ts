
import {ACTIONS_TYPE} from "../../enums/actionsConstants";
import {UpdateDomainTasksModelType} from "../tasks-reducer";
import {
    ActionAddTodolistType,
    ActionClearTodosDataType,
    ActionGetTodolistType,
    ActionRemoveTodolistType
} from "./todolists-actions";
import {TaskObjectType} from "../../api/types/taskApiType";

export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;
export type GetTasksActionType = ReturnType<typeof getTaskAC>;

export type ActionTaskType = AddTaskActionType | DeleteTaskActionType | UpdateTaskActionType | ActionClearTodosDataType
    | ActionAddTodolistType | ActionRemoveTodolistType | ActionGetTodolistType | GetTasksActionType

//--------------------------------------------------------------------------------------

export const getTaskAC = (TodolistID: string, tasks: Array<TaskObjectType>) => {
    return {type: ACTIONS_TYPE.GET_TASKS_TYPE, TodolistID, tasks} as const
}
export const addTaskAC = (task: TaskObjectType) => {
    return {type: ACTIONS_TYPE.ADD_TASKS_TYPE, task} as const
}
export const deleteTaskAC = (taskID: string, todolistID: string) => {
    return {type: ACTIONS_TYPE.DELETE_TASKS_TYPE, taskID, todolistID} as const
}

export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateDomainTasksModelType) => {
    return {type: ACTIONS_TYPE.UPDATE_TASKS_TYPE, todolistID, taskID, model} as const
}