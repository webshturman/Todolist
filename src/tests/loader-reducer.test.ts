import {InitialLoaderStateType, loaderReducer} from "../state/loader-reducer";
import {ChangeLoadingStatusAC, getInitialized, SetErrorMessageAC} from "../state/actions/loader-actions";



let startState: InitialLoaderStateType;
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false,
    }
})

test('loading status should be changed correct ', () => {

    const action = ChangeLoadingStatusAC("loading")
    const endState = loaderReducer(startState, action)

    expect(endState.status).toBe("loading")
})
test('error message should be set correct ', () => {

    const action = SetErrorMessageAC("error")
    const endState = loaderReducer(startState, action)

    expect(endState.error).toBe("error")
})
test('Initialized status should change', () => {

    const action = getInitialized(true)
    const endState = loaderReducer(startState, action)

    expect(endState.isInitialized).toBeTruthy()
})