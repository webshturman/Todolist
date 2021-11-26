import {applyMiddleware, combineReducers, createStore} from "redux";
import { todolistReducer} from "./todolists-reducer";
import { tasksReducer} from "./tasks-reducer";
import {ActionAuthDataType, ActionLoaderType, ActionTaskType, ActionTodolistType} from "./actions";
import thunk from "redux-thunk";
import {ThunkAction} from "redux-thunk/es/types";
import {loaderReducer} from "./loader-reducer";
import {authReducer} from "./auth-reducer";


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