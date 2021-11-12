import {TodolistType} from "../api/todolist-api";
import {typeFilter} from "./todolists-reducer";

import {TaskObjectType} from "../api/task-api";
import {UpdateDomainTasksModelType} from "./tasks-reducer";
//------------------------------------------------------------------
export enum ACTIONS_TYPE {
    ADD_TODOLIST_TYPE = 'AppWithReducers/ADD_TODOLIST_TYPE',
    REMOVE_TODOLIST_TYPE = 'AppWithReducers/REMOVE_TODOLIST_TYPE',
    CHANGE_TODOLIST_FILTER_TYPE = 'AppWithReducers/CHANGE_TODOLIST_TYPE',
    CHANGE_TODOLIST_TITLE_TYPE = 'AppWithReducers/CHANGE_TODOLIST_TITLE_TYPE',
    GET_TODOLIST_TYPE = 'AppWithReducers/GET_TODOLIST_TYPE',
    ADD_TASKS_TYPE = 'Todolist/ADD_TASKS_TYPE',
    GET_TASKS_TYPE = 'Todolist/GET_TASKS_TYPE',
    DELETE_TASKS_TYPE = 'Task/DELETE_TASKS_TYPE',
    UPDATE_TASKS_TYPE = 'Task/UPDATE_TASKS_TYPE',
}


//---------------------------TodoLISTS------------------
export type ActionAddTodolistType = ReturnType<typeof addTodolistAC>;
export type ActionRemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type ActionChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>;
export type ActionChangeTodolistType = ReturnType<typeof changeTodolistFilterAC>;
export type ActionGetTodolistType = ReturnType<typeof getTodosAC>;

export type ActionTodolistType = ActionAddTodolistType | ActionRemoveTodolistType
    | ActionChangeTodolistTitleType | ActionChangeTodolistType
    | ActionGetTodolistType
//----------------------------------------------------------------------------

export const addTodolistAC = (todo: TodolistType) => {
    return {type: ACTIONS_TYPE.ADD_TODOLIST_TYPE, todo} as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {type: ACTIONS_TYPE.REMOVE_TODOLIST_TYPE, todolistId} as const
}
export const changeTodolistTitleAC = (title: string, todolistId: string) => {
    return {type: ACTIONS_TYPE.CHANGE_TODOLIST_TITLE_TYPE, title, todolistId} as const
}
export const changeTodolistFilterAC = (newTodolistFilter: typeFilter, todolistId: string) => {
    return {type: ACTIONS_TYPE.CHANGE_TODOLIST_FILTER_TYPE, filter: newTodolistFilter, id: todolistId} as const
}

export const getTodosAC = (todolist: Array<TodolistType>) => {
    return {type: ACTIONS_TYPE.GET_TODOLIST_TYPE, todolist} as const
}

//--------------------------------------TASKS--------------------------------
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;
export type GetTasksActionType = ReturnType<typeof getTaskAC>;

export type ActionTaskType = AddTaskActionType | DeleteTaskActionType | UpdateTaskActionType
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
// export const changeTaskTitleAC = (task: TaskObjectType) => {
//     return {type: 'CHANGE-TASK-TITLE', task} as const
// }
export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateDomainTasksModelType) => {
    return {type: ACTIONS_TYPE.UPDATE_TASKS_TYPE, todolistID, taskID, model} as const
}
// export const updateTaskAC = (task: TaskObjectType) => {
//     return {type: 'UPDATE-TASK', task} as const
// }