import {ResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {ChangeLoadingStatusAC, SetErrorMessageAC} from "../state/loader-reducer";

export const handleServerError = <T>(data:ResponseType<T>,dispatch: Dispatch)=> {
    if(data.messages.length){
        dispatch(SetErrorMessageAC({error: data.messages[0]}))
    } else{
        dispatch(SetErrorMessageAC({error: "some error"}))
    }
    dispatch(ChangeLoadingStatusAC({value:'failed'}))
}

export const handleNetworkError = (error:{message:string | null},dispatch: Dispatch)=> {
    dispatch(SetErrorMessageAC({error: error.message ? error.message : 'Network connection error'}))
    dispatch(ChangeLoadingStatusAC({value:'failed'}))
}
