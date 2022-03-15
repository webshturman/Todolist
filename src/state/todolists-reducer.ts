import {TodoListAPI, TodolistType} from "../api/todolist-api";
import {ChangeLoadingStatusAC, RequestStatusType} from "./loader-reducer";
import {handleNetworkError, handleServerError} from "../utils/error-utils";
import {getTaskTC} from "./tasks-reducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: Array<TodolistStateType> = []

const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        addTodolistAC(state, action: PayloadAction<{ todo: TodolistType }>) {
            state.unshift({...action.payload.todo, filter: 'All', entityStatus: 'idle'})
        },
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(stateItem => stateItem.id === action.payload.todolistId)
            if (index !== -1) state.splice(index, 1)
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ title: string, todolistId: string }>) {
            const index = state.findIndex(stateItem => stateItem.id === action.payload.todolistId)
            if (index !== -1) state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ newTodolistFilter: typeFilter, todolistId: string }>) {
            const index = state.findIndex(stateItem => stateItem.id === action.payload.todolistId)
            if (index !== -1) state[index].filter = action.payload.newTodolistFilter
        },
        getTodosAC(state, action: PayloadAction<{ todolist: Array<TodolistType> }>) {
            return action.payload.todolist.map((todo) => ({...todo, filter: 'All', entityStatus: 'idle'}))
        },
        changeEntityStatusAC(state, action: PayloadAction<{ status: RequestStatusType, todolistId: string }>) {
            const index = state.findIndex(stateItem => stateItem.id === action.payload.todolistId)
            if (index !== -1) state[index].entityStatus = action.payload.status
        },
        clearTodosDataAC() {
            return []
        },
    }
})
export const todolistReducer = slice.reducer;
export const {
    addTodolistAC, removeTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC,
    getTodosAC, changeEntityStatusAC, clearTodosDataAC
} = slice.actions;


export const getTodosTC = () => async (dispatch: Dispatch) => {
    dispatch(ChangeLoadingStatusAC({value: 'loading'}))
    try {
        const res = await TodoListAPI.getTodos()
        const todoLists = res.data
        dispatch(getTodosAC({todolist: todoLists}))  //запрашиваем тудулисты
        todoLists.forEach(todoList => {
            // @ts-ignore
            dispatch(getTaskTC(todoList.id));  //и после запрашиваем таски для каждого тудулиста
        })

    } catch (error: any) {
        handleNetworkError(error, dispatch)
    } finally {
        dispatch(ChangeLoadingStatusAC({value: 'succeeded'}))
    }

}
export const addTodosTC = (title: string) => async (dispatch: Dispatch) => {
    dispatch(ChangeLoadingStatusAC({value: 'loading'}))
    try {
        const res = await TodoListAPI.createTodos(title)
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC({todo: res.data.data.item}))
            dispatch(ChangeLoadingStatusAC({value: 'succeeded'}))
        } else {
            handleServerError(res.data, dispatch)
        }
    } catch (error: any) {
        handleNetworkError(error, dispatch)
    }
}
export const deleteTodosTC = (todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(ChangeLoadingStatusAC({value: 'loading'}))
    dispatch(changeEntityStatusAC({ status: 'loading', todolistId }))
    try {
        const res = await TodoListAPI.deleteTodos(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC({todolistId}))
            dispatch(ChangeLoadingStatusAC({value: 'succeeded'}))
        } else {
            handleServerError(res.data, dispatch)
        }
    } catch (error: any) {
        handleNetworkError(error, dispatch)
    }

}
export const updateTodosTitleTC = (title: string, todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(ChangeLoadingStatusAC({value: 'loading'}))
    try {
        const res = await TodoListAPI.updateTodos(title, todolistId)
        if (res.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC({title, todolistId}))
            dispatch(ChangeLoadingStatusAC({value: 'succeeded'}))
        } else {
            handleServerError(res.data, dispatch)
        }

    } catch (error: any) {
        handleNetworkError(error, dispatch)
    }
}

//----------------------------------------------------------------------------
export type typeFilter = 'All' | 'Active' | 'Completed'

export type TodolistStateType = TodolistType & {
    filter: typeFilter
    entityStatus: RequestStatusType
}
//---------------------------------------------------------------------------------

//------------------------------Redux---------------------------------
// export const todolistReducer = (state: Array<TodolistStateType> = initialState, action: ActionTodolistType): Array<TodolistStateType> => {
//     switch (action.type) {
//         case ACTIONS_TYPE.GET_TODOLIST_TYPE:
//             return action.todolist.map((tl) => ({...tl, filter: 'All', entityStatus:'idle'}))
//         case ACTIONS_TYPE.ADD_TODOLIST_TYPE:
//             return [{...action.todo, filter: 'All',entityStatus:'idle'}, ...state]
//         case ACTIONS_TYPE.REMOVE_TODOLIST_TYPE:
//             return state.filter(tl => tl.id !== action.todolistId)
//         case ACTIONS_TYPE.CHANGE_TODOLIST_TITLE_TYPE:
//             return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
//         case ACTIONS_TYPE.CHANGE_TODOLIST_FILTER_TYPE:
//             return state.map(td => td.id === action.todolistId ? {...td, filter: action.filter} : td)
//         case ACTIONS_TYPE.CHANGE_ENTITY_STATUS:
//             return state.map(todolist => todolist.id === action.todolistId ? {...todolist, entityStatus: action.status} : todolist)
//         case ACTIONS_TYPE.CLEAR_TODOS_DATA:
//             return []
//         default:
//             return state;
//     }
// }

//-------------------------Actions-------------------------------


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
