import {TodolistType} from "../../api/todolist-api";
import {ACTIONS_TYPE} from "../../enums/actionsConstants";
import {typeFilter} from "../todolists-reducer";
import {RequestStatusType} from "../loader-reducer";

export type ActionAddTodolistType = ReturnType<typeof addTodolistAC>;
export type ActionRemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type ActionChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>;
export type ActionChangeTodolistType = ReturnType<typeof changeTodolistFilterAC>;
export type ActionGetTodolistType = ReturnType<typeof getTodosAC>;
export type ActionChangeEntityStatusType = ReturnType<typeof changeEntityStatusAC>;
export type ActionClearTodosDataType = ReturnType<typeof clearTodosDataAC>;

export type ActionTodolistType = ActionAddTodolistType | ActionRemoveTodolistType
    | ActionChangeTodolistTitleType | ActionChangeTodolistType
    | ActionGetTodolistType | ActionChangeEntityStatusType | ActionClearTodosDataType
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
    return {type: ACTIONS_TYPE.CHANGE_TODOLIST_FILTER_TYPE, filter: newTodolistFilter, todolistId} as const
}

export const getTodosAC = (todolist: Array<TodolistType>) => {
    return {type: ACTIONS_TYPE.GET_TODOLIST_TYPE, todolist} as const
}
export const changeEntityStatusAC = (status:RequestStatusType, todolistId: string) => {
    return {type: ACTIONS_TYPE.CHANGE_ENTITY_STATUS, status, todolistId} as const
}
export const clearTodosDataAC = () => {
    return {type: ACTIONS_TYPE.CLEAR_TODOS_DATA} as const
}