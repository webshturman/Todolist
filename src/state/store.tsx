import {applyMiddleware, combineReducers, createStore} from "redux";
import { todolistReducer} from "./todolists-reducer";
import { tasksReducer} from "./tasks-reducer";

import thunk from "redux-thunk";
import {ThunkAction} from "redux-thunk/es/types";
import {loaderReducer} from "./loader-reducer";
import {authReducer} from "./auth-reducer";
import { ActionTodolistType } from "./actions/todolists-actions";
import { ActionTaskType } from "./actions/tasks-actions";
import { ActionLoaderType } from "./actions/loader-actions";
import { ActionAuthDataType } from "./actions/auth-actions";


const rootReducer = combineReducers({
    todoLists:todolistReducer,
    tasks:tasksReducer,
    loader:loaderReducer,
    auth:authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootState = ReturnType<typeof rootReducer>; // автоматически определяем тип общего стейта
export type AppActionsType = ActionTodolistType | ActionTaskType | ActionLoaderType | ActionAuthDataType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
// @ts-ignore
window.store = store


// import {TodolistType} from "../api/todolist-api";
// import {typeFilter} from "./todolists-reducer";
//
// import {TaskObjectType} from "../api/task-api";
// import {UpdateDomainTasksModelType} from "./tasks-reducer";
// import {RequestStatusType} from "./loader-reducer";
// import {ACTIONS_TYPE} from "../enums/actionsConstants";
//
//
// //---------------------------TodoLISTS------------------
// export type ActionAddTodolistType = ReturnType<typeof addTodolistAC>;
// export type ActionRemoveTodolistType = ReturnType<typeof removeTodolistAC>;
// export type ActionChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>;
// export type ActionChangeTodolistType = ReturnType<typeof changeTodolistFilterAC>;
// export type ActionGetTodolistType = ReturnType<typeof getTodosAC>;
// export type ActionChangeEntityStatusType = ReturnType<typeof changeEntityStatusAC>;
// export type ActionClearTodosDataType = ReturnType<typeof clearTodosDataAC>;
//
// export type ActionTodolistType = ActionAddTodolistType | ActionRemoveTodolistType
//     | ActionChangeTodolistTitleType | ActionChangeTodolistType
//     | ActionGetTodolistType | ActionChangeEntityStatusType | ActionClearTodosDataType
// //----------------------------------------------------------------------------
//
// export const addTodolistAC = (todo: TodolistType) => {
//     return {type: ACTIONS_TYPE.ADD_TODOLIST_TYPE, todo} as const
// }
// export const removeTodolistAC = (todolistId: string) => {
//     return {type: ACTIONS_TYPE.REMOVE_TODOLIST_TYPE, todolistId} as const
// }
// export const changeTodolistTitleAC = (title: string, todolistId: string) => {
//     return {type: ACTIONS_TYPE.CHANGE_TODOLIST_TITLE_TYPE, title, todolistId} as const
// }
// export const changeTodolistFilterAC = (newTodolistFilter: typeFilter, todolistId: string) => {
//     return {type: ACTIONS_TYPE.CHANGE_TODOLIST_FILTER_TYPE, filter: newTodolistFilter, todolistId} as const
// }
//
// export const getTodosAC = (todolist: Array<TodolistType>) => {
//     return {type: ACTIONS_TYPE.GET_TODOLIST_TYPE, todolist} as const
// }
// export const changeEntityStatusAC = (status:RequestStatusType, todolistId: string) => {
//     return {type: ACTIONS_TYPE.CHANGE_ENTITY_STATUS, status, todolistId} as const
// }
// export const clearTodosDataAC = () => {
//     return {type: ACTIONS_TYPE.CLEAR_TODOS_DATA} as const
// }
// //--------------------------------------TASKS--------------------------------
// export type AddTaskActionType = ReturnType<typeof addTaskAC>;
// export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>;
// export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;
// export type GetTasksActionType = ReturnType<typeof getTaskAC>;
//
// export type ActionTaskType = AddTaskActionType | DeleteTaskActionType | UpdateTaskActionType | ActionClearTodosDataType
//     | ActionAddTodolistType | ActionRemoveTodolistType | ActionGetTodolistType | GetTasksActionType
//
// //--------------------------------------------------------------------------------------
//
// export const getTaskAC = (TodolistID: string, tasks: Array<TaskObjectType>) => {
//     return {type: ACTIONS_TYPE.GET_TASKS_TYPE, TodolistID, tasks} as const
// }
// export const addTaskAC = (task: TaskObjectType) => {
//     return {type: ACTIONS_TYPE.ADD_TASKS_TYPE, task} as const
// }
// export const deleteTaskAC = (taskID: string, todolistID: string) => {
//     return {type: ACTIONS_TYPE.DELETE_TASKS_TYPE, taskID, todolistID} as const
// }
//
// export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateDomainTasksModelType) => {
//     return {type: ACTIONS_TYPE.UPDATE_TASKS_TYPE, todolistID, taskID, model} as const
// }
//
//
// //------------------------------LOADER-------------------------------------------------------------
// export type ActionLoaderType = ReturnType<typeof ChangeLoadingStatusAC> | ReturnType<typeof SetErrorMessageAC>
//     | ReturnType<typeof getInitialized>
//
// export const ChangeLoadingStatusAC = (status:RequestStatusType) => {
//     return {type: ACTIONS_TYPE.CHANGE_LOADER_STATUS, status} as const
// }
// export const SetErrorMessageAC = (error:string | null) => {
//     return {type: ACTIONS_TYPE.SET_ERROR_MESSAGE, error} as const
// }
// export const getInitialized = (initialized:boolean) => {
//     return {type: ACTIONS_TYPE.GET_INITIALIZED, initialized} as const
// }
// //------------------------------AUTH-------------------------------------------------------------
// export type ActionAuthDataType = ReturnType<typeof getAuthStatus>
//
// export const getAuthStatus = (status:boolean) => {
//     return {type: ACTIONS_TYPE.GET_AUTH_STATUS, status} as const
// }
