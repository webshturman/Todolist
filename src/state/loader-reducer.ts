import {ActionLoaderType} from "./actions";
import {ACTIONS_TYPE} from "../enums/actionsConstants";


export const InitialLoaderState:InitialLoaderStateType ={
    status:'idle',
    error: null,
    isInitialized:false,
}
// export type InitialLoaderStateType = typeof InitialLoaderState

export const loaderReducer =
    (state: InitialLoaderStateType = InitialLoaderState, action: ActionLoaderType):InitialLoaderStateType=> {
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

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialLoaderStateType={
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}