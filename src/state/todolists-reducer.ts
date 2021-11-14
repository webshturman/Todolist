
import {AppThunk} from "./store";
import {TodoListAPI, TodolistType} from "../api/todolist-api";
import {
    ACTIONS_TYPE,
    ActionTodolistType,
    addTodolistAC,
    changeTodolistTitleAC,
    getTodosAC,
    removeTodolistAC
} from "./actions";

//----------------------------------------------------------------------------
export type typeFilter = 'All' | 'Active' | 'Completed'

export type TodolistStateType = TodolistType & {
    filter: typeFilter
}
//---------------------------------------------------------------------------------


const initialState: Array<TodolistStateType> = []
export const todolistReducer = (state: Array<TodolistStateType> = initialState, action: ActionTodolistType): Array<TodolistStateType> => {
    switch (action.type) {
        case ACTIONS_TYPE.GET_TODOLIST_TYPE:
            return action.todolist.map((tl) => ({...tl, filter: 'All'}))
        case ACTIONS_TYPE.ADD_TODOLIST_TYPE:
            // return [{...action.todolist, filter:'All'}, ...state]
            return [{...action.todo, filter: 'All'}, ...state]
        case ACTIONS_TYPE.REMOVE_TODOLIST_TYPE:
            return state.filter(tl => tl.id !== action.todolistId)
        case ACTIONS_TYPE.CHANGE_TODOLIST_TITLE_TYPE:
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case ACTIONS_TYPE.CHANGE_TODOLIST_FILTER_TYPE:
            return state.map(td => td.id === action.id ? {...td, filter: action.filter} : td)
        default:
            return state;
    }
}

//------------------------------------------------------------
// export const getTodosTC = ():AppThunk => (dispatch, getState: ()=>AppRootState) =>{
//     TodoListAPI.getTodos()
//         .then((res)=>{
//             // debugger
//             dispatch(getTodosAC(res.data))
//         })
// }
export const getTodosTC = (): AppThunk => async dispatch => {
    try {
        const res = await TodoListAPI.getTodos()
        dispatch(getTodosAC(res.data))
    } catch (e) {

    }

}
export const addTodosTC = (title: string): AppThunk => async dispatch => {
    try {
        const res = await TodoListAPI.createTodos(title)
        dispatch(addTodolistAC(res.data.data.item))
    } catch (e) {

    }
}
export const deleteTodosTC = (todolistId: string): AppThunk => async dispatch => {
    try {
        const res = await TodoListAPI.deleteTodos(todolistId)
        dispatch(removeTodolistAC(todolistId))
    } catch (e) {

    }

}
export const updateTodosTitleTC = (title: string, todolistId: string): AppThunk => async dispatch => {
    try {
        const res = await TodoListAPI.updateTodos(title, todolistId)
        dispatch(changeTodolistTitleAC(title, todolistId))
    } catch (e) {

    }
}