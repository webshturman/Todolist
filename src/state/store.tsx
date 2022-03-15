import {combineReducers} from "redux";
import {todolistReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
// @ts-ignore
import logger from 'redux-logger'
import {loaderReducer} from "./loader-reducer";
import {authReducer} from "./auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";


const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer,
    loader: loaderReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware).concat(logger)
});

export type AppRootState = ReturnType<typeof rootReducer>;
// export type AppActionsType = ActionTaskType
//
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
// @ts-ignore
window.store = store


//--------Redux-----------------------------------------
// const rootReducer = combineReducers({
//     todoLists:todolistReducer,
//     tasks:tasksReducer,
//     loader:loaderReducer,
//     auth:authReducer,
// })
//
// export const store = createStore(rootReducer, applyMiddleware(thunk));
// export type AppRootState = ReturnType<typeof rootReducer>;
// export type AppActionsType = ActionTodolistType | ActionTaskType | ActionLoaderType | ActionAuthDataType
//
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
// // @ts-ignore
// window.store = store
