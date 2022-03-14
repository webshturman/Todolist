import {AppThunk} from "./store";
import {TodoListAPI, TodolistType} from "../api/todolist-api";
import {ChangeLoadingStatusAC, RequestStatusType} from "./loader-reducer";
import {handleNetworkError, handleServerError} from "../utils/error-utils";
import {getTaskTC} from "./tasks-reducer";
import { ACTIONS_TYPE } from "../enums/actionsConstants";
import { ActionTodolistType, addTodolistAC, changeEntityStatusAC, changeTodolistTitleAC, getTodosAC, removeTodolistAC } from "./actions/todolists-actions";
import {Dispatch} from "redux";


//----------------------------------------------------------------------------
export type typeFilter = 'All' | 'Active' | 'Completed'

export type TodolistStateType = TodolistType & {
    filter: typeFilter
    entityStatus:RequestStatusType
}
//---------------------------------------------------------------------------------


const initialState: Array<TodolistStateType> = []
export const todolistReducer = (state: Array<TodolistStateType> = initialState, action: ActionTodolistType): Array<TodolistStateType> => {
    switch (action.type) {
        case ACTIONS_TYPE.GET_TODOLIST_TYPE:
            return action.todolist.map((tl) => ({...tl, filter: 'All', entityStatus:'idle'}))
        case ACTIONS_TYPE.ADD_TODOLIST_TYPE:
            return [{...action.todo, filter: 'All',entityStatus:'idle'}, ...state]
        case ACTIONS_TYPE.REMOVE_TODOLIST_TYPE:
            return state.filter(tl => tl.id !== action.todolistId)
        case ACTIONS_TYPE.CHANGE_TODOLIST_TITLE_TYPE:
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case ACTIONS_TYPE.CHANGE_TODOLIST_FILTER_TYPE:
            return state.map(td => td.id === action.todolistId ? {...td, filter: action.filter} : td)
        case ACTIONS_TYPE.CHANGE_ENTITY_STATUS:
            return state.map(todolist => todolist.id === action.todolistId ? {...todolist, entityStatus: action.status} : todolist)
        case ACTIONS_TYPE.CLEAR_TODOS_DATA:
            return []
        default:
            return state;
    }
}


export const getTodosTC = () => async (dispatch:Dispatch) => {
    dispatch(ChangeLoadingStatusAC({value:'loading'}))
    try {
        const res = await TodoListAPI.getTodos()
        const todoLists = res.data
        dispatch(getTodosAC(todoLists))  //запрашиваем тудулисты
        todoLists.forEach(todoList =>{
           // @ts-ignore
            dispatch(getTaskTC(todoList.id));  //и после запрашиваем таски для каждого тудулиста
        })

    } catch (error:any) {
        handleNetworkError(error,dispatch)
    } finally{
        dispatch(ChangeLoadingStatusAC({value:'succeeded'}))
    }

}
export const addTodosTC = (title: string) => async (dispatch:Dispatch) => {
    dispatch(ChangeLoadingStatusAC({value:'loading'}))
    try {
        const res = await TodoListAPI.createTodos(title)
        if(res.data.resultCode === 0){
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(ChangeLoadingStatusAC({value:'succeeded'}))
        } else{
            handleServerError(res.data,dispatch)
        }
    } catch (error:any) {
        handleNetworkError(error,dispatch)
    }
}
export const deleteTodosTC = (todolistId: string) => async (dispatch:Dispatch) => {
    dispatch(ChangeLoadingStatusAC({value:'loading'}))
    dispatch(changeEntityStatusAC('loading',todolistId))
    try {
        const res = await TodoListAPI.deleteTodos(todolistId)
        if(res.data.resultCode === 0){
            dispatch(removeTodolistAC(todolistId))
            dispatch(ChangeLoadingStatusAC({value:'succeeded'}))
        }else{
            handleServerError(res.data,dispatch)
        }
    } catch (error:any) {
        handleNetworkError(error,dispatch)
    }

}
export const updateTodosTitleTC = (title: string, todolistId: string) => async (dispatch:Dispatch) => {
    dispatch(ChangeLoadingStatusAC({value:'loading'}))
    try {
        const res = await TodoListAPI.updateTodos(title, todolistId)
        if(res.data.resultCode === 0){
            dispatch(changeTodolistTitleAC(title, todolistId))
            dispatch(ChangeLoadingStatusAC({value:'succeeded'}))
        }else{
            handleServerError(res.data,dispatch)
        }

    } catch (error:any) {
        handleNetworkError(error,dispatch)
    }
}
