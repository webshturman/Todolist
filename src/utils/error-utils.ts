import {ActionLoaderType, ChangeLoadingStatusAC, SetErrorMessageAC} from "../state/actions";
import {ResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";

export const handleServerError = <T>(data:ResponseType<T>,dispatch: Dispatch<ActionLoaderType>)=> {
    if(data.messages.length){
        dispatch(SetErrorMessageAC(data.messages[0]))
    } else{
        dispatch(SetErrorMessageAC("some error"))
    }
    dispatch(ChangeLoadingStatusAC('failed'))
}

export const handleNetworkError = (error:{message:string},dispatch: Dispatch<ActionLoaderType>)=> {
    dispatch(SetErrorMessageAC(error.message ? error.message : 'Network connection error'))
    dispatch(ChangeLoadingStatusAC('failed'))
}