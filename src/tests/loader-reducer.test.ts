import {
    ChangeLoadingStatusAC,
    getInitialized,
    InitialLoaderStateType,
    loaderReducer,
    SetErrorMessageAC
} from "../state/loader-reducer";




let startState: InitialLoaderStateType;
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false,
    }
})

test('loading status should be changed correct ', () => {

    const action = ChangeLoadingStatusAC({value:"loading"})
    const endState = loaderReducer(startState, action)

    expect(endState.status).toBe("loading")
})
test('error message should be set correct ', () => {

    const action = SetErrorMessageAC({error:"error"})
    const endState = loaderReducer(startState, action)

    expect(endState.error).toBe("error")
})
test('Initialized status should change', () => {

    const action = getInitialized({initialized:true})
    const endState = loaderReducer(startState, action)

    expect(endState.isInitialized).toBeTruthy()
})
