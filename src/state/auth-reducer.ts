
import {AppThunk} from "./store";
import {ACTIONS_TYPE, ActionAuthDataType, getAuthStatus, ChangeLoadingStatusAC} from "./actions";
import {authAPI, LoginDataType} from "../api/auth-api";

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
    // dispatch(ChangeLoadingStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if(res.data.resultCode === 0){
            dispatch(getAuthStatus(true))
        }
        // dispatch(getTodosAC(res.data))
        // dispatch(ChangeLoadingStatusAC('succeeded'))
    } catch (error:any) {
        // handleNetworkError(error,dispatch)
    }

}
export const setLoginData = (data:LoginDataType): AppThunk => async dispatch => {
    dispatch(ChangeLoadingStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if(res.data.resultCode === 0){
            dispatch(getAuthStatus(true))
            dispatch(ChangeLoadingStatusAC('succeeded'))
        }

    } catch (error:any) {
        // handleNetworkError(error,dispatch)
    }

}

export type initialAuthStateType =  {
    isLoggedIn:boolean
}