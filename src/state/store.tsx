import {applyMiddleware, combineReducers, createStore} from "redux";
import { todolistReducer} from "./todolists-reducer";
import { tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {ActionTaskType, ActionTodolistType} from "./actions";


const rootReducer = combineReducers({
    todoLists:todolistReducer,
    tasks:tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootState = ReturnType<typeof rootReducer>; // автоматически определяем тип общего стейта
export type AppActionsType = ActionTodolistType | ActionTaskType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
// @ts-ignore
window.store = store