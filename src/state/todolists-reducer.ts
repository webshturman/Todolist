
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
            // return [{...action.todolist, filter:'All'}, ...state]
            return [{...action.todo,filter:'All'}, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId ? {...tl,title:action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(td=> td.id === action.id ? {...td,filter:action.filter} : td)
        default:
            return state;
    }
}

//----------------------------------------------------------------------
export const addTodolistAC = (todo:TodolistType) => {
    return {type:'ADD-TODOLIST', todo} as const
}
export const removeTodolistAC = (todolistId:string) => {
    return {type:'REMOVE-TODOLIST', todolistId} as const
}
export const changeTodolistTitleAC = (title:string, todolistId:string) => {
    return {type:'CHANGE-TODOLIST-TITLE', title, todolistId} as const
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
export const addTodosTC =(title:string)=>(dispatch:Dispatch) => {
    TodoListAPI.createTodos(title)
        .then((res)=> {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const deleteTodosTC=(todolistId:string)=>(dispatch:Dispatch)=> {
    TodoListAPI.deleteTodos(todolistId)
        .then((res)=> {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const updateTodosTitleTC=(title:string, todolistId:string)=>(dispatch:Dispatch)=> {
    TodoListAPI.updateTodos(title,todolistId)
        .then((res)=> {
            dispatch(changeTodolistTitleAC(title,todolistId))
        })
}