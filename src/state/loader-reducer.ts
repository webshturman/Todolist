import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const InitialLoaderState: InitialLoaderStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}
const slice = createSlice({
    name: 'loader',
    initialState: InitialLoaderState,
    reducers: {
        ChangeLoadingStatusAC(state, action: PayloadAction<{ value: RequestStatusType }>) {
            state.status = action.payload.value
        },
        SetErrorMessageAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        getInitialized(state, action: PayloadAction<{ initialized: boolean }>) {
            state.isInitialized = action.payload.initialized
        }
    }
})
export const loaderReducer = slice.reducer;
export const {ChangeLoadingStatusAC, SetErrorMessageAC, getInitialized} = slice.actions;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialLoaderStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

//-------------------------------------------------------------------------------------
// export const loaderReducer =
//     (state: InitialLoaderStateType = InitialLoaderState, action: ActionLoaderType):InitialLoaderStateType=> {
//         switch (action.type) {
//             case ACTIONS_TYPE.CHANGE_LOADER_STATUS:
//                 return {...state, status:action.status}
//             case ACTIONS_TYPE.SET_ERROR_MESSAGE:
//                 return {...state, error:action.error}
//             case ACTIONS_TYPE.GET_INITIALIZED:
//                 return {...state, isInitialized:action.initialized}
//             default:
//                 return state;
//         }
//     }

//--------------------------------------------------
// export type ActionLoaderType = ReturnType<typeof ChangeLoadingStatusAC> | ReturnType<typeof SetErrorMessageAC>
//     | ReturnType<typeof getInitialized>
//
// export const ChangeLoadingStatusAC = (status:RequestStatusType) => {
//     return {type: ACTIONS_TYPE.CHANGE_LOADER_STATUS, status} as const
// }
// export const SetErrorMessageAC = (error:string | null) => {
//     return {type: ACTIONS_TYPE.SET_ERROR_MESSAGE, error} as const
// }
// export const getInitialized = (initialized:boolean) => {
//     return {type: ACTIONS_TYPE.GET_INITIALIZED, initialized} as const
// }
