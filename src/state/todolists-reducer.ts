
import {v1} from "uuid";
import {AppRootState} from "./store";
import {TodoListAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
//--------------------------------------------------------------
export type ActionAddTodolistType = ReturnType<typeof addTodolistAC>;
export type ActionRemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type ActionChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>;
export type ActionChangeTodolistType = ReturnType<typeof changeTodolistFilterAC>;
export type ActionGetTodolistType = ReturnType<typeof getTodosAC>;
//----------------------------------------------------------------------------
export type typeFilter = 'All' | 'Active' | 'Completed'

// export type TodolistType = {
//     id: string
//     title: string
// }
export type TodolistStateType = TodolistType & {
    filter: typeFilter
}

type ActionType = ActionAddTodolistType | ActionRemoveTodolistType
    | ActionChangeTodolistTitleType | ActionChangeTodolistType
    | ActionGetTodolistType
//---------------------------------------------------------------------------------
export const TodolistID1 = v1()
export const TodolistID2 = v1()

const initialState:Array<TodolistStateType>  = []
export const todolistReducer = (state:Array<TodolistStateType> = initialState, action:ActionType):Array<TodolistStateType> => {
    switch(action.type) {
        case "GET-TODOS":
            return action.todolist.map( (tl) => ({...tl,filter:'All'}))
        case 'ADD-TODOLIST':
            return [{id:action.todolistId, title:action.title, filter:'All'}, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl,title:action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(td=> td.id === action.id ? {...td,filter:action.filter} : td)
        default:
            return state;
    }
}

//----------------------------------------------------------------------
export const addTodolistAC = (newTodolistTitle:string) => {
    return {type:'ADD-TODOLIST', title:newTodolistTitle, todolistId:v1()} as const
}
export const removeTodolistAC = (todolistId:string) => {
    return {type:'REMOVE-TODOLIST', id:todolistId} as const
}
export const changeTodolistTitleAC = (newTodolistTitle:string,todolistId:string,) => {
    return {type:'CHANGE-TODOLIST-TITLE', title:newTodolistTitle, id:todolistId} as const
}
export const changeTodolistFilterAC = (newTodolistFilter:typeFilter,todolistId:string) => {
    return {type:'CHANGE-TODOLIST-FILTER', filter:newTodolistFilter, id:todolistId} as const
}


export const getTodosAC = (todolist:Array<TodolistType> ) => {
    return {type:'GET-TODOS', todolist} as const
}
//------------------------------------------------------------
export const getTodosTC = () => (dispatch:Dispatch, getState: ()=>AppRootState) =>{
    TodoListAPI.getTodos()
        .then((res)=>{
            // debugger
            dispatch(getTodosAC(res.data))
        })
}