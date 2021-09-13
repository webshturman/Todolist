import {TodolistType, typeFilter} from "../AppWithReducers";
import {v1} from "uuid";
//--------------------------------------------------------------
export type ActionAddTodolistType = {
    type:'ADD-TODOLIST'
    title:string
    todolistId:string
}
export type ActionRemoveTodolistType = {
    type:'REMOVE-TODOLIST'
    id:string
}
export type ActionChangeTodolistTitleType = {
    type:'CHANGE-TODOLIST-TITLE'
    id:string
    title:string
}
export type ActionChangeTodolistType = {
    type:'CHANGE-TODOLIST-FILTER'
    filter:typeFilter
    id:string
}

type ActionType = ActionAddTodolistType | ActionRemoveTodolistType | ActionChangeTodolistTitleType | ActionChangeTodolistType
//---------------------------------------------------------------------------------

export const todolistsReducer = (state:Array<TodolistType>, action:ActionType):Array<TodolistType> => {
    switch(action.type) {
        case 'ADD-TODOLIST':
            return [{id:action.todolistId, title:action.title, filter:'All'}, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl,title:action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(td=> td.id === action.id ? {...td,filter:action.filter} : td)
        default:
            return state
    }
}

//----------------------------------------------------------------------
export const addTodolistAC = (newTodolistTitle:string):ActionAddTodolistType => {
    return {type:'ADD-TODOLIST', title:newTodolistTitle, todolistId:v1()}
}
export const removeTodolistAC = (todolistId:string):ActionRemoveTodolistType => {
    return {type:'REMOVE-TODOLIST', id:todolistId}
}
export const changeTodolistTitleAC = (newTodolistTitle:string,todolistId:string,):ActionChangeTodolistTitleType => {
    return {type:'CHANGE-TODOLIST-TITLE', title:newTodolistTitle, id:todolistId}
}
export const changeTodolistFilterAC = (newTodolistFilter:typeFilter,todolistId:string):ActionChangeTodolistType => {
    return {type:'CHANGE-TODOLIST-FILTER', filter:newTodolistFilter, id:todolistId}
}