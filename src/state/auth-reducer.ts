
import {AppThunk} from "./store";
import {ACTIONS_TYPE, ActionAuthDataType, getAuthStatus, ChangeLoadingStatusAC} from "./actions";
import {authAPI, LoginDataType} from "../api/auth-api";
import {handleNetworkError, handleServerError} from "../utils/error-utils";

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
            dispatch(ChangeLoadingStatusAC('succeeded'))
        } else{
            handleServerError(res.data,dispatch)
        }

    } catch (error:any) {
        handleNetworkError(error,dispatch)
    } finally{
        dispatch(ChangeLoadingStatusAC('succeeded'))
    }

}

export type initialAuthStateType =  {
    isLoggedIn:boolean
}