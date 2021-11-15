import {applyMiddleware, combineReducers, createStore} from "redux";
import { todolistReducer} from "./todolists-reducer";
import { tasksReducer} from "./tasks-reducer";
import {ActionLoaderType, ActionTaskType, ActionTodolistType} from "./actions";
import thunk from "redux-thunk";
import {ThunkAction} from "redux-thunk/es/types";
import {loaderReducer} from "./loader-reducer";


const rootReducer = combineReducers({
    todoLists:todolistReducer,
    tasks:tasksReducer,
    loader:loaderReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootState = ReturnType<typeof rootReducer>; // автоматически определяем тип общего стейта
export type AppActionsType = ActionTodolistType | ActionTaskType | ActionLoaderType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
// @ts-ignore
window.store = store