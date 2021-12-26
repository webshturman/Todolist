
import {AppThunk} from "./store";

import {authAPI} from "../api/auth-api";
import {handleNetworkError, handleServerError} from "../utils/error-utils";
import {ACTIONS_TYPE} from "../enums/actionsConstants";
import {LoginDataType} from "../api/types/authApiTypes";
import { ActionAuthDataType, getAuthStatus } from "./actions/auth-actions";
import {ChangeLoadingStatusAC, getInitialized } from "./actions/loader-actions";
import { clearTodosDataAC } from "./actions/todolists-actions";

export type initialAuthStateType =  {
    isLoggedIn:boolean
}

const initialAuthState: initialAuthStateType = {
    isLoggedIn:false
}

export const authReducer = (state: initialAuthStateType = initialAuthState, action: ActionAuthDataType): initialAuthStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.GET_AUTH_STATUS:
            return {...state, isLoggedIn:action.status}
        default:
            return state;
    }
}

export const getAuthData = (): AppThunk => async dispatch => {
    try {
        const res = await authAPI.me()
        if(res.data.resultCode === 0){
            dispatch(getAuthStatus(true))
        }else{

        }
        dispatch(getInitialized(true))
    } catch (error:any) {
        handleNetworkError(error,dispatch)
    }

}
export const setLoginData = (data:LoginDataType): AppThunk => async dispatch => {
    dispatch(ChangeLoadingStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if(res.data.resultCode === 0){
            dispatch(getAuthStatus(true))
        } else{
            handleServerError(res.data,dispatch)
        }

    } catch (error:any) {
        handleNetworkError(error,dispatch)
    } finally{
        dispatch(ChangeLoadingStatusAC('succeeded'))
    }

}
export const setLogOutData = (): AppThunk => async dispatch => {
    dispatch(ChangeLoadingStatusAC('loading'))
    try {
        const res = await authAPI.logOut()
        if(res.data.resultCode === 0){
            dispatch(getAuthStatus(false))
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

