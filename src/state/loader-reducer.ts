

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export const InitialLoaderState ={
    status:'loading' as RequestStatusType,
    error:'error'
}
export type InitialLoaderStateType = typeof InitialLoaderState

export const loaderReducer = (state: InitialLoaderStateType  = InitialLoaderState, action: any):InitialLoaderStateType=> {
    switch (action.type) {

        default:
            return state;
    }
}