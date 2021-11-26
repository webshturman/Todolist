
import {AppThunk} from "./store";
import {ACTIONS_TYPE, ActionAuthDataType} from "./actions";

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


export const getTodosTC = (): AppThunk => async dispatch => {
    // dispatch(ChangeLoadingStatusAC('loading'))
    try {
        // const res = await TodoListAPI.getTodos()
        // dispatch(getTodosAC(res.data))
        // dispatch(ChangeLoadingStatusAC('succeeded'))
    } catch (error:any) {
        // handleNetworkError(error,dispatch)
    }

}


export type initialAuthStateType =  {
    isLoggedIn:boolean
}