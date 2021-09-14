import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


const rootReducer = combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer
})
export type  AppRootState = ReturnType<typeof rootReducer> // автоматически определяем тип общего стейта
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store