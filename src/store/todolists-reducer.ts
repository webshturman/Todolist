import {TodolistType, typeFilter} from "../App";
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
            return [...state, {id:v1(), title:action.title, filter:'All'}]
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
export const addTodolistAC = (newTodolistTitle:string,todolistId:string):ActionAddTodolistType => {
    return {type:'ADD-TODOLIST', title:newTodolistTitle, todolistId:todolistId}
}
export const removeTodolistAC = (todolistId:string):ActionRemoveTodolistType => {
    return {type:'REMOVE-TODOLIST', id:todolistId}
}
export const changeTodolistTitleAC = (todolistId:string,newTodolistTitle:string):ActionChangeTodolistTitleType => {
    return {type:'CHANGE-TODOLIST-TITLE', id:todolistId, title:newTodolistTitle}
}
export const changeTodolistFilterAC = (todolistId:string,newTodolistFilter:typeFilter):ActionChangeTodolistType => {
    return {type:'CHANGE-TODOLIST-FILTER', id:todolistId, filter:newTodolistFilter}
}