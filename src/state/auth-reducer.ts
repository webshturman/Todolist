
import {authAPI} from "../api/auth-api";
import {handleNetworkError, handleServerError} from "../utils/error-utils";
import {LoginDataType} from "../api/types/authApiTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import { ChangeLoadingStatusAC, getInitialized } from "./loader-reducer";
import { clearTodosDataAC } from "./todolists-reducer";



const initialAuthState = {
    isLoggedIn:false
}
const slice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: { //создаем мини-редюсеры из action creators
        getAuthStatus(state, action: PayloadAction<{value:boolean}>){ //state типизируется сам
           state.isLoggedIn = action.payload.value
        }
    }
})
export const authReducer = slice.reducer;
export const getAuthStatus = slice.actions.getAuthStatus;


export const getAuthData = () => async (dispatch:Dispatch) => {
    try {
        const res = await authAPI.me()
        if(res.data.resultCode === 0){
            dispatch(getAuthStatus({value: true}))
        }else{

        }
        dispatch(getInitialized({ initialized: true }))
    } catch (error:any) {
        handleNetworkError(error,dispatch)
    }

}
export const setLoginData = (data:LoginDataType) => async (dispatch:Dispatch) => {
    dispatch(ChangeLoadingStatusAC({value:'loading'}))
    try {
        const res = await authAPI.login(data)
        if(res.data.resultCode === 0){
            dispatch(getAuthStatus({value: true}))
        } else{
            handleServerError(res.data,dispatch)
        }

    } catch (error:any) {
        handleNetworkError(error,dispatch)
    } finally{
        dispatch(ChangeLoadingStatusAC({value:'succeeded'}))
    }

}
export const setLogOutData = () => async (dispatch:Dispatch) => {
    dispatch(ChangeLoadingStatusAC({value:'loading'}))
    try {
        const res = await authAPI.logOut()
        if(res.data.resultCode === 0){
            dispatch(getAuthStatus({value: false}))
            dispatch(clearTodosDataAC())
        } else{
            handleServerError(res.data,dispatch)
        }

    } catch (error:any) {
        handleNetworkError(error,dispatch)
    } finally{
        dispatch(ChangeLoadingStatusAC({value:'succeeded'}))
    }

}

//---------------------------------Redux-----------------------------------------

// export type initialAuthStateType =  {
//     isLoggedIn:boolean
// }
//
// const initialAuthState: initialAuthStateType = {
//     isLoggedIn:false
// }
//
// export const authReducer = (state: initialAuthStateType = initialAuthState, action: ActionAuthDataType): initialAuthStateType => {
//     switch (action.type) {
//         case ACTIONS_TYPE.GET_AUTH_STATUS:
//             return {...state, isLoggedIn:action.status}
//         default:
//             return state;
//     }
// }
//
// export const getAuthData = (): AppThunk => async dispatch => {
//     try {
//         const res = await authAPI.me()
//         if(res.data.resultCode === 0){
//             dispatch(getAuthStatus(true))
//         }else{
//
//         }
//         dispatch(getInitialized(true))
//     } catch (error:any) {
//         handleNetworkError(error,dispatch)
//     }
//
// }
// export const setLoginData = (data:LoginDataType): AppThunk => async dispatch => {
//     dispatch(ChangeLoadingStatusAC('loading'))
//     try {
//         const res = await authAPI.login(data)
//         if(res.data.resultCode === 0){
//             dispatch(getAuthStatus(true))
//         } else{
//             handleServerError(res.data,dispatch)
//         }
//
//     } catch (error:any) {
//         handleNetworkError(error,dispatch)
//     } finally{
//         dispatch(ChangeLoadingStatusAC('succeeded'))
//     }
//
// }
// export const setLogOutData = (): AppThunk => async dispatch => {
//     dispatch(ChangeLoadingStatusAC('loading'))
//     try {
//         const res = await authAPI.logOut()
//         if(res.data.resultCode === 0){
//             dispatch(getAuthStatus(false))
//             dispatch(clearTodosDataAC())
//         } else{
//             handleServerError(res.data,dispatch)
//         }
//
//     } catch (error:any) {
//         handleNetworkError(error,dispatch)
//     } finally{
//         dispatch(ChangeLoadingStatusAC('succeeded'))
//     }
//
// }

//--------------actions-------------------------------------------
// export type ActionAuthDataType = ReturnType<typeof getAuthStatus>
//
// export const getAuthStatus = (status:boolean) => {
//     return {type: ACTIONS_TYPE.GET_AUTH_STATUS, status} as const
// }
