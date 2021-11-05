import {applyMiddleware, combineReducers, createStore} from "redux";
import {ActionTodolistType, todolistReducer} from "./todolists-reducer";
import {ActionTaskType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";


const rootReducer = combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootState = ReturnType<typeof rootReducer>; // автоматически определяем тип общего стейта
export type AppActionsType = ActionTodolistType | ActionTaskType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
// @ts-ignore
window.store = store