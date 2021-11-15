import {InitialLoaderStateType, loaderReducer} from "./loader-reducer";
import {ChangeLoadingStatusAC, SetErrorMessageAC} from "./actions";


let startState: InitialLoaderStateType;
beforeEach(()=> {
    startState = {
        status:'idle',
        error:null
    }
})

test('loading status should be changed correct ', ()=> {

    const action = ChangeLoadingStatusAC("loading")
    const endState = loaderReducer(startState,action)

    expect(endState.status).toBe("loading")
})
test('error message should be set correct ', ()=> {

    const action = SetErrorMessageAC("error")
    const endState = loaderReducer(startState,action)

    expect(endState.error).toBe("error")
})