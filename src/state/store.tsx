import {applyMiddleware, combineReducers, createStore} from "redux";
import { todolistReducer} from "./todolists-reducer";
import { tasksReducer} from "./tasks-reducer";

import thunk from "redux-thunk";
import {ThunkAction} from "redux-thunk/es/types";
import {loaderReducer} from "./loader-reducer";
import {authReducer} from "./auth-reducer";
import { ActionTodolistType } from "./actions/todolists-actions";
import { ActionTaskType } from "./actions/tasks-actions";
import { ActionLoaderType } from "./actions/loader-actions";
import { ActionAuthDataType } from "./actions/auth-actions";


const rootReducer = combineReducers({
    todoLists:todolistReducer,
    tasks:tasksReducer,
    loader:loaderReducer,
    auth:authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootState = ReturnType<typeof rootReducer>; // автоматически определяем тип общего стейта
export type AppActionsType = ActionTodolistType | ActionTaskType | ActionLoaderType | ActionAuthDataType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
// @ts-ignore
window.store = store

