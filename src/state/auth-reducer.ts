
import {authAPI} from "../api/auth-api";
import {handleNetworkError, handleServerError} from "../utils/error-utils";
import {LoginDataType} from "../api/types/authApiTypes";
import {ChangeLoadingStatusAC, getInitialized} from "./actions/loader-actions";
import {clearTodosDataAC} from "./actions/todolists-actions";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";


const initialAuthState = {
    isLoggedIn:false
}
const slice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: { //создаем мини-редюсеры из action creators
        getAuthStatus(state, action: PayloadAction<{value:boolean}>){ //аргументы типизируются сами
           state.isLoggedIn = action.payload.value
        }
    }
})
export const authReducer = slice.reducer;
export const getAuthStatus = slice.actions.getAuthStatus;
// const {getAuthStatus} = slice.actions;


export const getAuthData = () => async (dispatch:Dispatch) => {
    try {
        const res = await authAPI.me()
        if(res.data.resultCode === 0){
            dispatch(getAuthStatus({value: true}))
        }else{

        }
        dispatch(getInitialized(true))
    } catch (error:any) {
        handleNetworkError(error,dispatch)
    }

}
export const setLoginData = (data:LoginDataType) => async (dispatch:Dispatch) => {
    dispatch(ChangeLoadingStatusAC('loading'))
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
        dispatch(ChangeLoadingStatusAC('succeeded'))
    }

}
export const setLogOutData = () => async (dispatch:Dispatch) => {
    dispatch(ChangeLoadingStatusAC('loading'))
    try {
        const res = await authAPI.logOut()
        if(res.data.resultCode === 0){
            dispatch(getAuthStatus({value: true}))
            dispatch(clearTodosDataAC())
        } else{
            handleServerError(res.data,dispatch)
        }

    } catch (error:any) {
        handleNetworkError(error,dispatch)
    } finally{
        dispatch(ChangeLoadingStatusAC('succeeded'))
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
