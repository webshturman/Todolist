import {RequestStatusType} from "../loader-reducer";
import {ACTIONS_TYPE} from "../../enums/actionsConstants";

export type ActionLoaderType = ReturnType<typeof ChangeLoadingStatusAC> | ReturnType<typeof SetErrorMessageAC>
    | ReturnType<typeof getInitialized>

export const ChangeLoadingStatusAC = (status:RequestStatusType) => {
    return {type: ACTIONS_TYPE.CHANGE_LOADER_STATUS, status} as const
}
export const SetErrorMessageAC = (error:string | null) => {
    return {type: ACTIONS_TYPE.SET_ERROR_MESSAGE, error} as const
}
export const getInitialized = (initialized:boolean) => {
    return {type: ACTIONS_TYPE.GET_INITIALIZED, initialized} as const
}