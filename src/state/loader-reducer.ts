import {ActionLoaderType, ACTIONS_TYPE, getAuthStatus, getInitialized} from "./actions";
import {AppThunk} from "./store";
import {authAPI} from "../api/auth-api";
import {handleNetworkError} from "../utils/error-utils";


export const InitialLoaderState:InitialLoaderStateType ={
    status:'idle',
    error: null,
    isInitialized:false,
}
// export type InitialLoaderStateType = typeof InitialLoaderState

export const loaderReducer = (state: InitialLoaderStateType  = InitialLoaderState, action: ActionLoaderType):InitialLoaderStateType=> {
    switch (action.type) {
        case ACTIONS_TYPE.CHANGE_LOADER_STATUS:
            return {...state, status:action.status}
        case ACTIONS_TYPE.SET_ERROR_MESSAGE:
            return {...state, error:action.error}
        case ACTIONS_TYPE.GET_INITIALIZED:
            return {...state, isInitialized:action.initialized}
        default:
            return state;
    }
}

//-------------------------------------------------------------------------------------
export const getAuthData = (): AppThunk => async dispatch => {
    // dispatch(ChangeLoadingStatusAC('loading'))
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
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialLoaderStateType={
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}