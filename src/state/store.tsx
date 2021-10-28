import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";





const rootReducer = combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootState = ReturnType<typeof rootReducer> // автоматически определяем тип общего стейта
// @ts-ignore
window.store = store